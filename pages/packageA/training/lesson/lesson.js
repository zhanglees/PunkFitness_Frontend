// pages/packageA/training/edit/edit.js
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        editFlag: false, //false, //是否为编辑状态
        canEdit: true, //是否可编辑  已完成课程不可编辑
        type: 'new', //新建or修改
        warmList: ['跑步热身', '椭圆仪热身', '单车热身', '自主体能热身', '教练教学热身'],
        warmUp: '',
        relaxList: ['主动拉伸', '被动拉伸', '肌肉松解', '筋膜枪松解', 'PNF对抗拉伸'],
        relax: '',
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
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        editedIndex: [], //这个数组用来记录被编辑过的动作索引
        newAction: [], //编辑时新增动作
        viewVideoUrl: ''
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        const coachId = wx.getStorageSync('mp-req-user-id');
        const { userId, type, isExprience } = options;
        // console.log(8888, isExprience)
        if (type == 'edit' || type == 'detail') {
            //编辑
            const { showOrder, usertrainSectionId, sectionName, trainingPlanId, userTrainitemId, appointmentId } = options;
            this.setData({
                coachId,
                userId,
                sectionName,
                usertrainSectionId,
                trainingPlanId,
                userTrainitemId,
                showOrder,
                appointmentId: appointmentId || '',
                type,
                isExprience: isExprience || false
            })
            this.getLessonDetail(coachId, userId, usertrainSectionId, sectionName);
        } else if (type == 'new') {
            //新建
            const { showOrder, userTrainitemId, trainingPlanId, appointmentId } = options;
            this.addone();
            this.setData({
                coachId,
                userId,
                userTrainitemId,
                trainingPlanId,
                showOrder,
                editFlag: true,
                expand: true,
                type,
                appointmentId,
                isExprience: isExprience || false
            })
        }
    },
    playVideo(e) {
        const index = e.currentTarget.dataset.index;
        const that = this;
        this.setData({
            viewVideoUrl: this.data.actionList[index].videourl || this.data.actionList[index].video
        });
        this.videoContext.requestFullScreen()
        setTimeout(() => {
            that.videoContext.play()
        }, 500)
    },
    leaveVideo() {
        this.videoContext.pause();
        this.setData({
            viewVideoUrl: null
        });
    },
    getLessonDetail(coachId, userId, usertrainSectionId, sectionName) {
        app.req.api.getUserClassSectionDetail({ coachId, userId, usertrainSectionId, sectionName }).then(res => {
            const data = res.data;
            const { warmUp, relax } = data;
            const actionList = data.userTraionSectionDetails.map(i => {
                i.thumbnailImage && (!i.thumbnailImage.includes('https://')) && (i.thumbnailImage = 'https://' + i.thumbnailImage);
                i.videourl && (!i.videourl.includes('https://')) && (i.videourl = 'https://' + i.videourl);
                return i;
            })
            this.setData({
                    warmUp,
                    relax,
                    actionList,
                    expand: actionList.length > 0
                })
                // this.getGussImage("https://www.zhangleixd.com/static/09cc20bc-3e3e-46bd-bcb2-d7a85bbf68be/face/8b593620-e590-4503-939b-46ecc18cb397.jpg")
        })
    },
    videometa(e) {
        //视频的高
        var height = e.detail.height;
        //视频的宽
        var width = e.detail.width;
        const ratio = width / height;
        const { index, type } = e.currentTarget.dataset;
        var query = wx.createSelectorQuery();
        if (ratio > 1) {
            query.select(`.action-${type}-video-wrapper`).boundingClientRect(rect => {
                const wrapperWidth = rect.width;
                this.setData({
                    [`actionList[${index}].videoStyle`]: `width:100%;height:${wrapperWidth/ratio}px;`
                })
            }).exec()
        } else {
            this.setData({
                [`actionList[${index}].videoStyle`]: `width:${ratio*(type=="edit" ? 388 : 156)}rpx;height:100%;`
            })
        }
    },

    edit(e) {
        this.setData({
            editFlag: true
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
            video: '', //上传临时文件地址  之所以要俩个 是因为它上传之后返回的及要上传的不是完整地址
            videoImg: '',
            thumbnailImage: ''
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
        this.data.editedIndex.push(index);
        this.setData({
            [`actionList[${index}].${name}`]: valueIndex,
            [`actionList[${index}].${name}Name`]: value,
        });
    },
    inputChangeEdit(e) {
        const { index, name } = e.currentTarget.dataset;
        const value = e.detail.value;
        this.data.editedIndex.push(index);
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
            mediaType: ['video'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                const data = res.tempFiles[0];
                const videoPath = data.tempFilePath,
                    videoImgPath = data.thumbTempFilePath;
                _this.setData({
                    [`actionList[${index}].video`]: videoPath,
                    [`actionList[${index}].videoImg`]: videoImgPath
                });
                _this.uploadVideo(videoPath, index, 'videourl');
                _this.uploadVideo(videoImgPath, index, 'thumbnailImage');
            }
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
                    _this.data.editedIndex.push(index);
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
        this.data.editedIndex.push(index);
        this.setData({
            [key + '.video']: '',
            [key + '.videourl']: '',
            [key + '.videoImg']: '',
            [key + '.thumbnailImage']: '',
        })
    },
    showDelDialog(e) {
        this.data.delObj = e.currentTarget.dataset;
        this.setData({
            dialogShow: true
        })
    },
    tapDialogButton(e) {
        if (e.detail.index === 1) {
            this.delOne();
        }
        this.setData({
            dialogShow: false
        })
    },
    //删除一个动作
    delOne(e) {
        const { index, sectiondetailid } = this.data.delObj;
        console.log(index, sectiondetailid)
        const actionList = this.data.actionList;
        if (this.data.type != 'new') {
            //编辑状态的删除就真的提交删除了
            const { coachId, userId } = this.data;
            app.req.api.delUserSectionDetail({
                coachId,
                userId,
                sectionDetailId: sectiondetailid
            }).then(res => {
                if (res.code == 0) {
                    actionList.splice(index, 1);;
                    this.setData({
                        actionList: actionList,
                    })
                }
            })
        } else {
            actionList.splice(index, 1);;
            this.setData({
                actionList: actionList,
            })
        }
    },
    /*****全页面的保存提交 */
    saveList() {
        const { type, showOrder, sectionName, coachId, userId, trainingPlanId, userTrainitemId, usertrainSectionId, warmUp, relax, appointmentId, isExprience } = this.data;
        let actionList = this.data.actionList.filter(i => i.actionName); //动作数组不能为空值 这里用动作名判断
        console.log('保存：actionList', isExprience, actionList, actionList.length)
        if (!actionList.length) {
            wx.showToast({
                title: '至少添加一个动作',
                icon: 'none'
            });
            return false;
        }
        if (type != 'new') {
            //编辑进来 只修改课程名称 热身 放松
            if (type == 'edit') {
                app.req.api.submitUserClassSection({
                    coachId,
                    sectionName,
                    showOrder,
                    trainingPlanId,
                    userId,
                    userTrainitemId,
                    usertrainSectionId,
                    warmUp,
                    relax
                }).then(res => {
                    // if (res.code == 0) {
                    // wx.showToast({
                    //     title: '提交成功',
                    // })
                    // wx.navigateBack({
                    //     delta: 0,
                    // })
                    // }
                })
            }
            //然后遍历动作数组
            const len = actionList.length - 1;
            actionList.forEach((item, i) => {
                if (item.sectionDetailId) {
                    //有id就调修改
                    app.req.api.editUserClassSectionDetail(item).then(res => {
                        if (i == len) {
                            !appointmentId ?
                                wx.navigateBack({
                                    delta: 0,
                                }) : this.setData({
                                    editFlag: false
                                })
                        }
                    })
                } else {
                    // console.log('新增动作：', i, len)
                    //没id就调新增
                    app.req.api.adddUserSectionDetail({
                        ...item,
                        coachId,
                        userId,
                        sectionName,
                        usertrainSectionId,
                        trainingType: 1
                    }).then(res => {
                        if (i == len) {
                            // console.log('新增动作：', !appointmentId)
                            !appointmentId ?
                                wx.navigateBack({
                                    delta: 0,
                                }) : this.setData({
                                    editFlag: false
                                })
                        }
                    })
                }
            })
        } else {
            let userTraionSectionDetails = [];
            actionList.forEach(action => {
                    userTraionSectionDetails.push({
                        ...action,
                        sectionName,
                        trainingType: 1
                    })
                })
                // console.log(88888, isExprience)
            if (!isExprience) {
                app.req.api.addUserTrainClassSection({
                    showOrder,
                    coachId,
                    sectionName: sectionName || `第${showOrder}节训练课`,
                    trainingPlanId,
                    userId,
                    userTrainitemId,
                    userTraionSectionDetails,
                    warmUp: this.data.warmUp,
                    relax: this.data.relax,
                }).then(res => {
                    console.log('新增：', appointmentId)
                    if (res.code == 0) {
                        this.setData({
                            usertrainSectionId: res.data.usertrainSectionId,
                            type: 'edit'
                        });
                        !appointmentId ?
                            wx.navigateBack({
                                delta: 0,
                            }) : this.setData({
                                editFlag: false
                            })
                    }
                })
            } else {
                app.req.api.addUserExperiencleClassSection({
                    showOrder,
                    coachId,
                    sectionName: sectionName || `第${showOrder}节体验课`,
                    trainingPlanId,
                    userId,
                    userTraionSectionDetails,
                    warmUp: this.data.warmUp,
                    relax: this.data.relax,
                }).then(res => {
                    console.log('新增：', appointmentId)
                    if (res.code == 0) {
                        this.setData({
                            usertrainSectionId: res.data.usertrainSectionId,
                            type: 'edit'
                        });
                        !appointmentId ?
                            wx.navigateBack({
                                delta: 0,
                            }) : this.setData({
                                editFlag: false
                            })
                    }
                })
            }
        }
    },
    /*****签课 */
    checkin() {
        const { appointmentId, coachId, userId, usertrainSectionId } = this.data;
        app.req.api.singIn({
            appointmentId,
            coachId,
            userId,
            usertrainSectionId
        }).then(res => {
            if (res.code == 0) {
                wx.showToast({
                    title: '签到成功',
                })
                let pages = getCurrentPages();
                let delta = 0;
                for (let i = pages.length - 1; i >= 0; i--) {
                    if (pages[i].route === 'pages/schedule/schedule') {
                        break;
                    }
                    delta += 1;
                }
                setTimeout(() => {
                    wx.navigateBack({
                        delta
                    })
                }, 1000);
            } else {
                wx.showToast({
                    title: '签到失败',
                    icon: 'error'
                })
            }
        })
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {
        this.videoContext = wx.createVideoContext('viewVideo');

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {

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