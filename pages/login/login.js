// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
        backUrl: '/pages/index/index' //登录后跳转页面
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.backUrl = options.back; //登录完成后回到跳转页面
        // console.log(options.back)
        wx.login({
            success: (res) => {
                this.setData({
                    wxCode: res.code
                });
            }
        });
    },

    getPhoneNumber: function(e) {
        const _this = this;
        const { encryptedData, iv } = e.detail;
        if (!encryptedData || !iv) { // 如果参数不存在就退出函数
            return false;
        }
        wx.checkSession({
            success: () => { // session_key 未过期，并且在本生命周期一直有效，那么可以直接请求登录方法，把值传给后台
                if (this.data.wxCode) { // 判断 临时登录凭证 code 是否存在
                    this.wxLogin(this.data.wxCode, encryptedData, iv);
                } else { // 若不存在，需要重新执行登录流程
                    goNext();
                }
            },
            fail: () => { // session_key 已经失效，需要重新执行登录流程
                goNext();
            }
        });
        const goNext = () => { // wx.login
            wx.login({
                success: (res) => {
                    const {
                        code
                    } = res;
                    if (!code) {
                        return false;
                    }
                    this.wxLogin(code, encryptedData, iv)
                }
            })
        };
    },
    //调用后端登录接口
    wxLogin(code, encryptedData, iv) {
        const _this = this;
        wx.showLoading({ // 显示登录 loading
            title: '登录中...',
        })
        app.req.api.getWXPhone({
            code, // 临时登录凭证 code
            encryptedData, // 用户信息加密数据
            iv // 加密算法的初始向量
        }).then(res => {
            wx.hideLoading();
            if (res.code == 0) {
                const userInfo = res.data;
                console.log('用户信息：', userInfo)
                wx.setStorageSync('userInfo', userInfo);
                this.data.userInfo = userInfo;
                if (!userInfo.headImg) {
                    this.showGetInfo();
                } else {
                    if (_this.data.backUrl.includes('mine')) {
                        wx.switchTab({
                            url: _this.data.backUrl,
                        })
                    } else {
                        wx.redirectTo({
                            url: _this.data.backUrl,
                        })
                    }
                }
            } else {
                wx.showModal({
                    title: "提示", // 提示的标题
                    content: res.message, // 提示的内容
                    showCancel: false // 是否显示取消按钮
                });
            }
        }, err => {
            wx.hideLoading();
            //登录失败
            wx.showModal({
                title: "提示", // 提示的标题
                content: "登录失败，请重新登录", // 提示的内容
                showCancel: false // 是否显示取消按钮
            });
        })
    },
    //弹框授权用户信息
    showGetInfo: function() {
        const _this = this;
        wx.showModal({
            title: "提示",
            content: "您是首次使用小程序，我们希望获得您的个人信息，以便为您提供更好的服务",
            showCancel: false, // 是否显示取消按钮
            success(res) {
                // 用户点击了确定
                if (res.confirm) {
                    wx.getUserProfile({
                        desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success: res => {
                            // 用户同意授权
                            const userInfo = {..._this.data.userInfo, ...res.userInfo };
                            console.log('用户信息：', userInfo)
                            app.req.api.modifyUserInfoById({
                                headImg: userInfo.avatarUrl,
                                phone: userInfo.phone,
                                id: userInfo.id,
                                userName: userInfo.nickName
                            }).then(res => {
                                const data = res.data;
                                wx.setStorageSync('userInfo', {..._this.data.userInfo, ...data });

                                if (_this.data.backUrl.includes('mine')) {
                                    wx.switchTab({
                                        url: _this.data.backUrl,
                                    })
                                } else {
                                    wx.redirectTo({
                                        url: _this.data.backUrl,
                                    })
                                }
                            })
                        },
                        fail: e => {
                            // 用户拒绝授权
                            if (_this.data.backUrl.includes('mine')) {
                                wx.switchTab({
                                    url: _this.data.backUrl,
                                })
                            } else {
                                wx.redirectTo({
                                    url: _this.data.backUrl,
                                })
                            }
                        },
                        complete: e => {
                            // 接口调用结束（调用成功、失败都会执行）
                        }
                    });
                }
            }
        });
    },
    goback: function() {
        wx.switchTab({
            url: (this.data.backUrl.includes('mine') ? '/pages/mine/mine' : '/pages/index/index'),
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})