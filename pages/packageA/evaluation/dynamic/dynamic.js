// pages/evaluation/dynamic/dynamic.js
const app = getApp()
Page({
  data: {
    showReport: false,
    tabList: ['过顶蹲起', '单腿下蹲', '站姿推', '站姿拉'],
    current: 0,
    expImage: ['/images/evaluation/dynamic1.png', '/images/evaluation/dynamic2.png','/images/evaluation/dynamic3.png', '/images/evaluation/dynamic4.png'],
    userVideo: [[], [], [], []],
    remark: [],
    swiperHeight: 160, //动态计算swiper高度
    feedbackList: [[{
      name: '躯干过分前倾',
      checked: false
    }, {
      name: '下背反弓',
      checked: false
    }, {
      name: '内扣',
      checked: false
    }, {
      name: '外旋', 
      checked: false
    }, {
      name: '手臂下落',
      checked: false
    }], [{
      name: '内扣',
      checked: false
    }], [{
      name: '下背反弓', 
      checked: false
    }, {
      name: '肩部上提', 
      checked: false
    }, {
      name: '头部前引', 
      checked: false
    }], [{
      name: '下背反弓', 
      checked: false
    }, {
      name: '肩部上提', 
      checked: false
    }, {
        name: '头部前引',
        checked: false
    }]],
    remark:[],
    datas: [[], [], [], []],
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
    tabChange(e){
      const curr = e.currentTarget.dataset.id;
      this.setData({
          current: curr
      })
      this.comSwiperHeight();
    },
    swiperChange(e){
      const curr = e.detail.current;
      this.setData({
          current: curr
      })
      this.comSwiperHeight();
    },
    //开始录制视频
    startVideo(){
      const _this = this;
      wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          console.log(res.tempFilePath)
          const cur = _this.data.current;
          let videoList = _this.data.userVideo[cur];
          res.tempFilePath && videoList.push(res.tempFilePath);
          _this.setData({
            [`userVideo[${cur}]`]: videoList
          });
        }
      })
    },
    /**删除某个用户视频 */
    delAct(e){
      const {index, i} = e.currentTarget.dataset;
      let videoArr = this.data.userVideo[index];
      videoArr.splice(i, 1);
      this.setData({
        [`userVideo[${index}]`]: videoArr
      })
    },
    /***问题反馈 */
    setChoice(e){
      const cur = this.data.current;
      let feedbackList = this.data.feedbackList[cur];
      const i = e.currentTarget.dataset.i;
      const checked = feedbackList[i].checked;
      this.setData({
        [`feedbackList[${cur}][${i}].checked`]: !checked
      });
    },
    /**教练备注 */
    remarkChange(e){
      this.setData({
          [`remark[${this.data.current}]`]: e.detail.value 
      })
    },
    /***获取当前数据 */
    getData(){
      const cur = this.data.current;
      const tabList = this.data.tabList;
      let data = {
        name: tabList[cur],
        video: this.data.userVideo[cur],
        feedback: this.data.feedbackList[cur],
        remark: this.data.remark[cur]
      };
      this.setData({
        [`datas[${cur}]`]: data
      })
      return data;
    },
    /****下一步 */
    nextStep(e){
      const cur = this.data.current;
      const data = this.getData();
      //数据是分开提交  还是最后生成报告之后一起提交
      this.setData({
          current: cur+1
      });
      console.log('当前tab数据：', data)
    },
    /***生成报告 */
    generateReport(){
      //最后一个tab的数据
      const data = this.getData();
      this.setData({
          showReport: true
      })
    },
    finish(){
      // wx.redirectTo({
      //   url: '/pages/packageA/evaluation/overview/overview'
      // })
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

})