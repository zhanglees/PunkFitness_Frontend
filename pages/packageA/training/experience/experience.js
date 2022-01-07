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
        this.getList(userId, coachId);
    },
    
    getList(userId, coachId){
        app.req.api.getUserTrainPlainDetail({
            trainPlainId: 'exprienceClassPlan',
            coachId,
            userId
        }).then(res=>{
            console.log(888888, res.data)
        });
    },
    getList2(userId, coachId){
        app.req.api.getUserExperienceLessonDetail({
            coachId,
            userId
        }).then(res=>{
            console.log(888, res.data)
        });
    },
    getClasses(){
        const {userId, userTrainitemId, trainingPlanId, classId, coachId, classNum} = this.data;
        app.req.api.getUserClassSection({
            classId,                         
            trainingPlanId,                   
            userId,                              
            userTrainitemId,                     
            coachId
        }).then(res=>{
            const data = res.data;
            console.log(9999, classNum)
            let classList = new Array(parseInt(classNum)).fill({status: 0});
            let classes = [];
            data.forEach((i, k) => {
                i.status = i.usertrainSectionId ? (i.completeTime ? 2 : 1) : 0;
                classList[i.showOrder - 1] = i;
            });
            this.setData({
                classes: classList
            })
        })
        // this.setData({
        //     name: '适应期',
        //     coach: '王建祥',
        //     count: count,
        //     classes: classList
        // })
    },
    slideButtonTap(e) {
        const {type, index} = e.currentTarget.dataset;
        if(e.detail.index === 1){
            //删除
            this.setData({
                dialogShow: true,
                dialogIndex: index
            })
        }
        console.log('slide button tap', this.data.classes[index])
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
                    classes.splice(index, 1);
                    classes.push({});
                    this.setData({
                        classes: classes,
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
        const {userId, trainingPlanId, userTrainitemId} = this.data;
        const {status} = classItem;
        let url = '/pages/packageA/training/edit/edit?';
        if(status){
            //已编辑 查详情
            const {coachId, usertrainSectionId, sectionName} = classItem;
            url += ('type=edit&showOrder=' + (index+1) + '&coachId=' + coachId + '&userId=' + userId + '&usertrainSectionId=' + usertrainSectionId+ '&sectionName=' + sectionName+ '&trainingPlanId=' + trainingPlanId + '&userTrainitemId=' + userTrainitemId);
        }else{
            //去新建
            url += ('type=new&showOrder=' + (index+1)+ '&trainingPlanId=' + trainingPlanId + '&userId=' + userId + '&userTrainitemId=' + userTrainitemId);
        }
        wx.navigateTo({
          url,
        })
    },
    addBtn(){
        const {userId, userTrainitemId, classes} = this.data;
        const index = classes.length + 1;
        const trainingPlanId = 'exprienceClassPlan';
        const url = '/pages/packageA/training/edit/edit?' + ('type=new&showOrder=' + (index+1)+ '&trainingPlanId=' + trainingPlanId + '&userId=' + userId + '&userTrainitemId=' + userTrainitemId);
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