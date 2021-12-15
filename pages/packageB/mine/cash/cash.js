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
        shareImg: '',    //分享图片本地临时地址
        qrUrl: 'https://weixin.hotapp.cn/src/home/img/qrcode_example.png',//后端返回的绑定二维码
        bgImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F11027940679%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642063080&t=79b634c4f6f7daffb2d8aad1408a55ce', //分享图片地址
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
                      authAlbum: false
                    //   [`dialogButtons[0].text`]: '授权保存' 
                  })
              }
            }
        })
    },
    /***获取推广图片 */
    showQr(url){
    // 接口获取二维码
      this.setData({
        shareImg: url,  
        dialogShow: true
      })
    },
    /****开始画图 */
    createNewImg(){
        if(this.data.shareImg){
            this.showQr(this.data.shareImg);
        }else{
            const that = this;
            wx.showToast({
              title: '图片生成中',
              mask: true,
              icon: 'loading',
              duration: 100000
            });
            wx.createSelectorQuery().select('#shareFrends')
            .fields({ 
              node: true,
              size: true 
            }).exec(function (res) {
                console.log(res)
              const canvas = res[0].node
              const context = canvas.getContext('2d')
              const width = res[0].width
              const height = res[0].height
              context.restore();
              const dpr = wx.getSystemInfoSync().pixelRatio
              canvas.width = width * dpr
              canvas.height = height * dpr
              context.scale(dpr, dpr)
              context.clearRect(0, 0, width , height);
              context.fillStyle = 'white'
              context.fillRect(0, 0, width, height)
              context.save();
              let path = that.data.bgImg;
              const hbPromise = new Promise((resolve, reject) => {
                const hb = canvas.createImage()
                hb.onload = () => {
                  resolve(hb)
                }
                hb.onerror = () => {
                  reject(new Error(`fail to fetch image form: ${path}`))
                }
                hb.src = path
              })
              hbPromise.then(img => {
                context.drawImage(img, 0, 0, width, height * 0.8)
              })
      
              // 画二维码
              var codepath = that.data.qrUrl;
              const codePromise = new Promise((resolve, reject) => {
                const code = canvas.createImage()
                code.onload = () => {
                  resolve(code)
                }
                code.onerror = () => {
                  reject(new Error(`fail to fetch image form: ${codepath}`))
                }
                code.src = codepath
              })
              codePromise.then(img => {
                context.drawImage(img, 15, height * 0.83 , 100 , 100)
              })
    
                // 画话
            var t1 = "长按扫码";
            var title = "";
            var tishi = "每一個想要學習的念頭，那有可能是未來的你在向你求救。";
            context.fillStyle = '#333';
            context.fillText(t1, 130, height * 0.872);
            context.font = 'normal bold 13px sans-serif';
            context.fillText(title, 130, height * 0.9);
            context.fillStyle = '#999';
            context.font = 'normal 10px sans-serif';
            context.fillText(tishi, 130, height * 0.93);
            context.stroke();
            context.save();  
    
            setTimeout(() => {
              that.toSave(canvas);
            }, 1000);
            })

        }
        
    },
    toSave(canvas) {
        console.log(canvas)
        let that = this
        wx.canvasToTempFilePath({
          x : 0,
          y: 0,
          canvasId: 'share',
          canvas: canvas,
          width: that.data.widths,
          height: that.data.heights ,
          destWidth: that.data.widths * wx.getSystemInfoSync().pixelRatio,
          destHeight: that.data.heights * wx.getSystemInfoSync().pixelRatio,
          success: function (res) {
            let canvasToTempFilePath = res.tempFilePath // 返回的图片地址保存到一个全局变量里
            // console.log(res)
            wx.hideToast();
            that.showQr(canvasToTempFilePath)
          },
            fail: function (error) {
              console.log(error)
            }
        })
      },
    tapDialogButton(e) {
        const _this = this;
        console.log(8888, e.currentTarget)
        // if(e.detail.index === 1){
            if( !this.data.authAlbum ){
                this.getSetting();
            }else{
                const imgSrc = _this.data.shareImg;
                // wx.downloadFile({
                //     url: imgSrc,
                //     success: function (res) {
                //         console.log(res);
                        //图片保存到本地
                        wx.saveImageToPhotosAlbum({
                            filePath: imgSrc,
                            success: function (data) {
                                wx.showToast({
                                    title: '保存成功',
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
                //     }
                // })
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