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
        checkAppointment: {},
        showTypeDialog: false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        //日历初始化的时候就会调用接口请求数据，所以页面load完之后不用再请求一遍
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.data.coachId = coachId;
    },
    getList() {
        console.log('日期： ', this.data.selDate.replace(/\.|\-/g, '/'))
        app.req.api.getUserAppointmentAllByDate({
            appointmentTime: new Date(this.data.selDate.replace(/\.|\-/g, '/')).getTime(),
            coachId: this.data.coachId
        }).then(res => {
            const list = res.data;
            this.setData({
                list: list
            })
        })
    },
    /****签课 */
    checkin(e) {
        const { trainingplanid, userid, appointmentid, type } = e.currentTarget.dataset;
        // if(trainingplanid != 'null'){
        //这里要发请求拿回该用户的课程列表
        app.req.api.getUserSectionList({
                coachId: this.data.coachId,
                trainingPlanId: (type == 0) ? 'exprienceClassPlan' : trainingplanid,
                userId: userid
            }).then(res => {
                let classList = res.data;
                classList.sort((a, b) => {
                    return a.showOrder - b.showOrder;
                });
                this.setData({
                    classList,
                    checkAppointment: {
                        appointmentId: appointmentid,
                        userId: userid,
                        type
                    },
                    dialogButtons: classList.length ? false : [{ text: '取消' }, { text: '确定' }],
                    dialogShow: true
                })
            })
            // }else{
            //     this.setData({
            //         classList: [],
            //         dialogShow: true
            //     })
            // }
    },
    cancel(e) {
        const appointmentId = e.currentTarget.dataset.appointmentid;
        app.req.api.cancelAppointment({
            appointmentId
        }).then(res => {
            if (res.code == 0) {
                wx.showToast({
                    title: '签到成功',
                })
                this.getList();
            }
        })
    },
    /****签到选课 */
    bindClassChange(e) {
        const value = e.detail.value;
        this.setData({
            checkClass: value
        })
    },
    tapDialogButton(e) {
        if (e.detail.index === 1) {
            //确定  发请求确定签到   签到成功后更新列表数据
            if (this.data.classList.length) {
                const usertrainSectionId = this.data.classList[this.data.checkClass[0]].usertrainSectionId;
                app.req.api.singIn({
                    ...this.data.checkAppointment,
                    coachId: this.data.coachId,
                    usertrainSectionId
                }).then(res => {
                    if (res.code == 0) {
                        wx.showToast({
                            title: '签到成功',
                        })
                        this.getList();
                    } else {
                        wx.showToast({
                            title: '签到失败',
                            icon: 'error'
                        })
                    }
                })
            } else {
                this.gotoTraining();
            }
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
    typeDialogShow() {
        let showTypeDialog = !this.data.showTypeDialog;
        this.setData({
            showTypeDialog,
        })
    },
    goReserve(e) {
        wx.navigateTo({
            url: '/pages/reserve/reserve?type=' + e.currentTarget.dataset.type,
        })
    },
    gotoTraining() {
        //没有课程则去创建
        const appointmentId = this.data.checkAppointment.appointmentId;
        wx.navigateTo({
            url: '/pages/packageA/training/' + ['experience/experience?userId=', 'classlist/classlist?type=record&userId='][this.data.checkAppointment.type] + this.data.checkAppointment.userId + '&appointmentId=' + (appointmentId || ''),
        })
    },
    gotoClass(e) {
        const classInfo = this.data.classList[e.currentTarget.dataset.index];
        const { userId, trainingPlanId, userTrainitemId, usertrainSectionId, sectionName, showOrder } = classInfo;
        const appointmentId = this.data.checkAppointment.appointmentId;
        // console.log(888888, userId, trainingPlanId, userTrainitemId, coachId, usertrainSectionId, sectionName)
        let url = `/pages/packageA/training/lesson/lesson?type=edit&showOrder=${showOrder}&userId=${userId}&usertrainSectionId=${usertrainSectionId}&sectionName=${sectionName}&trainingPlanId=${trainingPlanId}&userTrainitemId=${userTrainitemId}&appointmentId=${appointmentId || ''}`;
        wx.navigateTo({
            url,
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
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo,
            dialogShow: false,
        })
        if (userInfo && userInfo.phone) {
            this.getList();
        } else {
            this.setData({
                list: []
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