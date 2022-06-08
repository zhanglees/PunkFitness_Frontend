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
        myAvatarUp: '', //图片上传后后端返回的地址，提交的时候提交这个地址
        // canIUse: wx.canIUse('button.open-type.getUserInfo'),
        // canIUseGetUserProfile: false,
        // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        genders: ["男", "女"],
        info: [{
            name: '头像',
            id: 'headImg'
        }, {
            name: '性别',
            id: 'sex',
            placeholder: '请选择'
        }, {
            name: '电话',
            id: 'phone',
            placeholder: '请输入手机号'
        }, {
            name: '生日',
            id: 'birthday',
            placeholder: '请选择'
        }, {
            name: '身高',
            id: 'userHeight',
            placeholder: '请输入身高',
            unit: 'cm'
        }, {
            name: '体重',
            id: 'userWeight',
            placeholder: '请输入体重',
            unit: 'kg'
        }],
        formData: {
            sex: 0,
            birthday: '',
            phone: '',
            userHeight: 170,
            userWeight: 50
        },
        show: false,
        showinputClose: false,
        buttons: [{
                type: 'default',
                className: 'dialog-btn-cancel',
                text: '取消',
                value: 0
            },
            {
                type: 'primary',
                className: 'dialog-btn-confirm',
                text: '确认',
                value: 1
            }
        ]
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        // if (wx.getUserProfile) {
        //     this.setData({
        //         canIUseGetUserProfile: true
        //     })
        // }
        this.data.id = wx.getStorageSync('userInfo').id;
        this.getUserInfo();
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
                formData: data
            })
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
    /****切换头像*/
    changeAvatar() {
        var that = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res) {
                console.log(res.tempFilePaths + "修改页面")
                var avatar = res.tempFilePaths[0];
                // that.setData({
                //     myAvatar: avatar,
                //     upAvatar: true
                // });
                //上传图片
                app.req.api.uploadFile({
                    path: avatar,
                    formData: {
                        userId: that.data.id
                    },
                    success(res) {
                        app.req.api.modifyUserInfoById({
                            ...that.data.formData,
                            headImg: res.data
                        }).then(res => {
                            that.getUserInfo()
                        })
                    }
                })
            }
        })
    },
    // getPhoneNumber(e) {
    //     console.log(e.detail.errMsg)
    //     console.log(e.detail.iv)
    //     console.log(e.detail.encryptedData)
    //     var that = this;
    //     if (e.detail.errMsg == "getPhoneNumber:ok") {
    //         app.req.api.decodePhone({
    //             encryptedData: e.detail.encryptedData,
    //             iv: e.detail.iv,
    //             userToken: that.data.userToken,
    //         }).then(res => {
    //             that.setData({
    //                 phoneNumber: res.phoneNumber
    //             })
    //         })
    //     }
    // },
    dateChange(e) {
        this.setData({
            ['changeItem.value']: e.detail
        })
    },
    sexChange(e) {
        this.setData({
            ['changeItem.value']: e.detail.value[0]
        })
    },
    valueChange(e) {
        // const { field } = e.currentTarget.dataset
        const value = e.detail.value;
        this.setData({
            // [`formData.${field}`]: e.detail.value
            ['changeItem.value']: value,
            showinputClose: (value.length > 0)
        })
    },
    resetInput(e) {
        this.setData({
            ['changeItem.value']: '',
            showinputClose: false
        })
    },
    changeInfo(e) {
        const { index } = e.currentTarget.dataset;
        let changeItem = this.data.info[index];
        changeItem.value = this.data.formData[changeItem.id];
        this.setData({
            changeItem,
            show: true
        })
    },
    /*****提交数据 */
    submit() {
        console.log('提交数据：', this.data.formData);
        wx.navigateBack({
            delta: 0,
        })
    },
    logout() {
        wx.setStorage({
            key: 'userInfo',
            data: null,
        })
        wx.navigateBack();
    },
    /**确定修改 */
    buttontap(e) {
        if (e.detail.index === 1) {
            const changeItem = this.data.changeItem;
            // console.log(88888, changeItem)
            const data = this.data.formData;
            data[changeItem.id] = changeItem.value;
            app.req.api.modifyUserInfoById(data).then(res => {
                this.setData({
                    show: false
                })
                this.getUserInfo();
            })
        } else {
            //取消
            this.setData({
                show: false
            })
        }
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