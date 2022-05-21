// pages/packageA/training/experience/experience.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
        classes: [],
        count: '',
        slideButtons: [{
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }],
        dialogShow: false,
        dialogIndex: '',//当前要删除的index
        dialogButtons: [{ text: '取消' }, { text: '确定' }]

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const coachId = wx.getStorageSync('mp-req-user-id');
        const { userId } = options;
        this.data.userId = userId;
        this.data.coachId = coachId;
    },
    
    getList(){
        const {userId, coachId} = this.data;
        app.req.api.getUserExperienceLessonList({
            coachId,
            userId
        }).then(res=>{
            const data = res.data;
            this.setData({
                classes: res.data
            })
        });
    },
    slideButtonTap(e) {
        const {type, index} = e.currentTarget.dataset;
        if(e.detail.index === 0){
            //删除
            this.setData({
                dialogShow: true,
                dialogIndex: index
            })
        }
    },

    tapDialogButton(e) {
        if(e.detail.index === 1){
            //删除
            const {coachId, userId} = this.data;
            let classes = this.data.classes;
            const index = this.data.dialogIndex;
            app.req.api.deleteUserClassSection({
                coachId, 
                userId, 
                usertrainSectionId: classes[index].usertrainSectionId,
                sectionName: classes[index].sectionName
            }).then(res=>{
                console.log('shanchu:', res.data)
                if(res.code == 0){
                    this.getList();
                    this.setData({
                        dialogIndex: ''
                    })
                }
            })
        }
        this.setData({
            dialogShow: false
        })
    },
    gotoDetail(e){
        const {index} = e.currentTarget.dataset;
        const classItem = this.data.classes[index];
        const {userId, trainingPlanId, userTrainitemId} = classItem;
        let url = '/pages/packageA/training/lesson/lesson?';
        //已编辑 查详情
        const {coachId, usertrainSectionId, sectionName} = classItem;
        url += ('type=edit&isExprience=1&showOrder=' + (index+1) + '&coachId=' + coachId + '&userId=' + userId + '&usertrainSectionId=' + usertrainSectionId+ '&sectionName=' + sectionName+ '&trainingPlanId=' + trainingPlanId + '&userTrainitemId=' + userTrainitemId);
        wx.navigateTo({
          url,
        })
    },
    addBtn(){
        const {userId, classes} = this.data;
        const index = classes.length + 1;
        const trainingPlanId = 'exprienceClassPlan';
        const url = '/pages/packageA/training/lesson/lesson?' + ('type=new&isExprience=1&showOrder=' + index + '&trainingPlanId=' + trainingPlanId + '&userId=' + userId);
        wx.navigateTo({
            url,
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