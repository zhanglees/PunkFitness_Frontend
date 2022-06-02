// pages/evaluation/dynamic/dynamic.js
const app = getApp()
Page({
    data: {
        showReport: false,
        newFlag: false,
        tabList: ['过顶蹲起', '单腿下蹲', '站姿推', '站姿拉'],
        current: 0,
        expImage: ['/images/evaluation/dynamic1.png', '/images/evaluation/dynamic2.png', '/images/evaluation/dynamic3.png', '/images/evaluation/dynamic4.png'],
        userVideo: [
            [],
            [],
            [],
            []
        ],
        videoIds: [], //用来提交的图片id
        remark: [],
        swiperHeight: 160, //动态计算swiper高度
        // feedbackList: [[{
        //   name: '躯干过分前倾',
        //   checked: false
        // }, {
        //   name: '下背反弓',
        //   checked: false
        // }, {
        //   name: '内扣',
        //   checked: false
        // }, {
        //   name: '外旋', 
        //   checked: false
        // }, {
        //   name: '手臂下落',
        //   checked: false
        // }], [{
        //   name: '内扣',
        //   checked: false
        // }], [{
        //   name: '下背反弓', 
        //   checked: false
        // }, {
        //   name: '肩部上提', 
        //   checked: false
        // }, {
        //   name: '头部前引', 
        //   checked: false
        // }], [{
        //   name: '下背反弓', 
        //   checked: false
        // }, {
        //   name: '肩部上提', 
        //   checked: false
        // }, {
        //     name: '头部前引',
        //     checked: false
        // }]],
        feedbackList: [],
        remark: [],
        datas: [
            [],
            [],
            [],
            []
        ],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        const { userId, createTime, coachId } = options;
        this.setData({
            userId
        });
        if (createTime && coachId) {
            this.setData({
                showReport: true
            });
            this.getDetail(userId, createTime, coachId);
        } else {
            this.getAssessment();
        }
    },

    getDetail(userId, createTime, coachId) {
        app.req.api.getTrainerAssessmentDetail({
            createTime,
            coachId,
            userId,
            assessmentType: 1
        }).then(res => {
            let data = res.data;
            console.log('详情：', data);
            const userVideo = [],
                tabList = [],
                remark = [],
                feedbackList = [];
            data.forEach((i, j) => {
                tabList.push({
                    assessmentId: i.assessmentId,
                    assessmentName: i.assessmentName
                });
                i.coachRemark && (remark[j] = i.coachRemark);
                i.currentUserResource && (userVideo[j] = [i.currentUserResource.resourceUrl]);
                i.feedbacks.forEach(feedback => {
                    feedback.checked = true;
                });
                feedbackList.push(i.feedbacks);
            });
            this.setData({
                tabList,
                userVideo,
                remark,
                feedbackList
            })
        })
    },
    getAssessment() {
        let coachId = wx.getStorageSync('mp-req-user-id');
        let tabList = [];
        let feedbackList = [];
        app.req.api.getAssessmentByType({
            coachId: coachId,
            assessmentType: 1
        }).then(res => {
            res.data.forEach((item, i) => {
                tabList.push({
                    assessmentId: item.assessmentId,
                    assessmentName: item.assessmentName
                });
                feedbackList.push(item.feedbacks);
            });
            this.setData({
                coachId: coachId,
                tabList,
                feedbackList,
                newFlag: true
            });
            this.comSwiperHeight();
        });
    },
    comSwiperHeight() {
        var query = wx.createSelectorQuery();
        const _this = this;
        query.select(`#swiperItem${this.data.current}`).boundingClientRect(function(rect) {
            if (rect) {
                _this.setData({
                    swiperHeight: rect.height
                })
            }
        }).exec();
    },
    tabChange(e) {
        const curr = e.currentTarget.dataset.id;
        this.setData({
            current: curr
        })
        this.comSwiperHeight();
    },
    swiperChange(e) {
        const curr = e.detail.current;
        this.setData({
            current: curr
        })
        this.comSwiperHeight();
    },
    //开始录制视频
    startVideo() {
        const _this = this;
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                console.log(res.tempFilePath)
                const cur = _this.data.current;
                let videoList = _this.data.userVideo[cur];
                res.tempFilePath && videoList.push(res.tempFilePath);
                _this.setData({
                    [`userVideo[${cur}]`]: videoList
                });
            }
        })
    },
    /**删除某个用户视频 */
    delAct(e) {
        const { index, i } = e.currentTarget.dataset;
        let videoArr = this.data.userVideo[index];
        videoArr.splice(i, 1);
        this.setData({
            [`userVideo[${index}]`]: videoArr
        })
    },
    /***问题反馈 */
    setChoice(e) {
        const cur = this.data.current;
        let feedbackList = this.data.feedbackList[cur];
        const i = e.currentTarget.dataset.i;
        const checked = feedbackList[i].checked;
        this.setData({
            [`feedbackList[${cur}][${i}].checked`]: !checked
        });
    },
    /**教练备注 */
    remarkChange(e) {
        this.setData({
            [`remark[${this.data.current}]`]: e.detail.value
        })
    },
    /***获取当前数据 */
    getData() {
        const cur = this.data.current;
        const tabList = this.data.tabList;
        let data = {
            name: tabList[cur],
            video: this.data.userVideo[cur],
            feedback: this.data.feedbackList[cur],
            remark: this.data.remark[cur]
        };
        this.setData({
            [`datas[${cur}]`]: data
        })
        return data;
    },
    uploadVideo(videos, index) {
        const _this = this;
        videos.forEach((video, i) => {
            if (video.length) {
                app.req.api.uploadFile({
                    path: video,
                    formData: {
                        userId: this.data.userId
                    },
                    success(res) {
                        console.log('上传:', index, res)
                        _this.setData({
                            [`videoIds[${index}][${i}]`]: res.data
                        })
                    }
                })
            }
        })
    },
    /****下一步 */
    nextStep(e) {
        console.log(8888888, cur)
        const cur = this.data.current;
        // const data = this.getData();
        //数据最后生成报告之后一起提交
        this.uploadVideo(this.data.userVideo[cur], cur);
        this.setData({
            current: cur + 1
        });
    },
    /***生成报告 */
    generateReport() {
        //最后一个tab的数据
        // const data = this.getData();
        this.uploadVideo(this.data.userVideo[3], 3);
        this.setData({
            showReport: true
        })
    },
    finish() {
        let remarks = [];
        let feedbackList = this.data.feedbackList;
        let userAssessmentFeedbacks = [];
        let userAssessmentResources = [];
        const coachId = this.data.coachId;
        const resources = this.data.videoIds;
        const userId = this.data.userId;
        const dataRemark = this.data.remark;
        feedbackList.forEach((item, i) => {
            const assessmentId = this.data.tabList[i].assessmentId;
            dataRemark[i] && remarks.push({
                assessmentId,
                remark: dataRemark[i]
            })
            if (resources[i] && resources[i].length) {
                // console.log('resource', resources[i])
                resources[i].forEach(r => {
                    userAssessmentResources.push({
                        assessmentId,
                        coachId,
                        resourceId: r,
                        userId
                    });
                });
            }
            item.forEach((itemFeed, j) => {
                if (itemFeed.checked) {
                    userAssessmentFeedbacks.push({
                        assessmentFeedbackId: itemFeed.assessmentFeedbackId,
                        assessmentFeedbackValue: "",
                        assessmentId: assessmentId,
                        coachId: coachId,
                        createTime: new Date().getTime(),
                        userId,
                    })
                }
            });
        })
        app.req.api.addUserAssessment({
            flagRemarks: remarks,
            userAssessmentFeedbacks,
            userAssessmentResources
        }).then(res => {
            console.log('提交返回：', res)
            if (res.code === 0) {
                wx.showToast({
                    title: '提交成功',
                    duration: 2000
                });
                wx.navigateBack({
                    delta: 0,
                })
            } else {
                wx.showToast({
                    title: '提交失败',
                    duration: 2000
                });
                wx.navigateBack({
                    delta: 0,
                })
            }
        });
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {

    },

})