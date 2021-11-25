// pages/reserve/reserve.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        result: [],
        showResult: false,
        userName: '',
        time: ''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

    },
/***检索用户 */
formInputChange(e){
    const value = e.detail.value;
    //请求检索接口
    app.req.api.getUserAll({
        key: value
    }).then(res=>{
        const result = res.data;
        this.setData({
            result: result,
            showResult: true
        })
    })
},
chooseUser(e){
    const {id, name} = e.currentTarget.dataset;
    this.setData({
        userName: name,
        userId: id,
        showResult: false
    })
},
onPickerChange(e){
    console.log("onPickerChange", e)
    this.setData({
        time: e.detail.value
    })
},
/***确认预约**/
goReserve(e){
    const data = {
        userId: this.data.userId,
        time: this.data.time
    };
    // app.req.api.reserve(data).then(res=>{
        //确认预约成功后返回前一页
        wx.navigateBack({
            delta: 0
        })
    // })
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