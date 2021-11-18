// pages/packageA/evaluation/physical/physical.js
Page({

    /**
     * Page initial data
     */
    data: {
        showReport: false,
        list: [{
            name: '心脏功能',
            method: '运动前心率',
            performance: ''
        }, {
            name: '心肺功能',
            method: '2分钟踏板（心率）',
            performance: ''
        }, {
            name: '核心力量',
            method: 'plank（平板支撑）',
            performance: ''
        }, {
            name: '上肢力量',
            method: '俯卧撑',
            performance: ''
        }, {
            name: '下肢力量',
            method: '深蹲',
            performance: ''
        }, {
            name: '柔韧性',
            method: '坐姿体前屈',
            options: ['手到脚踝', '手到脚尖', '手指过脚尖', '掌根到脚尖'],
            performance: ''
        }]

    },
    bindInputChange(e){
        const index = e.currentTarget.dataset.i;
        this.setData({
          [`list[${index}].performance`]: e.detail.value
        });
    },
    bindSelChange(e){
        const index = e.currentTarget.dataset.i;
        const value = e.detail.value;
        const performance = this.data.list[index].options[value];
        this.setData({
          [`list[${index}].performance`]: performance
        });
    },
    generateReport(){
        this.setData({
            showReport: true
        })
    },
    finish(){
    //   wx.redirectTo({
    //     url: '/pages/packageA/evaluation/overview/overview'
    //   })
      wx.navigateBack({
        delta: 0,
      })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

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