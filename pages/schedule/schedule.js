// pages/schedule/schedule.js
var utils = require('../../utils/util.js')
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        list: [],
        classList: [],
        selDate: String(new Date()),
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        checkClass: [0], //选中的课
        checkAppointment: {}
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        //日历初始化的时候就会调用接口请求数据，所以页面load完之后不用再请求一遍
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.data.coachId = coachId;
    },
    getList(){
        console.log('日期： ', this.data.selDate.replace(/\.|\-/g, '/'))
        app.req.api.getUserAppointmentAllByDate({
            appointmentTime: new Date(this.data.selDate.replace(/\.|\-/g, '/')).getTime(),
            coachId: this.data.coachId
        }).then(res=>{
            const list = res.data;
            this.setData({
                list: list
            })
        })
    },
    /****签课 */
    checkin(e){
        const {trainingplanid, userid, appointmentid} = e.currentTarget.dataset;
        //这里要发请求拿回该用户的课程列表
        app.req.api.getUserSectionList({
            coachId: this.data.coachId,
            trainingPlanId: trainingplanid,
            userId: userid
        }).then(res=>{
            let classList = res.data;
            classList.sort((a, b) => {
                return a.showOrder - b.showOrder;
              });
            this.setData({
                classList,
                checkAppointment: {
                    appointmentId: appointmentid,
                    userId: userid
                },
                dialogShow: true
            })
        })
        this.setData({
            dialogShow: true
        })
    },
    /****签到选课 */
    bindClassChange(e){
        const value = e.detail.value;
        this.setData({
            checkClass: value
        })
    }, 
    tapDialogButton(e) {
        if(e.detail.index === 1){
            //确定  发请求确定签到   签到成功后更新列表数据
            const usertrainSectionId = this.data.classList[this.data.checkClass[0]].usertrainSectionId;
            app.req.api.singIn({
                ...this.data.checkAppointment,
                coachId: this.data.coachId,
                usertrainSectionId
            }).then(res=>{
                if(res.code == 0){
                    wx.showToast({
                      title: '签到成功',
                    })
                    this.getList();
                }else{
                    wx.showToast({
                      title: '签到失败',
                      icon: 'error'
                    })
                }
            })
        }
        this.setData({
            dialogShow: false
        })
    },
//日历点击事件
  mydata(e) { 
    let date = e.detail.data;
    this.data.selDate = date,
    console.log(date);
    //去拿着日期请求当天的预约列表
    this.getList();
  },
    /****去预约界面 */
    goReserve(e){
        wx.navigateTo({
          url: '/pages/reserve/reserve',
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
        this.getList();
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