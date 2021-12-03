// pages/packageB/mine/cash/cash.js
Page({

    /**
     * Page initial data
     */
    data: {

        info: {
            title: '推广返现规则：',
            content: ['推荐教练扫码识别二维码入驻平台并购买会员，即可获得30%的购买金额的现金返现，可随时提现哦;'],
            tips: '注：返现金额可以通过绑定个人银行卡申请提现或微信提现，体现到账周期为T+1。'
        },
        dialogShow: false,
        imgUrl: '',  //后端返回的绑定二维码
        dialogButtons: [{ text: '保存到相册' }],
        authAlbum: true,
        tabList: ['未入驻', '已入驻'],
        current: 0,
        list: [[{
            name: '用户名字~',
            type: 1
        }, {
            name: '是用户名字~',
            type: 1
        }, {
            name: '是用户名字~',
            type: 1
        }], [{
            name: '是用户名字~',
            type: 0
        }, {
            name: '是用户名字~',
            type: 0
        }]]
    },
    
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const _this = this;
        wx.getSetting({
            success (res) {
              console.log(res.authSetting)
              if(res.authSetting['scope.writePhotosAlbum'] != undefined && !res.authSetting['scope.writePhotosAlbum']){
                  _this.setData({
                      authAlbum: false,
                      [`dialogButtons[0].text`]: '授权保存' 
                  })
              }
            }
        })
    },
    /***获取推广图片 */
    getQr(){
    // 接口获取二维码
      this.setData({
        imgUrl: '/images/hb.png',  
        dialogShow: true
      })
    },
    tapDialogButton(e) {
        const _this = this;
        // if(e.detail.index === 1){
            if(this.data.dialogButtons[0].text == '授权保存' ){
                this.getSetting();
            }else{
                //下载
                const imgSrc = "http://yijiao.oss-cn-qingdao.aliyuncs.com/images/http://tmp/wx1b4e5e756cd48af1.o6zAJsws4grEQvYrWTjBigy-6QaU.0llhudiKSF2V955a1c48350d9328ef064b4d36d12746.jpg";
                wx.downloadFile({
                    url: imgSrc,
                    success: function (res) {
                        console.log(res);
                        //图片保存到本地
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function (data) {
                                wx.showToast({
                                    title: '下载成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                _this.setData({
                                    dialogShow: false
                                })
                            },
                            fail: function (err) {
                                console.log(err);
                                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                    wx.showToast({
                                        title: '拒绝授权无法下载，请先进行授权',
                                    })
                                    _this.setData({
                                        [`dialogButtons[1].text`]: '授权' 
                                    })
                                }
                            },
                            complete(res){
                                console.log(res);
                            }
                        })
                    }
                })
            }
        // }else{
        //     this.setData({
        //         dialogShow: false
        //     })
        // }
    },
    getSetting(){
        const _this = this;
        wx.openSetting({
            success(settingdata) {
                console.log('settingdata:', settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    _this.setData({
                        [`dialogButtons[1].text`]: '保存到相册' 
                    })
                    _this.tapDialogButton({detail:{index:1}});
                } else {
                    wx.showToast({
                        title: '获取权限失败，无法保存',
                        icon: 'none',
                        duration: 2000
                    });
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                }
            }
        })
    },
    closeDialog(){
        this.setData({
            dialogShow: false
        })
    },
    tabChange(e){
      const curr = e.currentTarget.dataset.id;
      this.setData({
          current: curr
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