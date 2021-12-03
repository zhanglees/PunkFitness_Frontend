// pages/packageA/training/stagedetail/stagedetail.js
Page({

    /**
     * Page initial data
     */
    data: {
        stageName: '适应期',
        list: [{
            name: '训练重点',
            list: ['综合体能', '力量']
        }, {
            name: '训练项目',
            list: ['基础力量', '基础体能', '被动拉伸']
        }, {
            name: '训练目标',
            list: ['体重变化'],
            goal: '30kg'
        }],
        frequency: 2,
        week: 4,
        count: 8,
        remarks: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息'
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const id = options.id || '';  //阶段id，拿着阶段id请求阶段详情
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