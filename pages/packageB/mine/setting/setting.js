// pages/packageB/mine/setting/setting.js
var app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        avatar: '',
        upAvatar: false,
        myAvatar: ['/images/avatar.png'],
        myAvatarUp: '',  //图片上传后后端返回的地址，提交的时候提交这个地址
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        genders: ["男", "女"],
        formData: {
            sex: 0,
            birthday: '',
            phone: '',
            height: 170,
            weight: 50
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        if (wx.getUserProfile) {
          this.setData({
            canIUseGetUserProfile: true
          })
        }

    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res)
            // getApp().globalData.userInfo = res.userInfo;
            wx.setStorage({
                key: "userInfo",
                data: res.userInfo
            })
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      },
/****切换头像*/
    changeAvatar: function () {
        var that = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                console.log(res.tempFilePaths + "修改页面")
                var avatar = res.tempFilePaths;
                that.setData({
                    myAvatar: avatar,
                    upAvatar:true
                });
                //上传图片
                app.req.api.uploadimg({
                    url: 'URL地址',
                    path: that.data.myAvatar,
                    header: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": "Bearer " + wx.getStorageSync('token')
                    },
                    isShow: false,
                    callBack(resp){
                        console.log('图片上传完成：',resp)
                    }
                });
            },
            fail: function () {
            // fail
            },
            complete: function () {
            // complete
            }
        })
    },
    getPhoneNumber (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
        var that = this;
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          app.req.api.decodePhone({
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              userToken: that.data.userToken,
            }).then(res=> {
              that.setData({
                phoneNumber:res.phoneNumber
              })
          })
        }
      },
    valueChange(e) {
      const {field} = e.currentTarget.dataset
      this.setData({
          [`formData.${field}`]: e.detail.value
      })
    },
    /*****提交数据 */
    submit(){
        console.log('提交数据：', this.data.formData);
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