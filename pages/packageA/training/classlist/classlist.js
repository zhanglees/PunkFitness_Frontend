// pages/packageA/training/classlist/classlist.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
        type: 'plan',  //默认是训练计划进来
        list: [],
        slideButtons: [{
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }],
        dialogShow: false,
        dialogIndex: '',//当前要删除的index
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const { userId, type } = options;   //用来区分是训练规划还是训练记录,记录则每条跳转到该阶段对应的课程，规划则每条跳转到该阶段的详情
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.setData({
            userId,
            coachId,
            type: type
        })
        // this.getStageList();
    },
    getStageList(){
        const { userId, coachId } = this.data;
        //取数据
        app.req.api.getUserClassByCoachId({
            userId,
            coachId
        }).then(res=>{
            console.log('fanhui list:', res.data);
            let stageList = res.data.userTrainItems;
            this.setData({
                trainingPlanId: res.data.trainingPlanId,
                list: stageList
            });
        })
    },
    /****添加训练计划 */
    addBtn(e){
        wx.navigateTo({
          url: '/pages/packageA/training/plan/plan?userId=' + this.data.userId + '&trainingPlanId=' + this.data.trainingPlanId,
        })
    },
    /***查看该阶段课程列表 */
    gotoDetail(e){
        const {index, trainingplanid, classid, coachname, usertrainitemid, classnum} = e.currentTarget.dataset;
        const url = '/pages/packageA/training/' + (this.data.type == 'plan' ? ('stagedetail/stagedetail?') : ('class/class?userTrainitemId=' + usertrainitemid + '&classNum=' + classnum)) + '&trainingPlanId='  + trainingplanid + '&userId=' + this.data.userId + '&classId=' + classid + '&coachName=' + coachname;
        //查详情的接口需要传大量的参数，所以先存起来吧
        // wx.setStorage({
        //   key: "stageDetail",
        //   data: this.data.list[index]
        // });
        wx.navigateTo({
          url        
        })
    },
    slideButtonTap(e) {
        const {index, usertrainitemid} = e.currentTarget.dataset;
        //删除
        this.setData({
            dialogShow: true,
            dialogIndex: index,
            delId: usertrainitemid
        })
    },
/***删除一条阶段 */
    tapDialogButton(e) {
        if(e.detail.index === 1){
            //删除
            app.req.api.delUserTrainClassById({
                userTrainitemId: this.data.delId
            }).then(res=>{
                if(res.data){
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success'
                    })
                    let list = this.data.list;
                    const index = this.data.dialogIndex;
                    list.splice(index, 1);
                    this.setData({
                        list: list,
                        dialogIndex: ''
                    })
                }else{
                    wx.showToast({
                      title: '稍后重试',
                      icon: 'error'
                    })
                }
            })
        }
        this.setData({
            dialogShow: false
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
        this.getStageList();

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