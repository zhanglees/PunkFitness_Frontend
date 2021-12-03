// pages/packageA/training/edit/edit.js
Page({

    /**
     * Page initial data
     */
    data: {
        editFlag: false,
        items: [{
            name: '训练部位',
            id: 'part'
        }, {
            name: '动作',
            id: 'action'
        }, {
            name: '器械',
            id: 'equipment'
        }, {
            name: '配重',
            id: 'ounterweight'
        }, {
            name: '单组次数',
            id: 'times'
        }, {
            name: '组数',
            id: 'groups'
        }],
        trainingList: [{
            name: '热身训练',
            actionList: [{
                part: '胸大肌',
                partIndex: 0,
                action: '平板推胸',
                actionIndex: 0,
                equipment: '龙门架',
                equipmentIndex: 3,
                ounterweight: '3',
                times: '3',
                groups: '3'
            }],
            showAdd: false,
            editIndex: '',
            detail: {
                part: '',
                action: '',
                equipment: '',
                ounterweight: '',
                times: '',
                groups: ''
            }
        }, {
            name: '正式训练',
            actionList: [],
            showAdd: false,
            detail: {
                part: '',
                action: '',
                equipment: '',
                ounterweight: '',
                times: '',
                groups: ''
            }
        }, {
            name: '放松整理',
            actionList: [],
            showAdd: false,
            detail: {
                part: '',
                action: '',
                equipment: '',
                ounterweight: '',
                times: '',
                groups: ''
            }
        }],
        trainingPart: [{
            name: '胸大肌',
            actionList: ['平板推胸', '上斜推胸', '阿诺德推胸（肩伸90℃）', '仰卧飞鸟', '坐姿飞鸟', '站姿夹胸', '坐姿推胸', '俯卧撑', '俯身反向飞鸟', '自定义']
        }, {
            name: '三角肌',
            actionList: ['站姿飞鸟', '俯身飞鸟', '坐姿飞鸟', '站姿颈前推肩', '站姿颈后推肩', '坐姿推肩', '坐姿颈后推肩', '站姿提拉', '俯身外展', '俯身提拉', '自定义']
        }, {
            name: '背阔肌',
            actionList: ['颈前引体向上', '颈后引体向上', '正手引体向上', '反手引体向上', '宽距引体向上', '窄距引体向上', '高位下拉', '宽距高位下拉', '窄距高位下拉', '颈前高位下拉', '颈后高位下拉', '坐姿划船', '站姿划船', '站姿俯身划船', '单臂站姿划船', '单臂俯身划船', '坐姿单臂划船', '直臂下压', '曲腿硬拉', '山羊挺身', '俯卧挺身', '自定义']
        }, {
            name: '肱二头肌',
            actionList: ['站姿弯举', '坐姿弯举', '悬垂弯举', '集中弯举', '锤式弯举', '自定义']
        }, {
            name: '肱三头肌',
            actionList: ['俯身臂屈伸', '站姿臂屈伸', '坐姿臂屈伸', '单臂俯身臂屈伸', '凳上臂屈伸', '颈后臂屈伸', '自定义']
        }, {
            name: '腹直肌',
            actionList: ['卷腹', '举腿', '坐姿举腿', '悬垂举腿', '仰卧举腿', 'plank', '仰卧两头起', '肘膝交叉两头起', '自定义']
        }, {
            name: '腹外斜肌',
            actionList: ['侧向卷腹', '侧向挺身', '俄罗斯转体', '手脚交叉两头起', '侧向举腿', '侧向支撑', '自定义']
        }, {
            name: '股四头肌',
            actionList: ['坐姿腿屈伸', '深蹲', '单腿蹲', '半蹲', '箭步蹲', '箭步走', '一字深蹲', '过顶蹲', '颈前蹲', '后撤箭步蹲', '挺举', '抓举', '自定义']
        }, {
            name: '腘绳肌',
            actionList: ['俯卧腿弯举', '直腿硬拉', '曲腿硬拉', '俯卧挺身起', '坐姿腿弯举', '自定义']
        }, {
            name: '臀大肌',
            actionList: ['直腿硬拉', '箭步俯身蹲', '箭步走', '单腿硬拉', '单腿俯身蹲', '后撤箭步蹲', '山羊挺身', '俯卧挺身', '十字平衡', '自定义']
        }, {
            name: '臀中小肌',
            actionList: ['侧卧举腿', '蚌式', '侧卧腿开合', '侧卧直腿画圈', '坐姿髋外展', '自定义']
        }, {
            name: '大腿内收肌',
            actionList: ['坐姿腿开合', '站姿腿开合', '外八深蹲', '仰卧腿开合', '自定义']
        }, {
            name: '比目鱼肌/腓肠肌',
            actionList: ['坐姿提踵', '站姿提踵', '足拓屈', '自定义']
        }, {
            name: '斜方肌',
            actionList: ['负重耸肩', '自定义']
        }, {
            name: '束脊肌',
            actionList: ['自定义']
        }, {
            name: '肱桡肌',
            actionList: ['锤式弯举', '自定义']
        }, {
            name: '肱肌',
            actionList: ['锤式弯举', '自定义']
        }, {
            name: '腕屈肌',
            actionList: ['自定义']
        }, {
            name: '腕伸肌',
            actionList: ['自定义']
        }, {
            name: '颈曲肌',
            actionList: ['自定义']
        }, {
            name: '颈后肌群',
            actionList: ['自定义']
        }, {
            name: '髂筋束',
            actionList: ['自定义']
        }, {
            name: '胫骨前肌',
            actionList: ['自定义']
        }],
        equipment: ['哑铃', '杠铃', '龙门架', '拉力器', '固定训练器械', '弹力带', '壶铃', '自由深蹲架', '360训练架', '瑜伽垫', '徒手', '自定义']
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const id = options.id;//当前编辑课程的id
        const userId = options.userId;
        const item = wx.getStorageInfoSync('class')[parseInt(id)-1];
        if(id && item){
            this.setData({
                id: id,
                name: item.name,
                trainingList: item.trainingList
            })
        }else if(id != undefined){
            this.setData({
                id: id
            })
        }
    },
    edit(e){
        this.setData({
            editFlag: true
        })
    },
    /****编辑课程名称 */
    inputNameChange(e){
        const value = e.detail.value;
        this.setData({
            name: value
        });
    },
    addone(e){
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`trainingList[${index}].showAdd`]: true,
            [`trainingList[${index}].detail`]: {
                part: '',
                action: '',
                equipment: '',
                ounterweight: '',
                times: '',
                groups: ''
            }
        })
    },
    bindSelChange(e){
        const {index, name} = e.currentTarget.dataset;
        const valueIndex = e.detail.value;
        let value = '';
        if(name=='part'){
            value = this.data.trainingPart[valueIndex].name;
            this.setData({
                [`trainingList[${index}].detail.actionIndex`]: '',
                [`trainingList[${index}].detail.action`]: ''
            });
        }else if(name == 'action'){
            value = this.data.trainingPart[this.data.trainingList[index].detail.partIndex].actionList[valueIndex];
        }else{
            value = this.data.equipment[valueIndex];
        }
        this.setData({
            [`trainingList[${index}].detail.${name}Index`]: valueIndex,
            [`trainingList[${index}].detail.${name}`]: value
        });
    },
    inputChange(e){
        const {index, name} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`trainingList[${index}].detail.${name}`]: value
        });
    },
    bindSelChangeEdit(e){
        const {index, name, i} = e.currentTarget.dataset;
        const valueIndex = e.detail.value;
        let value = '';
        if(name=='part'){
            value = this.data.trainingPart[valueIndex].name;
            this.setData({
                [`trainingList[${index}].actionList[${i}].actionIndex`]: '',
                [`trainingList[${index}].actionList[${i}].action`]: ''
            });
        }else if(name == 'action'){
            const partIndex = this.data.trainingList[index].actionList[i].partIndex;
            value = this.data.trainingPart[partIndex].actionList[valueIndex];
        }else{
            value = this.data.equipment[valueIndex];
        }
        this.setData({
            [`trainingList[${index}].actionList[${i}].${name}Index`]: valueIndex,
            [`trainingList[${index}].actionList[${i}].${name}`]: value
        });
    },
    inputChangeEdit(e){
        const {index, name, i} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.setData({
            [`trainingList[${index}].actionList[${i}].${name}`]: value
        });
    },

    //开始录制视频
    startVideo(e){
        const _this = this;
        const {index, i} = e.currentTarget.dataset;
        wx.chooseVideo({
          sourceType: ['album','camera'],
          maxDuration: 60,
          camera: 'back',
          success(res) {
            console.log(res.tempFilePath)
            _this.setData({
                [`trainingList[${index}].actionList[${i}].video`]: res.tempFilePath
            });
            console.log(888, _this.data.trainingList[index])
          }
        })
      },
      /**删除某个视频 */
    delAct(e){
    const {index, i} = e.currentTarget.dataset;
    this.setData({
        [`trainingList[${index}].actionList[${i}].video`]: ''
    })
    },
    /***编辑一条动作 */
    // editOne(e){
    //     const {index, a} = e.currentTarget.dataset;
    //     const training = this.data.trainingList[index];
    //     this.setData({
    //         [`trainingList[${index}].detail`]: training.actionList[a],
    //         [`trainingList[${index}].showAdd`]: true,
    //         [`trainingList[${index}].editIndex`]: a
    //     })
    // },
    delOne(e){
        const {index, a} = e.currentTarget.dataset;
        const training = this.data.trainingList[index];
        let actionList = training.actionList;
        actionList.splice(a, 1);;
        this.setData({
            [`trainingList[${index}].actionList`]: actionList,
        })
    },
    /***保存一条新增动作 */
    saveOne(e){
        const {index} = e.currentTarget.dataset;
        const training = this.data.trainingList[index];
        const detail = training.detail;
        const editIndex = training.editIndex;
        let actionList = training.actionList;
        if(editIndex || (editIndex===0)){
            actionList[editIndex] = detail;
        }else{
            actionList.push(detail);
        }
        this.setData({
            [`trainingList[${index}].actionList`]: actionList,
            [`trainingList[${index}].showAdd`]: false,
            [`trainingList[${index}].editIndex`]: ''
        });
    },
    cancelOne(e){
        const {index} = e.currentTarget.dataset;
        this.setData({
            [`trainingList[${index}].showAdd`]: false,
            [`trainingList[${index}].editIndex`]: ''
        });
    },
    /*****全页面的保存提交 */
    saveList(){
        //提交哪些数据，是每次操作触发提交还是一次整体提交，如果一次整体提交 用户会不会忘了提交直接点回退按钮
        const id = this.data.id;
        this.setData({
            editFlag: false
        })
        let classes = wx.getStorageSync('classee') || [];
        const trainingList = this.data.trainingList;
        classes[parseInt(id)-1] = {
            name: this.data.name,
            trainingList: trainingList
        }
        wx.setStorage({
            key: 'classee',
            data: classes
        })
        console.log(8888, classes, wx.getStorageSync('classee'))
        // wx.navigateBack({
        //     delta: 0,
        // })
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