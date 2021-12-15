const util = require('../../../../utils/util.js')

// pages/packageA/inbody/report/report.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        showReport: false,
        showBtn: true,  //是否显示完成按钮，当为查看时没有按钮
        userInfo: {
          name: "Ada",
          avatarUrl: '/images/member/avatar.png',
          mobile: "13888888888",
          birthday: "2020-10-22",
          age: '27',
          genders: '男',
          height: 178,
          weight: 60
        },
        tabList: ['身体成分', '身体测量'],
        current: 0,
        swiperHeight: 160, //动态计算swiper高度
        imgList: [[{
            id: 'report',
            name: '体测报告',
            src: ''
        }],[{
            id: 'itemAheadPath',
            name: '正面',
            src: ''
        }, {
            id: 'itemLeftPath',
            name: '左侧面',
            src: ''
        }, {
            id: 'itemRightPath',
            name: '右侧面',
            src: ''
        }, {
            id: 'itemBackPath',
            name: '背面',
            src: ''
        }]],
        resList: ['理想', '偏低', '标准', '超高', '极高风险'],
        inputList: [[{
            name: '身高',
            id: 'height',
            unit: 'CM',
            icon: '/images/inbody/icon-bust.png',
            icon2: '/images/inbody/waist2.png',
            value: '',
            res: '2'  //对比结果
        }, {
            name: '体重',
            id: 'weight',
            unit: 'KG',
            icon: '/images/inbody/icon-bust.png',
            icon2: '/images/inbody/waist2.png',
            value: '',
            res: '2'
        }, {
            name: 'BMI',
            id: 'bmi',
            unit: '',
            icon: '/images/inbody/icon-bust.png',
            icon2: '/images/inbody/waist2.png',
            value: '',
            res: '4'
        }, {
            name: '体脂率',
            id: 'tz',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '脂肪量',
            id: 'zf',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '水分',
            id: 'sf',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '骨骼肌',
            id: 'gg',
            unit: '%',
            value: '',
            res: '0'
        }, {
            name: '肌肉量',
            id: 'jr',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '腰臀比',
            id: 'yt',
            unit: '',
            value: '',
            res: '3'
        }], [{
            name: '身高',
            id: 'height',
            unit: 'CM',
            value: ''
        }, {
            id: 'weight',
            name: '体重',
            unit: 'KG',
            value: ''
        }, {
            id: 'bmi',
            name: 'BMI',
            unit: '',
            value: ''
        }, {
            id: 'chestMeasurement',
            name: '胸围',
            unit: 'cm',
            icon: '/images/inbody/icon-bust.png',
            value: ''
        }, {
            id: 'waistline',
            name: '腰围',
            unit: 'cm',
            icon: '/images/inbody/waist.png',
            value: ''
        }, {
            id: 'tw',
            name: '臀围',
            icon: '/images/inbody/hips.png',
            unit: 'cm',
            value: ''
        }, {
            id: 'zs',
            name: '左上臂围',
            unit: 'cm',
            value: ''
        }, {
            id: 'ys',
            name: '右上臂围',
            unit: 'cm',
            value: ''
        }, {
            id: 'zd',
            name: '左大腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'yd',
            name: '右大腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'zx',
            name: '左小腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'yx',
            name: '右小腿围',
            unit: 'cm',
            value: ''
        }]],
        formData: {},
        formResource: {}
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const {userId, reportId} = options;
        if(reportId){
            //查看报告
            this.setData({
                showReport: true,
                showBtn: false
            })  
            app.req.api.getHealthReportDetail({
                reportId: reportId
            }).then(res=>{
                console.log('查询报告：', res.data)
                this.setData({
                    formData: res.data
                });
            });
        }else{
            //填写报告
            this.setData({
                userId: userId
            });
            this.getMemberInfo();
            this.comSwiperHeight();
        }
    },
    getMemberInfo(){
      app.req.api.getUserById({id: this.data.userId}).then(res => {
        console.log('返回：', res.data);
        let userInfo = res.data;
        let birthday = userInfo.birthday.match(/([0-9]+)-[0-9]+-[0-9]+/);
        userInfo.age = new Date().getFullYear() - birthday[1];
        this.setData({
          userInfo: userInfo
        });
      })
    },
    comSwiperHeight(){
      var query = wx.createSelectorQuery();
      const _this = this;
      query.select(`#swiperItem${this.data.current}`).boundingClientRect(function (rect) {
          if(rect){
            _this.setData({
                swiperHeight: rect.height
            })
          }
      }).exec();
    },

    swiperChange(e){
        const curr = e.detail.current;
        this.setData({
            current: curr
        })
        this.comSwiperHeight();
      },
    tabChange(e){
        const curr = e.currentTarget.dataset.id;
        this.setData({
            current: curr
        })
        this.comSwiperHeight();
      },
    /***拍照 */
    takePhoto(e){
        const {index, field} = e.currentTarget.dataset;
        const cur = this.data.current;
        const _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePath = res.tempFilePaths[0];
                app.req.api.uploadFile({
                    path: tempFilePath,
                    formData: {
                        userId: _this.data.userInfo.id
                    },
                    success(res){
                        console.log('图片上传：', res)
                        _this.setData({
                            [`formResource.${field}`]: res
                        })
                    }
                })
                _this.setData({
                    [`imgList[${cur}][${index}].src`]: tempFilePath
                })
                if(cur == 0){
                    _this.comSwiperHeight();
                }
            }
        })
    },
    inputChange(e){
        const cur = this.data.current;
        const {i, field} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`inputList[${cur}][${i}].value`]: value,
            [`formData.${field}`]: value
        });
        if( field == 'weight' || field == 'height'){
            const formData = this.data.formData;
            if(formData.weight && formData.height){
                const bmi = (formData.weight / (formData.height * formData.height) * 10000).toFixed(2);
                this.setData({
                    [`formData.bmi`]: bmi
                })
            }
        }
    },
    /****下一步 */
    nextStep(e){
        const cur = this.data.current;
        // const data = this.getData();
        //数据是分开提交  还是最后生成报告之后一起提交
        this.setData({
            current: cur+1
        });
        // console.log('当前tab数据：', data)
    },
    /***生成报告 */
    generateReport(){
        //最后一个tab的数据
        // const data = this.getData();
        this.setData({
            showReport: true
        })
    },
    finish(){
        //提交数据
        const userInfo = this.data.userInfo;
        let coachId = wx.getStorageSync('mp-req-user-id');
        const userhealthcheckReport = {
            ...this.data.formData, 
            age: userInfo.age, 
            coachId: coachId,
            createTime: util.formatDate(new Date()),
            userId: userInfo.id,
            userName: userInfo.userName
        };
        const userhealthcheckResource = {
            userId: userInfo.id,
            itemAheadPath: '',
            itemBackPath: '',
            itemLeftPath: '',
            itemRightPath: '',
            userHealthcheckId: '',
            userHealthcheckrecourceId: ''
        };
        app.req.api.addHealthCheckReport({
            userhealthcheckReport: userhealthcheckReport,
            userhealthcheckResource: userhealthcheckResource
        }).then( res => {
            wx.redirectTo({
              url: '/pages/packageA/inbody/overview/overview?userId=' + userInfo.id,
            });
            wx.showToast({
              title: '提交成功',
            })
        }).catch( e =>{
            wx.showToast({
                title: '请重试',
                icon: 'error'
              })
        });
        console.log('数据：', {
            userhealthcheckReport: userhealthcheckReport,
            userhealthcheckResource: userhealthcheckResource
        });
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})