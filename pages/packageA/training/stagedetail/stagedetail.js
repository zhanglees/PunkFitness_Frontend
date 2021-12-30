// pages/packageA/training/stagedetail/stagedetail.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
        userTrainingPlan: {},
        stageList: [],
        infoList: [{
            name: '健身频率',
            unit: '次/周',
            id: 'frequencies'
        }, {
            name: '健身总周期',
            unit: '月',
            id: 'totalPeriod'
        }, {
            name: '健身总次数',
            unit: '次',
            id: 'frequencies'
        }],
        // stageName: '适应期',
        // list: [{
        //     name: '训练重点',
        //     list: ['综合体能', '力量']
        // }, {
        //     name: '训练项目',
        //     list: ['基础力量', '基础体能', '被动拉伸']
        // }, {
        //     name: '训练目标',
        //     list: ['体重变化'],
        //     goal: '30kg'
        // }],
        // frequency: 2,
        // week: 4,
        // count: 8,
        // remarks: '备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息'
        stageItems: ['训练重点', '训练项目', '训练目标'],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const {trainingPlanId, userId, coachName, classId} = options;
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.setData({
            coachId,
            userId,
            trainingPlanId,
            classId,
            coachName
        })
        this.getStageDetail(userId, trainingPlanId, coachId);
        // this.getStageDetailContent();
    },
    // getStageDetailContent(){
    //     const stageDetail = wx.getStorageSync('stageDetail');
    //     app.req.api.getTrainClassItemContent({
    //         ...stageDetail
    //     }).then(res=>{
    //         let data = res.data;
    //         let userTrainplanClassContents = [];
    //         data.userTrainplanClassContents.forEach(item => {
    //             const index = item.trainTarg;
    //             const d = {
    //                 itemName: item.itemName,
    //                 contentItemValue: item.contentItemValue
    //             };
    //             if(!userTrainplanClassContents[index]){
    //                 userTrainplanClassContents[index] = {
    //                     name: this.data.stageItems[index],
    //                     list: [d]
    //                 };
    //             }else{
    //                 userTrainplanClassContents[index].list.push(d);
    //             }
    //         })
    //         this.setData({
    //             ...data,
    //             userTrainplanClassContents
    //         })
    //     })
    // },
    
    getStageDetail(userId, trainPlainId, coachId){
        app.req.api.getUserTrainPlainDetail({userId, trainPlainId, coachId}).then(res=>{
            let classInfos = res.data.classInfos;
            classInfos = classInfos.filter((i)=>{return i.classId == this.data.classId;})
            classInfos.forEach((stage, i)=>{
                classInfos[i] = this.dataFormate(stage);
                console.log('详情返回stage:', stage)
            })
            console.log('详情返回:', classInfos)
            let userTrainingPlan = res.data.userTrainingPlan;
            if(userTrainingPlan && userTrainingPlan.goalsMethod){userTrainingPlan.goalsMethod = userTrainingPlan.goalsMethod.split(',');}
            this.setData({
                stageList: classInfos,
                userTrainingPlan
            })
        })
    },
    dataFormate(stage){
        let classContents = stage.classContents;
        let detail = [];
        classContents.forEach(item=>{
            if(item.userChose){
                const trainTarg = item.trainTarg;
                if(detail[trainTarg]){
                    detail[item.trainTarg].options.push({
                        ...item
                    })
                }else{
                    detail[trainTarg] = {
                        id: trainTarg,
                        name: this.data.stageItems[trainTarg],
                        options: [{
                            ...item
                        }]
                    }
                }
            }
        })
        stage.classContents = detail;
        if(stage.userTrainItem){
            stage = {...stage.userTrainItem, ...stage}
        }
        return stage;
    },
    //getTrainClassItemContent
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