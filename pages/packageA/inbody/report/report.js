// pages/packageA/inbody/report/report.js
Page({

    /**
     * Page initial data
     */
    data: {
        showReport: false,
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
            name: '体测报告',
            src: ''
        }],[{
            name: '正面',
            src: ''
        }, {
            name: '左侧面',
            src: ''
        }, {
            name: '右侧面',
            src: ''
        }, {
            name: '背面',
            src: ''
        }]],
        resList: ['理想', '偏低', '标准', '超高', '极高风险'],
        inputList: [[{
            name: '体重',
            unit: 'KG',
            icon: '/images/inbody/icon-bust.png',
            icon2: '/images/inbody/waist2.png',
            value: '',
            res: '2'
        }, {
            name: 'BMI',
            unit: 'KG',
            icon: '/images/inbody/icon-bust.png',
            icon2: '/images/inbody/waist2.png',
            value: '',
            res: '4'
        }, {
            name: '体脂率',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '脂肪量',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '水分',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '骨骼肌',
            unit: '%',
            value: '',
            res: '0'
        }, {
            name: '肌肉量',
            unit: '%',
            value: '',
            res: '2'
        }, {
            name: '腰臀比',
            unit: '',
            value: '',
            res: '3'
        }], [{
            name: '体重',
            unit: 'KG',
            value: ''
        }, {
            name: 'BMI',
            unit: 'KG',
            value: ''
        }, {
            name: '胸围',
            unit: 'cm',
            icon: '/images/inbody/icon-bust.png',
            value: ''
        }, {
            name: '腰围',
            unit: 'cm',
            icon: '/images/inbody/waist.png',
            value: ''
        }, {
            name: '臀围',
            icon: '/images/inbody/hips.png',
            unit: 'cm',
            value: ''
        }, {
            name: '左上臂围',
            unit: 'cm',
            value: ''
        }, {
            name: '右上臂围',
            unit: 'cm',
            value: ''
        }, {
            name: '左大腿围',
            unit: 'cm',
            value: ''
        }, {
            name: '右大腿围',
            unit: 'cm',
            value: ''
        }, {
            name: '左小腿围',
            unit: 'cm',
            value: ''
        }, {
            name: '右小腿围',
            unit: 'cm',
            value: ''
        }]]
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.comSwiperHeight();
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
    const index = e.currentTarget.dataset.index;
    const cur = this.data.current;
    const _this = this;
    wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            _this.setData({
                [`imgList[${cur}][${index}].src`]: tempFilePaths[0]
            })
            if(cur == 0){
                _this.comSwiperHeight();
            }
        }
    })
    },
    inputChange(e){
    const cur = this.data.current;
    const index = e.currentTarget.dataset.i;
    this.setData({
        [`inputList[${cur}][${index}].value`]: e.detail.value
    });
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
        wx.navigateBack({
            delta: 0,
        })
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