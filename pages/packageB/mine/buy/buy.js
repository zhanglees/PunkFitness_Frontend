// pages/packageB/mine/buy/buy.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        buyList: [{
            title: '会员月卡',
            price: '9',
            priceDifference: 30
        }, {
            title: '会员季卡',
            price: '80',
            priceDifference: 30
        }, {
            title: '会员年卡',
            price: '299',
            priceDifference: 30
        }],
        current: 0,
        detail: [{
            title: '会员服务内容',
            list: ['不限量客户档案管理;', '不限量管理会员数量;', '不限制推广返现的提现金额。']
        }],
        isiOS: false,
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        wx.loadFontFace({
            global: true,
            family: 'Roboto-Bold',
            source: 'url("https://www.zhangleixd.com/static/imgs/Roboto-Bold-3.ttf")',
            success: console.log
        })
        this.data.userId = wx.getStorageSync('mp-req-user-id');
        const _this = this;
        wx.getSystemInfo({
            success: function(res) {
                if (res.platform == "ios") {
                    _this.setData({
                        isiOS: true,
                    })
                }
            }
        })
    },
    changeCurrent(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        })
    },
    payOrder() {
        const price = this.data.buyList[this.data.current].price;
        app.req.api.payOrder({
            "amountMoney": price, //0.01,
            // "openId": "oP1TP5cTTLZCgTXg-ZWG2d7sjfEA",           
            "payStatus": 0,
            "productType": this.data.current,
            "userId": this.data.userId || 'f15371d7-975b-4ae9-98fb-df54453ef0a5'
        }).then(res => {
            const data = res.data;
            wx.requestPayment({
                ...data,
                "paySign": data.sign,
                "success": function(res) {
                    console.log('支付成功', res)
                    wx.showToast({
                        title: '购买成功',
                    })
                    wx.navigateBack({
                        delta: 0,
                    })
                },
                "fail": function(res) {
                    wx.showToast({
                        title: '支付失败',
                        icon: 'error'
                    })
                },
                "complete": function(res) {
                    console.log('支付完成', res)
                }
            })
        })
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})