// pages/packageB/mine/buy/buy.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        buyList: [{
            title: '连续包月',
            price: '9/30'
        }, {
            title: '连续包季',
            price: '80'
        }, {
            title: '连续包年',
            price: '299'
        }],
        current: 0,
        detail: [{
            title: '会员服务内容',
            list: ['不限量客户档案管理;', '不限量管理会员数量;', '不限制推广返现的提现金额。']
        }]
    },
    
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.data.userId = wx.getStorageSync('mp-req-user-id');
    },
    changeCurrent(e){
        const index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        })
        this.payOrder();
    },
    payOrder(){
        app.req.api.payOrder({
            "amountMoney": 0.01,                                      
            // "openId": "oP1TP5cTTLZCgTXg-ZWG2d7sjfEA",           
            "payStatus": 0,                                   
            "productType": this.data.current,                                          
            "userId": this.data.userId || 'f15371d7-975b-4ae9-98fb-df54453ef0a5'
        }).then(res=>{
            const data = res.data;
            wx.requestPayment({
                ...data,
                "paySign": data.sign,
                "success":function(res){
                    console.log('支付成功', res)
                    wx.showToast({
                      title: '购买成功',
                    })
                    wx.navigateBack({
                      delta: 0,
                    })
                },
                "fail":function(res){
                    wx.showToast({
                      title: '支付失败',
                      icon: 'error'
                    })
                },
                "complete":function(res){
                    console.log('支付完成', res)}
            })
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