// pages/packageA/training/edit/edit.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        editFlag: false,
        items: [{
            name: '训练部位',
            id: 'trainingAreaName'
        }, {
            name: '动作',
            id: 'actionName'
        }, {
            name: '器械',
            id: 'equipmentName'
        }, {
            name: '配重',
            id: 'counterWeight',
            unit: 'kg'
        }, {
            name: '单组次数',
            id: 'numberSinglegroup',
            unit: '次'
        }, {
            name: '组数',
            id: 'groups',
            unit: '组'
        }],
        trainingList: [{
            name: '热身训练',
            actionList: [],
            showAdd: false,
            editIndex: '',
            detail: {
                trainingAreaName: '',
                actionName: '',
                equipmentName: '',
                counterWeight: '',
                numberSinglegroup: '',
                groups: ''
            }
        }, {
            name: '正式训练',
            actionList: [],
            showAdd: false,
            detail: {
                trainingAreaName: '',
                actionName: '',
                equipmentName: '',
                counterWeight: '',
                numberSinglegroup: '',
                groups: ''
            }
        }, {
            name: '放松整理',
            actionList: [],
            showAdd: false,
            detail: {
                trainingAreaName: '',
                actionName: '',
                equipmentName: '',
                counterWeight: '',
                numberSinglegroup: '',
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
        equipment: ['哑铃', '杠铃', '龙门架', '拉力器', '固定训练器械', '弹力带', '壶铃', '自由深蹲架', '360训练架', '瑜伽垫', '徒手', '自定义'],
        editedIndex: []  //这个数组用来记录被编辑过的动作索引
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const type = options.type;
        const coachId = wx.getStorageSync('mp-req-user-id');
        const { userId } = options;
        if(type == 'edit') {
            //编辑
            const { showOrder, usertrainSectionId, sectionName,trainingPlanId, userTrainitemId } = options;
            this.setData({
                coachId,
                userId, 
                sectionName, 
                usertrainSectionId,
                trainingPlanId, 
                userTrainitemId,
                showOrder,
                type
            })
            this.getClassDetail(coachId, userId, usertrainSectionId, sectionName);
        }else if(type == 'new'){
            //新建
            const { showOrder, userTrainitemId, trainingPlanId } = options;
            this.setData({
                coachId,
                userId, 
                userTrainitemId, 
                trainingPlanId,
                showOrder,
                editFlag: true,
                type
            })
        }else{
            app.req.api.getUserExperienceLessonDetail({
                coachId,
                userId
            }).then(res=>{
                this.setData({
                    ...res.data,
                    trainingList: this.dataFormate(res.data),
                    coachId,
                    userId, 
                    editFlag: !res.data.userTraionSectionDetails,
                    type
                })
            })
        }
        // const item = wx.getStorageInfoSync('class')[parseInt(id)-1];
        // if(id && item){
        //     this.setData({
        //         name: item.name,
        //         trainingList: item.trainingList
        //     })
        // }
    },
    getClassDetail(coachId, userId, usertrainSectionId, sectionName){
        app.req.api.getUserClassSectionDetail({coachId, userId, usertrainSectionId, sectionName}).then(res=>{
            this.setData({
                trainingList: this.dataFormate(res.data)
            })
        })
    },
    dataFormate(data){
        const userTraionSectionDetails = data.userTraionSectionDetails;
        let trainingList = this.data.trainingList;
        userTraionSectionDetails && userTraionSectionDetails.forEach(section => {
            let training = trainingList[section.trainingType || 0];
            section.videourl = 'https://' + section.videourl;
            training.actionList.push({
                ...section,
                trainingAreaName: (section.trainingArea!=null) ? this.data.trainingPart[section.trainingArea].name : '',
                actionName: ((section.trainingArea!=null) && (section.action!=null)) ? this.data.trainingPart[section.trainingArea].actionList[section.action] : '',
                equipmentName: (section.equipment!=null)  ? this.data.equipment[section.equipment] : ''
            })
        })
        return trainingList;
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
            sectionName: value
        });
    },
    addone(e){
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`trainingList[${index}].showAdd`]: true,
            [`trainingList[${index}].detail`]: {
                trainingAreaName: '',
                actionName: '',
                equipmentName: '',
                counterWeight: '',
                numberSinglegroup: '',
                groups: ''
            }
        })
    },
    bindSelChange(e){
        const {index, name} = e.currentTarget.dataset;
        const valueIndex = e.detail.value;
        let value = '';
        if(name=='trainingArea'){
            value = this.data.trainingPart[valueIndex].name;
            this.setData({
                [`trainingList[${index}].detail.action`]: '',
                [`trainingList[${index}].detail.actionName`]: ''
            });
        }else if(name == 'action'){
            value = this.data.trainingPart[this.data.trainingList[index].detail.trainingArea].actionList[valueIndex];
        }else{
            value = this.data.equipment[valueIndex];
        }
        this.setData({
            [`trainingList[${index}].detail.${name}`]: valueIndex,
            [`trainingList[${index}].detail.${name}Name`]: value
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
        if(name=='trainingArea'){
            value = this.data.trainingPart[valueIndex].name;
            this.setData({
                [`trainingList[${index}].actionList[${i}].actionName`]: '',
                [`trainingList[${index}].actionList[${i}].action`]: ''
            });
        }else if(name == 'action'){
            const trainingArea = this.data.trainingList[index].actionList[i].trainingArea;
            value = this.data.trainingPart[trainingArea].actionList[valueIndex];
        }else{
            value = this.data.equipment[valueIndex];
        }
        this.data.editedIndex.push(index+'-'+ i);
        this.setData({
            [`trainingList[${index}].actionList[${i}].${name}`]: valueIndex,
            [`trainingList[${index}].actionList[${i}].${name}Name`]: value,
        });
        console.log(9999, this.data.editedIndex)
    },
    inputChangeEdit(e){
        const {index, name, i} = e.currentTarget.dataset;
        const value = e.detail.value;
        this.data.editedIndex.push(index+'-'+ i);
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
            let key = '';
            if(i == 'detail'){
                key = `trainingList[${index}].detail.video`
            }else{
                key = `trainingList[${index}].actionList[${i}].video`
            }
            _this.setData({
                [key]: res.tempFilePath
            });
            _this.uploadVideo(res.tempFilePath, index, i);
          }
        })
      },
      /**删除某个视频 */
    delAct(e){
        const {index, i} = e.currentTarget.dataset;
        let key = '';
        if(i == 'detail'){
            key = `trainingList[${index}].detail`;
        }else{
            key = `trainingList[${index}].actionList[${i}]`;
            this.data.editedIndex.push(index+'-'+ i);
        }
        this.setData({
            [key + '.video']: '',
            [key + '.videourl']: ''
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
/****上传视频 */
    uploadVideo(video, index, i){
        const _this = this;
        if(video.length){
            app.req.api.uploadFile({
                path: video,  
                formData: {
                    userId: this.data.userId
                },
                success(res){
                    console.log('上传:', index, res)
                    let key = '';
                    if(i == 'detail'){
                        key = `trainingList[${index}].detail`;
                    }else{
                        key = `trainingList[${index}].actionList[${i}]`;
                        _this.data.editedIndex.push(index+'-'+ i);
                    }
                    _this.setData({
                        [`${key}.videourl`]: res.data
                    })
                }
            })
        }
    },
    previewVideo(e){
        const src = e.currentTarget.dataset.src;
        console.log(e.currentTarget.dataset)
        wx.previewImage({ 
          current: src, // 当前显示图片的http链接 
          urls: [src] // 需要预览的图片http链接列表 
         }) 
    },
    delOne(e){
        const {index, a, sectiondetailid} = e.currentTarget.dataset;
        if(this.data.type != 'new'){
            //编辑状态的删除就真的提交删除了
            const {coachId, userId} = this.data;
            app.req.api.delUserSectionDetail({
                coachId,
                userId,
                sectionDetailId: sectiondetailid
            }).then(res=>{
                if(res.code == 0){
                    const training = this.data.trainingList[index];
                    let actionList = training.actionList;
                    actionList.splice(a, 1);;
                    this.setData({
                        [`trainingList[${index}].actionList`]: actionList,
                    })
                }
            })
        }else{
            const training = this.data.trainingList[index];
            let actionList = training.actionList;
            actionList.splice(a, 1);;
            this.setData({
                [`trainingList[${index}].actionList`]: actionList,
            })
        }
    },
    /***保存一条新增动作 */
    saveOne(e){
        const {index} = e.currentTarget.dataset;
        if(this.data.type != 'new'){
            //编辑进来就真的新增一条
            const {coachId, userId, sectionName, usertrainSectionId} = this.data;
            app.req.api.adddUserSectionDetail({
                ...this.data.trainingList[index].detail,
                coachId, userId, sectionName, usertrainSectionId,
                trainingType: index
            }).then(res=>{
                if(res.code == 0){
                    this.saveOneDo(index, res.data);
                }else{
                    wx.showToast({
                      title: '请重试',
                      icon: 'error'
                    })
                }
            })
        }else{
            this.saveOneDo(index);
        }
    },
    saveOneDo(index, data){
        const training = this.data.trainingList[index];
        const detail = {...training.detail, ...(data || {})};
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
        console.log(8888, this.data.trainingList[index].actionList)
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
        this.setData({
            editFlag: false
        })
        const { type, showOrder, sectionName, coachId, userId, trainingPlanId, userTrainitemId } = this.data;
        if(type != 'new'){
            //编辑进来 只修改课程名称
            if(type == 'edit'){
                app.req.api.submitUserClassSection({
                    coachId,                                         
                    sectionName,                          
                    showOrder,                                             
                    trainingPlanId,          
                    userId,              
                    userTrainitemId,    
                    usertrainSectionId: this.data.usertrainSectionId
                }).then(res=>{
                    if(res.code == 0){
                        wx.showToast({
                            title: '提交成功',
                        })
                        wx.navigateBack({
                            delta: 0,
                        })
                    }
                })
            }
            //然后挨个去看哪些动作被编辑过了，就调用编辑接口，这个实现实在是糟糕
            let editedIndex = this.data.editedIndex;
            console.log(9999, editedIndex)
            if(editedIndex.length){
                editedIndex = [...new Set(editedIndex)];
                editedIndex.forEach(i=>{
                    const t = i.split('-');
                    let data = this.data.trainingList[t[0]].actionList[t[1]];
                    app.req.api.editUserClassSectionDetail({
                        ...data,
                        trainingType: t[0]
                    }).then(res=>{
                        console.log('保存：', res.data)
                    })
                })
            }
            if(type == 'experience'){
                wx.navigateBack({
                    delta: 0,
                })
            }
        }else{
            let trainingList = this.data.trainingList;
            let userTraionSectionDetails = [];
            trainingList.forEach((training, type) => {
                training.actionList.forEach(action => {
                    userTraionSectionDetails.push({
                        ...action,              
                        sectionName,      
                        trainingType: type  
                    })
                })
            })
            console.log('提交：', userTraionSectionDetails)
            app.req.api.addUserTrainClassSection({
                showOrder,
                coachId,                                     
                sectionName: sectionName || `第${showOrder}节训练课`,                               
                trainingPlanId,                                
                userId,         
                userTrainitemId,  
                userTraionSectionDetails
            }).then(res=>{
                console.log('提交返回：', res.data)
                if(res.code == 0){
                    wx.navigateBack({
                        delta: 0,
                    })
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