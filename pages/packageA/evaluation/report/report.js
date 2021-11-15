// pages/packageA/report/report.js
Page({

    /**
     * Page initial data
     */
    data: {
        problemList: [],
        imageList: []

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const feedbackList = [{checked: true, name: "全身", options: ["C型侧弯", "S型侧弯"]
            ,result: "C型侧弯"
            ,value: ""}, {checked: true, name: "头部", options: ["C型侧弯", "S型侧弯"]
            ,result: "后倾"
            ,value: ""},{checked: false, name: "颈椎", options: ["C型侧弯", "S型侧弯"]
            ,result: "C型侧弯"
            ,value: ""},{checked: false, name: "全身", options: ["C型侧弯", "S型侧弯"]
            ,result: "C型侧弯"
            ,value: ""}];
        const image = ["http://tmp/Gkz6iEhAQq2T5733ae0963b9b13d8fd0a26539927546.jpg"];
        let problemList = [];
        feedbackList.map(i=>{
            if(i.checked){
                problemList.push({
                    name: i.name,
                    result: i.result
                })
            }
        })
        this.setData({
            imageList: image,
            problemList: problemList
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