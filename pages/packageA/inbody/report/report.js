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
        userInfo: {},
        tabList: ['身体成分', '身体测量'],
        current: 0,
        swiperHeight: 160, //动态计算swiper高度
        imgList: [{
            healthReportPath:{
                id: 'healthReportPath',
                name: '体测报告',
                src: ''
            }}, {
            itemAheadPath:{
                id: 'itemAheadPath',
                name: '正面',
                src: ''
            }, itemLeftPath:{
                id: 'itemLeftPath',
                name: '左侧面',
                src: ''
            }, itemRightPath:{
                id: 'itemRightPath',
                name: '右侧面',
                src: ''
            }, itemBackPath:{
                id: 'itemBackPath',
                name: '背面',
                src: ''
            }
        }],
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
            id: 'bodyFatRatio',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '脂肪量',
            id: 'fatContent',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '水分',
            id: 'waterContent',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '骨骼肌',
            id: 'skeletalMuscle',
            unit: '%',
            value: '',
            res: '0'
        }, {
            name: '肌肉量',
            id: 'muscleMass',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '腰臀比',
            id: 'waistHipRatio',
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
            id: 'hipline',
            name: '臀围',
            icon: '/images/inbody/hips.png',
            unit: 'cm',
            value: ''
        }, {
            id: 'leftArmCircumference',
            name: '左上臂围',
            unit: 'cm',
            value: ''
        }, {
            id: 'rightArmCircumference',
            name: '右上臂围',
            unit: 'cm',
            value: ''
        }, {
            id: 'leftThighCircumference',
            name: '左大腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'rightThighCircumference',
            name: '右大腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'leftShankCircumference',
            name: '左小腿围',
            unit: 'cm',
            value: ''
        }, {
            id: 'rightShankCircumference',
            name: '右小腿围',
            unit: 'cm',
            value: ''
        }]],
        formData: {},
        formResourceUrl: {},
        formResource: {}
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const {userId, reportId} = options;
        const _this = this;
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
                const {userhealthcheckReport, userhealthcheckResource} =  res.data;
                this.setData({
                    formData: userhealthcheckReport,
                    formResourceUrl: userhealthcheckResource
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
        userInfo.age = new Date().getFullYear() - new Date(userInfo.birthday).getFullYear();
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
                            [`formResource.${field}`]: res.data
                        })
                    }
                })
                _this.setData({
                    [`formResourceUrl.${field}`]: tempFilePath
                })
                if(cur == 0){
                    _this.comSwiperHeight();
                }
            }
        })
    },

    /***预览图片 */
    previewImg(e){
        const src = e.currentTarget.dataset.src;
        wx.previewImage({ 
            current: src, // 当前显示图片的http链接 
            urls: [src] // 需要预览的图片http链接列表 
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
            createTime: new Date().getTime(),
            userId: userInfo.id,
            userName: userInfo.userName
        };
        const userhealthcheckResource = {
            userId: userInfo.id,
            ...this.data.formResource
        };
        console.log(8888, userhealthcheckResource)
        app.req.api.addHealthCheckReport({
            userhealthcheckReport,
            userhealthcheckResource
        }).then( res => {
            if(res.code === 0){
                wx.redirectTo({
                url: '/pages/packageA/inbody/overview/overview?userId=' + userInfo.id,
                });
                wx.showToast({
                title: '提交成功',
                })
            }
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