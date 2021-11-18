// pages/packageA/training/plan/plan.js
Page({

    /**
     * Page initial data
     */
    data: {
        bodyData: [{
            name: '身高',
            unit: 'cm',
            value: '178',
            status: ''
        }, {
            name: '体重',
            unit: 'kg',
            value: '51',
            status: '0'
        }, {
            name: 'BMI',
            unit: '',
            value: '11',
            status: '1'
        }, {
            name: '体脂率',
            unit: '',
            value: '20',
            status: '3'
        }, {
            name: '肌肉量',
            unit: 'kg',
            value: '40',
            status: '2'
        }],
        statusList: ['理想', '偏低', '标准', '超高', '极高风险'],
        dataTime: '2021/10/11'
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