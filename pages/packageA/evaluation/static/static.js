// evaluation static.js
var util = require('../../../../utils/util.js');
const app = getApp()
Page({
    data: {
        coachId: '',
        userId: '',
        showReport: false,
        newFlag: false, //是否新建
        date: util.formatDate(new Date()),
        tabList: ['侧面', '背面'],
        current: 0,
        expImage: ['/images/evaluation/static-left.png', '/images/evaluation/static-back.png'],
        userImg: [
            [],
            []
        ],
        imgIds: [], //用来提交的图片id
        remark: [],
        authCamera: true,
        startPhoto: false,
        swiperHeight: 160, //动态计算swiper高度
        feedbackList: [
                [],
                []
            ]
            // feedbackList: [[{
            //     name: '全身',
            //     options: ['C型侧弯', 'S型侧弯'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '头部',
            //     options: ['前倾', '后倾'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '颈椎',
            //     options: ['前引', '后引'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '肩胛骨',
            //     options: ['圆肩', '上提'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '胸椎',
            //     options: ['过直', '过曲'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '腰椎',
            //     options: ['过于后曲', '过度伸直'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '骨盆',
            //     options: ['前倾', '后倾'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '髋关节',
            //     options: ['屈曲', '伸展'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '膝关节',
            //     options: ['超伸'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '踝关节',
            //     options: ['足背屈', '足拓屈'],
            //     value: '',
            //     checked: false
            // }], [{
            //     name: '头部',
            //     options: ['左侧倾', '右侧倾', '左旋转', '右旋转'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '肩峰',
            //     options: ['左侧提肩', '左侧塌肩', '右侧提肩', '右侧塌肩'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '肩胛骨',
            //     options: ['肩带前引', '肩带缩回', '左侧肩胛骨外旋', '右侧肩胛骨外旋'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '上肢',
            //     options: ['左侧离体间隙大', '右侧离体间隙大'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '脊柱',
            //     options: ['C型侧弯', 'S型侧弯'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '骨盆',
            //     options: ['骨盆左侧倾', '骨盆右侧倾'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '臀线',
            //     options: ['左高', '右高'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '髋关节',
            //     options: ['髋内旋', '髋外旋', '髋外展', '髋内收'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '踝关节',
            //     options: ['中立位', '外屈', '内屈'],
            //     value: '',
            //     checked: false
            // }, {
            //     name: '足部',
            //     options: ['足外翻', '足外翻', '扁平足'],
            //     value: '',
            //     checked: false
            // }]]
    },
    onLoad(options) {
        const { userId, createTime, coachId } = options;
        if (createTime && coachId) {
            this.setData({
                showReport: true
            });
            this.getDetail(userId, createTime, coachId);
        } else {
            this.getAssessment();
        }
        this.data.userId = userId;
    },
    getAssessment() {
        let coachId = wx.getStorageSync('mp-req-user-id');
        let tabList = [];
        let feedbackList = [];
        app.req.api.getAssessmentByType({
            coachId: coachId,
            assessmentType: 0
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
    getDetail(userId, createTime, coachId) {
        app.req.api.getTrainerAssessmentDetail({
            createTime,
            coachId,
            userId,
            assessmentType: 0
        }).then(res => {
            let data = res.data;
            const userImg = [],
                tabList = [],
                remark = [],
                feedbackList = [];
            data.forEach((i, j) => {
                tabList.push({
                    assessmentId: i.assessmentId,
                    assessmentName: i.assessmentName
                });
                i.coachRemark && (remark[j] = i.coachRemark);
                i.currentUserResource && (userImg[j] = ['https://' + i.currentUserResource.resourceUrl]);
                i.feedbacks.forEach(feedback => {
                    if (feedback.childFeedbacks.length) {
                        feedback.checked = true;
                        feedback.result = 0;
                    }
                });
                feedbackList.push(i.feedbacks);
            });
            this.setData({
                tabList,
                userImg,
                remark,
                feedbackList
            })
        })
    },
    comSwiperHeight() {
        var query = wx.createSelectorQuery();
        const _this = this;
        query.select(`#swiperItem${this.data.current}`).boundingClientRect(function(rect) {
            _this.setData({
                swiperHeight: rect.height
            })
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
    /****添加照片 */
    startPhoto() {
        // if(!this.data.authCamera){
        wx.getSetting({
            success: (res) => {
                if (res.authSetting["scope.camera"]) {
                    this.setData({
                        authCamera: true,
                    })
                } else {
                    this.setData({
                        authCamera: false,
                    });
                    if (res.authSetting["scope.camera"] !== undefined) { this.open_permission_setting(); }
                    // wx.showToast({  
                    //   title:'请打开相机授权',  
                    //   icon: 'none'  
                    // })  
                }
            }
        });
// <<<<<<< HEAD
//         feedbackList.push(i.feedbacks);
//         console.log('--------------',feedbackList);
//       });
//       this.setData({
//         tabList,
//         userImg,
//         remark,
//         feedbackList
//       })
//       console.log('tabList',tabList);
//     })
//   },
//   comSwiperHeight(){
//     var query = wx.createSelectorQuery();
//     const _this = this;
//     query.select(`#swiperItem${this.data.current}`).boundingClientRect(function (rect) {
//         _this.setData({
//             swiperHeight: rect.height
// =======
        // }
        this.setData({
            startPhoto: true
// >>>>>>> af4d5d537f9fd1b7145ec89c9bb11c9557f53dab
        })
    },
    open_permission_setting() {
        wx.showModal({
            title: '申请权限',
            content: '需要使用麦克风和摄像头功能，请前往设置打开权限',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.openSetting({
                        success(res) {
                            console.log('成功', res)
                        },
                        fail(err) {
                            console.log('失败', err)
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    cancelPhone() {
        this.setData({
            startPhoto: false
        })
// <<<<<<< HEAD
//         this.createImg(file);
//         // this.comSwiperHeight();
//         console.log('userImg',userImg);
//       },
//       fail: (res) => {  
//         //拍摄失败  
//         wx.showToast({  
//             title:res,  
//             icon: 'none'  
//         })  
//       },  
//     })
//   },
//   handleCameraError:function() {  
//     wx.showToast({  
//       title:'请打开摄像头',  
//       icon: 'none'  
//     })  
//   }, 
//   openSetting(){
//       // 打开相机授权。。。
//   },
//   /***预览图片 */
//   previewPhoto(e){
//     const src = e.currentTarget.dataset.src;
//     wx.previewImage({ 
//       current: src, // 当前显示图片的http链接 
//       urls: [src] // 需要预览的图片http链接列表 
//      }) 
//   },
//   /**删除某个用户图片 */
//   // delAct(e){
//   //   const {index, i} = e.currentTarget.dataset;
//   //   let imgArr = this.data.userImg[index];
//   //   imgArr.splice(i, 1);
//   //   this.setData({
//   //     [`userImg[${index}]`]: imgArr
//   //   })
//   // },
//   /***选择问题反馈的身体部位 */
//   setChoice(e){
//     const index = e.currentTarget.dataset.index;
//     const curr = this.data.current;
//     this.setData({
//         [`feedbackList[${curr}][${index}].checked`]: !this.data.feedbackList[curr][index].checked
//     })
//     this.comSwiperHeight();
//   },
//   radioChange(e){
//     const {index} = e.currentTarget.dataset;
//     const curr = this.data.current;
//     const value = e.detail.value;
//     this.setData({
//         [`feedbackList[${curr}][${index}].result`]: value
//     })
//   },
//   remarkChange(e){
//       console.log(888,e.detail.value)
//     this.setData({
//         [`remark[${this.data.current}]`]: e.detail.value 
//     })
//   },
//   nextStep(){
//     this.setData({
//         current: 1
//     });
//   },
//   /***生成报告 */
//   generateReport(){
//     //在这里把图片上传一下
//     const _this = this;
//     this.data.userImg.forEach((img, index) => {
//       if(img.length){
//         app.req.api.uploadFile({
//           path: img[0],  //因为需求改为只有一张图片，所以写死0
//           formData: {
//             userId: this.data.userId
//           },
//           success(res){
//             console.log('上传:', index, res)
//             _this.setData({
//               [`imgIds[${index}]`]: res.data
// =======
    },
    /****拍照 */
    takePhoto() {
        const ctx = wx.createCameraContext();
        const _this = this;
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                const curr = this.data.current; //当前是哪个tab
                // let userImg = _this.data.userImg[curr];
                const file = res.tempImagePath;
                // userImg.push(file); 
                this.setData({
                    [`userImg[${curr}]`]: [file],
                    startPhoto: false
                })
                this.createImg(file);
                // this.comSwiperHeight();
            },
            fail: (res) => {
                //拍摄失败  
                wx.showToast({
                    title: res,
                    icon: 'none'
                })
            },
        })
    },
    handleCameraError: function() {
        wx.showToast({
            title: '请打开摄像头',
            icon: 'none'
        })
    },
    openSetting() {
        // 打开相机授权。。。
    },
    /***预览图片 */
    previewPhoto(e) {
        const src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接 
            urls: [src] // 需要预览的图片http链接列表 
        })
    },
    /**删除某个用户图片 */
    // delAct(e){
    //   const {index, i} = e.currentTarget.dataset;
    //   let imgArr = this.data.userImg[index];
    //   imgArr.splice(i, 1);
    //   this.setData({
    //     [`userImg[${index}]`]: imgArr
    //   })
    // },
    /***选择问题反馈的身体部位 */
    setChoice(e) {
        const index = e.currentTarget.dataset.index;
        const curr = this.data.current;
        this.setData({
            [`feedbackList[${curr}][${index}].checked`]: !this.data.feedbackList[curr][index].checked
        })
        this.comSwiperHeight();
    },
    radioChange(e) {
        const { index } = e.currentTarget.dataset;
        const curr = this.data.current;
        const value = e.detail.value;
        this.setData({
            [`feedbackList[${curr}][${index}].result`]: value
        })
    },
    remarkChange(e) {
        console.log(888, e.detail.value)
        this.setData({
            [`remark[${this.data.current}]`]: e.detail.value
        })
    },
    nextStep() {
        this.setData({
            current: 1
        });
    },
    /***生成报告 */
    generateReport() {
        //在这里把图片上传一下
        const _this = this;
        this.data.userImg.forEach((img, index) => {
            if (img.length) {
                app.req.api.uploadFile({
                    path: img[0], //因为需求改为只有一张图片，所以写死0
                    formData: {
                        userId: this.data.userId
                    },
                    success(res) {
                        console.log('上传:', index, res)
                        _this.setData({
                            [`imgIds[${index}]`]: res.data
                        })
                    }
                })
            }
        })
        this.setData({
                showReport: true
            })
            // wx.navigateTo({
            //   url: '/pages/packageA/report/report',
            // })
    },
    /***提交报告并回到评估测试 */
    finish() {
        let remarks = [];
        let feedbackList = this.data.feedbackList;
        const resources = this.data.imgIds;
        let userAssessmentFeedbacks = [];
        let userAssessmentResources = [];
        const coachId = this.data.coachId;
        const userId = this.data.userId;
        feedbackList.forEach((item, i) => {
            const assessmentId = this.data.tabList[i].assessmentId;
            this.data.remark[i] && remarks.push({
                assessmentId,
                remark: this.data.remark[i]
// >>>>>>> af4d5d537f9fd1b7145ec89c9bb11c9557f53dab
            })
            if (resources[i]) {
                userAssessmentResources.push({
                    assessmentId,
                    coachId,
                    resourceId: resources[i],
                    userId
                });
            }
            item.forEach((itemFeed, j) => {
                if (itemFeed.checked && itemFeed.result) {
                    userAssessmentFeedbacks.push({
                        assessmentFeedbackId: itemFeed.childFeedbacks[itemFeed.result].assessmentFeedbackId,
                        assessmentFeedbackValue: "",
                        assessmentId: assessmentId,
                        coachId: coachId,
                        createTime: new Date().getTime(),
                        userId: userId
                    })
                }
            });
        })
        console.log('提交:', {
            flagRemarks: remarks,
            userAssessmentFeedbacks,
            userAssessmentResources,
        })
        app.req.api.addUserAssessment({
            flagRemarks: remarks,
            userAssessmentFeedbacks,
            userAssessmentResources,
        }).then(res => {
            console.log('提交返回：', res)
            wx.showToast({
                title: '提交成功',
                duration: 2000
            });
            wx.navigateBack({
                delta: 0,
            })
        });
        // wx.redirectTo({
        //   url: '/pages/packageA/evaluation/overview/overview',
        // })
    },
    createImg(src) {
        const that = this;
        wx.createSelectorQuery().select('#tmpImg')
            .fields({
                node: true,
                size: true
            }).exec(function(res) {
                const canvas = res[0].node
                const context = canvas.getContext('2d')
                const width = res[0].width
                const height = res[0].height
                    // console.log('createImg:', width, height)
                context.restore();
                const dpr = wx.getSystemInfoSync().pixelRatio
                canvas.width = width * dpr
                canvas.height = height * dpr
                context.scale(dpr, dpr)
                context.clearRect(0, 0, width, height);
                context.fillStyle = 'white'
                context.fillRect(0, 0, width, height)
                context.save();
                let path = that.data.userImg[that.data.current][0];
                const hbPromise = new Promise((resolve, reject) => {
                    const hb = canvas.createImage()
                    hb.onload = () => {
                        resolve(hb)
                    }
                    hb.onerror = () => {
                        reject(new Error(`fail to fetch image form: ${path}`))
                    }
                    hb.src = src
                })
                hbPromise.then(img => {
                    context.drawImage(img, 0, 0, width, height)
                })

                // 画垂线
                const codePromise = new Promise((resolve, reject) => {
                    const code = canvas.createImage()
                    code.onload = () => {
                        resolve(code)
                    }
                    code.onerror = () => {
                        reject(new Error(`fail to fetch image form: ${codepath}`))
                    }
                    code.src = '/images/evaluation/static-cover.png';
                })
                codePromise.then(img => {
                    context.drawImage(img, 0, 0, width, height)
                })
                context.stroke();
                context.save();
                setTimeout(() => {
                    that.toSave(canvas);
                }, 1000);
            })
    },
    toSave(canvas) {
        // console.log('canvas:', canvas)
        const that = this;
        const current = this.data.current;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            fileType: 'jpg',
            canvasId: 'share',
            canvas: canvas,
            width: that.data.widths,
            height: that.data.heights,
            destWidth: that.data.widths * wx.getSystemInfoSync().pixelRatio,
            destHeight: that.data.heights * wx.getSystemInfoSync().pixelRatio,
            success: function(res) {
                that.setData({
                    [`userImg[${current}]`]: [res.tempFilePath]
                })
            },
            fail: function(error) {
                console.log(error)
            }
        })
    }
})