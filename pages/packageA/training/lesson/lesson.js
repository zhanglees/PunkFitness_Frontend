// pages/packageA/training/lesson/lesson.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        editFlag: true, //false, //是否为编辑状态
        canEdit: true, //是否可编辑  已完成课程不可编辑
        warmList: ['跑步热身', '椭圆仪热身', '单车热身', '自主体能热身'],
        warmSel: '',
        relaxList: ['主动拉伸', '被动拉伸', '肌肉松解', '筋膜枪'],
        relaxSel: '',
        itemsShow: [{ //课程详情展示内容
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
        }, {
            name: '训练部位',
            id: 'trainingAreaName'
        }],
        lesson: {}, //课程详情
        actionList: [],
        expand: false,
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getLessonDetail();
    },
    getLessonDetail() {
        this.setData({
            lesson: {
                warm: '跑步热身',
                relax: '被动拉伸',
                actionList: [{
                    action: 2,
                    actionName: "阿诺德推胸（肩伸90℃）",
                    coachId: "f15371d7-975b-4ae9-98fb-df54453ef0a5",
                    counterWeight: 23,
                    equipment: 0,
                    equipmentName: "哑铃",
                    groups: 3,
                    numberSinglegroup: 2,
                    sectionDetailId: "0acacd8a-027e-486a-b6bb-81acfd70b7c5",
                    sectionName: "sfdafds",
                    trainingArea: 0,
                    trainingAreaName: "胸大肌",
                    trainingType: 0,
                    userId: "14c6962a-fb31-4ad5-ae72-6fcb74054a53",
                    usertrainSectionId: "ec404a18-5148-4376-bfc3-a7146f0585ec",
                    videourl: "https://www.zhangleixd.com/static/14c6962a-fb31-4ad5-ae72-6fcb74054a53/face/d17429da-b9e3-4121-a2ec-16d630e82e72.mp4"
                }, {
                    action: 0,
                    actionName: "颈前引体向上",
                    coachId: "f15371d7-975b-4ae9-98fb-df54453ef0a5",
                    counterWeight: 4,
                    equipment: 0,
                    equipmentName: "哑铃",
                    groups: 4,
                    numberSinglegroup: null,
                    sectionDetailId: "e82f3d65-d761-4e93-a4d8-f5c43810f24f",
                    sectionName: "sfdafds",
                    trainingArea: 2,
                    trainingAreaName: "背阔肌",
                    trainingType: 0,
                    userId: "14c6962a-fb31-4ad5-ae72-6fcb74054a53",
                    usertrainSectionId: "ec404a18-5148-4376-bfc3-a7146f0585ec",
                    videourl: "https://www.zhangleixd.com/static/14c6962a-fb31-4ad5-ae72-6fcb74054a53/face/82bfb94c-c44b-463d-990d-af5bf53d786e.mp4"
                }]
            }
        })
    },
    selOption(e) {
        const { name, value } = e.currentTarget.dataset;
        this.setData({
            [name]: value
        })
    },
    //展开正式训练
    trainingItemExpand(e) {
        //展开的同时如果没有动作就调用添加动作
        if (this.data.actionList.length == 0) { this.addone() }
        this.setData({
            expand: !this.data.expand
        })
    },
    edit(e) {
        this.setData({
            editFlag: true
        })
    },
    /****编辑课程名称 */
    inputNameChange(e) {
        const value = e.detail.value;
        this.setData({
            sectionName: value
        });
    },
    //添加一个动作
    addone(e, i) {
        let list = this.data.actionList;
        list.push({
            trainingAreaName: '',
            actionName: '',
            equipmentName: '',
            counterWeight: '',
            numberSinglegroup: '',
            groups: '',
            videourl: '',
            video: '', //上传临时文件地址
            videoImg: ''
        });
        this.setData({
            actionList: list
        })
    },
    bindSelChangeEdit(e) {
        const { index, name } = e.currentTarget.dataset;
        const valueIndex = e.detail.value;
        let value = '';
        if (name == 'trainingArea') {
            value = this.data.trainingPart[valueIndex].name;
            this.setData({
                [`actionList[${index}]`]: '',
                [`actionList[${index}]`]: ''
            });
        } else if (name == 'action') {
            const trainingArea = this.data.actionList[index].trainingArea;
            value = this.data.trainingPart[trainingArea].actionList[valueIndex];
        } else {
            value = this.data.equipment[valueIndex];
        }
        // this.data.editedIndex.push(index + '-' + i);
        this.setData({
            [`actionList[${index}].${name}`]: valueIndex,
            [`actionList[${index}].${name}Name`]: value,
        });
    },
    inputChangeEdit(e) {
        const { index, name } = e.currentTarget.dataset;
        const value = e.detail.value;
        // this.data.editedIndex.push(index + '-' + i);
        this.setData({
            [`actionList[${index}].${name}`]: value
        });
    },
    //开始录制视频
    startVideo(e) {
        const _this = this;
        const { index } = e.currentTarget.dataset;
        wx.chooseMedia({
            count: 1,
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                const videoPath = res.tempFilePath,
                    videoImgPath = res.thumbTempFilePath;

                _this.setData({
                    [`actionList[${index}].videourl`]: videoPath,
                    [`actionList[${index}].videoImg`]: videoImgPath
                });
                _this.uploadVideo(videoPath, index, 'videourl');
                _this.uploadVideo(videoImgPath, index, 'videoImg');
            }
        })
    },
    /**删除某个动作 */
    delAct(e) {
        const { index } = e.currentTarget.dataset;
        let list = this.data.actionList;
        list.splice(index, 1);
        console.log(index, list)
        this.setData({
            actionList: list
        })
    },
    /****上传视频、缩略图 */
    uploadVideo(video, index, type) {
        const _this = this;
        if (video.length) {
            app.req.api.uploadFile({
                path: video,
                formData: {
                    userId: this.data.userId
                },
                success(res) {
                    console.log('上传:', index, res)
                    _this.setData({
                        [`actionList[${index}].${type}`]: res.data
                    })
                }
            })
        }
    },
    /**删除某个视频 */
    delVideo(e) {
        const { index } = e.currentTarget.dataset;
        let key = `actionList[${index}]`;
        this.setData({
            // [key + '.video']: '',
            [key + '.videourl']: '',
            [key + '.videoImg']: '',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})