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
        userId: '',
        userInfo: {},
        time: '',
        dialogButtons: [{ text: '取消' }, { text: '转为正式会员' }],
        showDialog: false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.data.coachId = coachId;

    },
/***检索用户 */
formInputChange(e){
    let userId = wx.getStorageSync('mp-req-user-id');
    const value = e.detail.value;
    //请求检索接口
    app.req.api.searchMember({
        "coachId": userId,
        "condition": value
    }).then(res=>{
        const result = res.data;
        this.setData({
            result: result,
            showResult: true
        })
    })
    // app.req.api.getUserAll({
    //     key: value
    // }).then(res=>{
    //     const result = res.data;
    //     this.setData({
    //         result: result,
    //         showResult: true
    //     })
    // })
},
chooseUser(e){
    const {id, name, info} = e.currentTarget.dataset;
    this.setData({
        userName: name,
        userId: id,
        userInfo: info,
        showResult: false
    })
},
onPickerChange(e){
    console.log("onPickerChange", e)
    this.setData({
        time: e.detail.value
    })
},
tapDialogButton(e) {
    if(e.detail.index === 1){
        //确认
        const _this = this;
        const id = this.data.userId;
        app.req.api.transformMember(this.data.userInfo).then(res=>{
          if(res.data) {
              //转为正式会员后直接预约
            _this.goReserve(null, true);
            _this.setData({
              showDialog: false
            })
          }else{
            wx.showToast({
                title: '请稍后重试',
                icon: 'error',
                duration: 2000
            });
            _this.setData({
                showDialog: false
            })
          }
          //请求返回之后的结果 失败提示  成功更新按钮状态
        })
    }else{
      this.setData({
        showDialog: false
      })
    }
},
/***确认预约**/
goReserve(e, flag){
    if(!flag && this.data.userInfo.coustomLevel != 1){
        //如果该会员还不能预约则弹窗提示
        this.setData({
            showDialog: true
        })
    }else{
        const data = {
            userId: this.data.userId,
            appointmentTime: new Date(this.data.time.replace(/\.|\-/g, '/')).getTime(),
            coachId: this.data.coachId 
        };
        app.req.api.appointment(data).then(res=>{
            if(res.code == 0){
                //确认预约成功后返回前一页
                // let pages = getCurrentPages(); 
                // let prevPage = pages[ pages.length - 2 ];
                // prevPage.setData({
                //     selDate: this.data.time
                // });
                wx.showToast({
                    title: '预约成功',
                    duration: 2000
                });
                wx.navigateBack({
                    delta: 0
                })
            }else{
                wx.showToast({
                    title: res.message,
                    icon: 'error',
                    duration: 2000
                });
            }
        })
    }
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