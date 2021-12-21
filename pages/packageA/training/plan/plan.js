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
            value: '178',
            status: ''
        }, {
            name: '体重',
            unit: 'kg',
            value: '51',
            status: '0'
        }, {
            name: 'BMI',
            unit: '',
            value: '11',
            status: '1'
        }, {
            name: '体脂率',
            unit: '',
            value: '20',
            status: '3'
        }, {
            name: '肌肉量',
            unit: 'kg',
            value: '40',
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
        stageBase: {
            name: '',
            exp: false,  //是否展开
            detail: [{
                id: 'points',
                name: '训练重点',
                options: ['综合体能', '柔韧性', '力量', '心肺功能', '肌肉含量', '提高基础代谢'],
                checked: [],
                addFlag: false//添加自定义
            }, {
                id: 'items',
                name: '训练项目',
                options: ['基础力量', '基础体能', '自由力量', '固定器械', '核心训练', '被动拉伸'],
                checked: [],
                addFlag: false
            }, {
                id: 'target',
                name: '训练目标',
                checked: [],
                options: [{
                    name: '体重变化',
                    value: '',
                    checked: false
                }, {
                    name: '体脂变化',
                    value: '',
                    checked: false
                }, {
                    name: '肌肉变化',
                    value: '',
                    checked: false
                }],
                addFlag: false
            }],
            frequency: '',
            cycle: '',
            times: '',
            remark: '',
            classNum: ''
        },
        stageArr: ['适应期', '进步期', '巩固期', '第4阶段', '第5阶段'],
        stageList: [],
        stageItems: ['训练重点', '训练项目', '训练目标'],
        stageItemBase: [{
            id: 'points',
            name: '训练重点',
            options: [],
            checked: [],
            addFlag: false//添加自定义
        }, {
            id: 'items',
            name: '训练项目',
            options: [],
            checked: [],
            addFlag: false
        }, {
            id: 'target',
            name: '训练目标',
            checked: [],
            options: [],
            addFlag: false
        }],
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        totalPeriod: '',
        frequencies: ''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        let coachId = wx.getStorageSync('mp-req-user-id');
        this.setData({
            userId: options.userId,
            coachId
        })
        this.getStageList();
    },
    getStageList(){
        app.req.api.getTrainClassByCoachId({
            coachId: this.data.coachId
        }).then(res=>{
            console.log('fanhui:', res.data)
            let data = res.data;
            const stageItems = this.data.stageItemBase;
            data.forEach(stage=>{
                let classContents = stage.classContents;
                let detail = [];
                classContents.forEach(item=>{
                    const trainTarg = item.trainTarg;
                    if(detail[trainTarg]){
                        detail[item.trainTarg].options.push({
                            id: item.classContentId,
                            name: item.itemName,
                            value: '',
                            checked: false
                        })
                    }else{
                        detail[trainTarg] = {
                            id: trainTarg,
                            name: this.data.stageItems[trainTarg],
                            options: [{
                                id: item.classContentId,
                                name: item.itemName,
                                value: '',
                                checked: false
                            }],
                            checked: [],
                            addFlag: false
                        }
                    }
                })
                stage.detail = detail;
            })
            console.log(999999, data)
            this.setData({
                stageList: data
            })
        })
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
        console.log(888, this.data.stageList[index].detail[d].options[i])
    },
    /***** 阶段目标 值*/
    targetValue(e){
        const {i, d, index} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`stageList[${index}].detail[${d}].options[${i}].value`]: value
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
        const detail = this.data.stageList[index].detail[d];
        let options = detail.options;
        let checked = detail.checked;
        const value = e.detail.value;
        if(value != ''){
            checked.push(value);
            options.push(value);
            this.setData({
                [`stageList[${index}].detail[${d}].options`]: options,
                [`stageList[${index}].detail[${d}].checked`]: checked,
                [`stageList[${index}].detail[${d}].addFlag`]: false
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
        console.log(stage.frequency, stage.cycle)
        if(id != 'times' && stage.frequency && stage.cycle){
                let classNum = stage.frequency * stage.cycle;
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
            [`stageList[${index}].remark`]: value
        })
    },
    /***添加阶段 */
    addStage(e){
        let stageList = this.data.stageList;
        const base = this.data.stageBase;
        stageList.push({...base, name: `第${stageList.length + 1}阶段`})
        this.setData({
            stageList: stageList
        })
    },
    /****删除阶段 */
    delStage(e){
        const {index} = e.currentTarget.dataset;
        this.setData({
            delIndex: index,
            dialogShow: true
        })
    },

    tapDialogButton(e) {
        if(e.detail.index === 1){
            //确定  删除
            const index = this.data.delIndex;
            let stageList = this.data.stageList;
            stageList.splice(index, 1);
            this.setData({
                stageList: stageList,
                dialogShow: false
            })
        }else{
            this.setData({
                dialogShow: false
            })
        }
    },
    /*****修改阶段名称 */
    changeStageTitle(e){
        const {index} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`stageList[${index}].name`]: value
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
        const {coachId, frequencies, totalPeriod, userId, stageList} = this.data;
        const userTrainItems = [];
        console.log(8888, stageList)
        stageList.forEach((stage, i)=>{
            let userTrainplanClassContents = [];
            const {classId, classNum} = stage;
            stage.detail.forEach(d=>{
                d.options.forEach(item=>{
                    if(item.checked){
                        userTrainplanClassContents.push({
                            ...item,
                            classId
                        })
                    }
                })
            })
            console.log(8888888899999, stage)
            userTrainItems.push({
                classId,                                                  
                classNum,                                                                      
                userTrainplanClassContents
            })
        });
        app.req.api.createUserTrainPlan({
            coachId, 
            frequencies, 
            totalPeriod, 
            userId,            
            userTrainItems
        }).then(res=>{
            console.log('返回：', res.data)
            wx.redirectTo({
              url: '/pages/packageA/training/classlist/classlist',
            })
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