// pages/evaluation/dynamic/dynamic.js
const app = getApp()
Page({
  data: {
    showReport: false,
    tabList: ['过顶蹲起', '单腿下蹲', '站姿推', '站姿拉'],
    current: 0,
    expImage: ['/images/evaluation/static-left.png', '/images/evaluation/static-back.png'],
    userVideo: [[], []],
    remark: [],
    swiperHeight: 160, //动态计算swiper高度
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
          _this.setData({
              swiperHeight: rect.height
          })
      }).exec();
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