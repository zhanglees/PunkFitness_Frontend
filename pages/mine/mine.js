// pages/mine/mine.js
var app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        withdraw: 6888,
        memberTime: '2021-12-30',
        showBuy: true,
        actionList: [{
            title: '会员购买',
            link: '/pages/packageB/mine/buy/buy'
                // }, {
                //     title: '推广返现',
                //     link: '/pages/packageB/mine/cash/cash'
        }]
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        const _this = this;
        // wx.getSystemInfo({
        //     success: function(res) {
        //         if (res.platform == "ios") {
        //             _this.setData({
        //                 showBuy: false,
        //             })
        //         }
        //     }
        // })
        wx.loadFontFace({
                global: true,
                family: 'Roboto-Bold',
                source: 'url("https://www.zhangleixd.com/static/imgs/Roboto-Bold-3.ttf")'
            })
            // this.data.userId = wx.getStorageSync('mp-req-user-id');
            // if (wx.getUserProfile) {
            //     this.setData({
            //         canIUseGetUserProfile: true
            //     })
            // }
            // app.req.api.getMyInfo()
            //   .then((res) => {
            //     console.log(res);
            //   })
            //   .catch(app.req.err.show);

    },
    getUserInfo() {
        const id = this.data.id;
        app.req.api.getUserById({
            id
        }).then(res => {
            let data = res.data;
            // if (data && data.headImg && !data.headImg.includes('https://')) {
            //     data.headImg = 'https://' + data.headImg
            // }
            this.setData({
                userInfo: data
            })
        })
    },
    gotoSetting() {
        wx.navigateTo({
            url: '/pages/packageB/mine/setting/setting',
        })
    },
    gotoLogin() {
        // app.globalData.backUrl = '/pages/mine/mine';
        wx.navigateTo({
            url: '/pages/login/login?back=/pages/mine/mine',
        })
    },
    // getUserProfile(e) {
    //     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    //     wx.getUserProfile({
    //         desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //         success: (res) => {
    //             console.log(res)
    //                 // getApp().globalData.userInfo = res.userInfo;
    //             wx.setStorage({
    //                 key: "userInfo",
    //                 data: res.userInfo
    //             })
    //             this.setData({
    //                 userInfo: res.userInfo,
    //                 hasUserInfo: true
    //             })
    //         }
    //     })
    // },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo && userInfo.phone) {
            this.data.id = userInfo.id;
            this.getUserInfo();
        } else {
            this.setData({
                userInfo: {}
            })
        }
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