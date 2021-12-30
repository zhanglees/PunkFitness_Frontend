// pages/packageA/training/plan/plan.js
const app = getApp()
Page({
    /**
     * Page initial data
     */
    data: {
        bodyData: [{
            name: '身高',
            unit: 'cm',
            id: 'height',
            status: ''
        }, {
            name: '体重',
            unit: 'kg',
            id: 'weight',
            status: '0'
        }, {
            name: 'BMI',
            unit: '',
            id: 'bmi',
            status: '1'
        }, {
            name: '体脂率',
            unit: '',
            id: 'bodyFatRatio',
            status: '3'
        }, {
            name: '肌肉量',
            unit: 'kg',
            id: 'muscleMass',
            status: '2'
        }],
        statusList: ['理想', '偏低', '标准', '超高', '极高风险'],
        dataTime: '2021/10/11',
        targetList: [{
            name: '减脂',
            checked: false
        }, {
            name:  '增肌', 
            checked: false
        }, {
            name: '塑形', 
            checked: false
        }, {
            name: '增强体质',
            checked: false
        }],
        stageColors: ['#F8A803', '#10B89E', '#E95041', '#1093E9', '#EF7710', '#756DFF', '#F5AB13'],
        stageArr: ['适应期', '进步期', '巩固期'],
        stageList: [],
        stageItems: ['训练重点', '训练项目', '训练目标'],
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        totalPeriod: '',
        frequencies: '',
        newIndex: '',   //新增的索引
        error: ''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const coachId = wx.getStorageSync('mp-req-user-id');
        const userId = options.userId;
        const trainingPlanId = (options.trainingPlanId=='null') ? null : options.trainingPlanId;
        this.setData({
            userId,
            trainingPlanId,
            coachId
        })
        this.getLastHealthReport(userId, coachId);
        if(trainingPlanId){
            this.getStageDetail(userId, trainingPlanId, coachId);
        }else{
            this.getStageList();
        }
    },
    getLastHealthReport(userId, coachId){
        app.req.api.getLastHealthReport({
            coachId,
            userId
        }).then(res=>{
            this.setData({
                bodyDataData: res.data
            })
        });
    },
    getStageDetail(userId, trainPlainId, coachId){
        app.req.api.getUserTrainPlainDetail({userId, trainPlainId, coachId}).then(res=>{
            console.log('详情返回:', res.data)
            let data = res.data.classInfos;
            const newIndex = data.length;
            data = data.filter((i)=>{return (!i.userTrainItem && i.isShow)})
            data.forEach(stage=>{
                stage = this.dataFormate(stage);
            })
            const userTrainingPlan = res.data.userTrainingPlan;
            this.setData({
                stageList: data,
                newIndex,
                ...userTrainingPlan,
                goalsMethod: userTrainingPlan.goalsMethod ? userTrainingPlan.goalsMethod.split(',') : []
            })
        })
    },
    getStageList(){
        app.req.api.getTrainClassByCoachId({
            coachId: this.data.coachId
        }).then(res=>{
            console.log('fanhui:', res.data)
            let data = res.data;
            data.forEach(stage=>{
                stage = this.dataFormate(stage);
            })
            this.setData({
                stageList: data,
                newIndex: data.length
            })
        })
    },
    /****用来处理后端奇葩的数据格式 */
    dataFormate(stage){
        let classContents = stage.classContents;
        let detail = [];
        classContents.forEach(item=>{
            const trainTarg = item.trainTarg;
            if(detail[trainTarg]){
                detail[item.trainTarg].options.push({
                    classContentId: item.classContentId,
                    itemName: item.itemName,
                    contentItemValue: item.itemValue || '',
                    checked: item.userChose || false
                })
            }else{
                detail[trainTarg] = {
                    id: trainTarg,
                    name: this.data.stageItems[trainTarg],
                    options: [{
                        classContentId: item.classContentId,
                        itemName: item.itemName,
                        contentItemValue: item.itemValue || '',
                        checked:  item.userChose || false
                    }],
                    addFlag: false
                }
            }
        })
        stage.detail = detail;
        if(stage.userTrainItem){
            stage = {...stage, ...stage.userTrainItem}
        }
        return stage;
    },
    /*****健身目标 选择*/
    tapTarget(e){
        const {index} = e.currentTarget.dataset;
        const checked = this.data.targetList[index].checked;
        this.setData({
            [`targetList[${index}].checked`]: !checked 
        })
    },
    /***健身目标 点击+其他 */
    tapAddTarget(e){
       this.setData({
           addTargetFlag: true
       });
   },
   /***健身目标 添加完成 */
   addTarget(e){
       const targetList = this.data.targetList;
       const value = e.detail.value;
       if(value != ''){
           targetList.push({
               name: value,
               checked: true
           })
           this.setData({
               targetList
           })
       }
       this.setData({
           addTargetFlag: false
       });
   },
   /****健身目标 end****/
    /***点击某个阶段  展开阶段详情 */
    expDetail(e){
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`stageList[${index}].exp`]: !this.data.stageList[index].exp
        })
    },
    /****选择某项 重点 项目*/
    checkedOne2222(e){
        const {i, index, d} = e.currentTarget.dataset;
        const detail = this.data.stageList[index].detail[d];
        const point = detail.options[i];
        let checked = detail.checked;
        const checkedIndex = checked.indexOf(point);
        if(checkedIndex != -1){
            checked.splice(checkedIndex, 1);
        }else{
            checked.push(point);
        }
        this.setData({
            [`stageList[${index}].detail[${d}].checked`]: checked,
        })
    },
    /*****选择 阶段目标 */
    checkedOne(e){
        const {i, index, d} = e.currentTarget.dataset;
        this.setData({
            [`stageList[${index}].detail[${d}].options[${i}].checked`]: !this.data.stageList[index].detail[d].options[i].checked
        })
    },
    /***** 阶段目标 值*/
    targetValue(e){
        const {i, d, index} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`stageList[${index}].detail[${d}].options[${i}].contentItemValue`]: value
        })
    },
    /***点击自定义 */
    tapAddOption(e){
        const {d, index} = e.currentTarget.dataset;
        this.setData({
            [`stageList[${index}].detail[${d}].addFlag`]: true
        });
    },
    /***添加完成 */
    addOption(e){
        const {d, index} = e.currentTarget.dataset;
        const stage = this.data.stageList[index];
        const detail = stage.detail[d];
        let options = detail.options;
        let checked = detail.checked;
        const value = e.detail.value;
        if(value != ''){
            // checked.push(value);
            app.req.api.addTrainClassContent({  
                itemName: value,    
                owner: this.data.coachId,       
                trainClassId: stage.classId,  
                trainTarg: d
            }).then(res=>{
                options.push({
                    classContentId: res.data.classContentId,
                    itemName: res.data.itemName,
                    contentItemValue: '',
                    checked: true
                });
                console.log(options)
                this.setData({
                    [`stageList[${index}].detail[${d}].options`]: options,
                    // [`stageList[${index}].detail[${d}].checked`]: checked,
                    [`stageList[${index}].detail[${d}].addFlag`]: false
                })
            })
        }else{
            this.setData({
                [`stageList[${index}].detail[${d}].addFlag`]: false
            })
        }
    },
    /*****频率周期change  计算所需课时 */
    changefct(e){
        const {id, index} = e.currentTarget.dataset;
        const value = e.detail.value;
        const stage = this.data.stageList[index];
        this.setData({
            [`stageList[${index}].${id}`]: value
        })
        console.log(stage.stageFrequency, stage.stagePeriod)
        if(id != 'times' && stage.stageFrequency && stage.stagePeriod){
                let classNum = stage.stageFrequency * stage.stagePeriod;
            this.setData({
                [`stageList[${index}].classNum`]: classNum
            });
        }
    },
    /***备注 */
    remarkChange(e){
        const {index} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`stageList[${index}].coachRemarks`]: value
        })
    },
    /***添加阶段 */
    addStage(e){
        let newIndex = this.data.newIndex;
        //先弹个窗输入阶段名
        this.setData({
            newStageName: `第${newIndex + 1}阶段`,
            newStageNameShow: true
        })
    },
    confirmNewStage(e){
        if(e.detail.index === 1){
            let stageList = this.data.stageList;
            let newIndex = this.data.newIndex;
            const _this = this;
            app.req.api.addTrainClass({
                className: this.data.newStageName,
                ownerId: this.data.coachId
            }).then(res=>{
                console.log(8888, res.data);
                if(res.code == 0){
                    let data = res.data;
                    data = _this.dataFormate(data);
                    stageList.push(data);
                    console.log(8888, stageList);
                    this.setData({
                        stageList: stageList,
                        newStageNameShow: false,
                        newIndex : newIndex++
                    })

                }
            })
        }else{
            this.setData({
                newStageNameShow: false
            })

        }
    },
    /****删除阶段 */
    delStage(e){
        const {index, classid} = e.currentTarget.dataset;
        this.setData({
            delIndex: index,
            delId: classid,
            dialogShow: true
        })
    },

    tapDialogButton(e) {
        if(e.detail.index === 1){
            //确定  删除
            const index = this.data.delIndex;
            app.req.api.deleteCoachTrainClass({
                classId: this.data.delId,
                coachId: this.data.coachId
            }).then(res=>{
                if(res.code == 0){
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success'
                    })
                    let stageList = this.data.stageList;
                    stageList.splice(index, 1);
                    this.setData({
                        stageList: stageList,
                        dialogShow: false
                    })
                }else{
                    wx.showToast({
                      title: '稍后重试',
                      icon: 'error'
                    })
                }
            })
        }else{
            this.setData({
                dialogShow: false
            })
        }
    },
    /*****修改阶段名称 */
    changeStageTitle(e){
        const value = e.detail.value;
        this.setData({
            newStageName: value
        })
    },
    inputChange(e){
        const {field} = e.currentTarget.dataset
        this.setData({
            [`${field}`]: e.detail.value
        })
    },
    /*****创建训练方案 */
    createPlan(){
        //整理提交数据  跳转回上一页
        const {coachId, frequencies, totalPeriod, userId, stageList, targetList, trainingPlanId} = this.data;
        let userTrainItems = [];
        let goalsMethod = [];
        let error = [];
        stageList.forEach((stage, i)=>{
            let userTrainplanClassContents = [];
            const {classId, classNum, stageFrequency, stagePeriod, coachRemarks} = stage;
            stage.detail.forEach((d, i)=>{
                d.options.forEach(item=>{
                    if(item.checked){
                        userTrainplanClassContents.push({
                            ...item,
                            trainTarg: i,
                            classId
                        })
                    }
                })
            })
            userTrainItems.push({
                classId,                                                  
                classNum,    
                stageFrequency, 
                stagePeriod,    
                coachRemarks,                                                             
                userTrainplanClassContents
            })
            if(!classNum && userTrainplanClassContents.length){
                error.push(stage.className)
            }
        });
        if(error.length){
            this.setData({
                error: error[0] + '阶段频率与周期必填！'
            })
        }else{
            userTrainItems = userTrainItems.filter(i=>{return !!i.classNum});
            if(trainingPlanId){
                app.req.api.createUserTrainClass({
                    coachId, 
                    trainingPlanId,
                    userId,          
                    userTrainItems
                }).then(res=>{
                    console.log('返回：', res.data)
                    wx.navigateBack({
                    delta: 0,
                    })
                })
            }else{
                targetList.forEach(t=>{
                    if(t.checked){
                        goalsMethod.push(t.name);
                    }
                });
                app.req.api.createUserTrainPlan({
                    coachId, 
                    frequencies, 
                    totalPeriod, 
                    userId, 
                    goalsMethod: goalsMethod.join(','),           
                    userTrainItems
                }).then(res=>{
                    console.log('返回：', res.data)
                    wx.navigateBack({
                    delta: 0,
                    })
                })
            }
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