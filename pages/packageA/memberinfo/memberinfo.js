// memberinfo.js
var util = require('../../../utils/util.js');
// 获取应用实例
const app = getApp()

Page({
    data: {
        id: '',
        coverImage: '',
        avatarUrl: '/images/avatar.png',
        userInfo: {},
        qrShow: false,
        imgUrl: '', //后端返回的绑定二维码
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        serverList: [{
            name: '健康问卷',
            link: '/pages/packageA/questionnaire/overview/overview?'
        }, {
            name: '评估测试',
            link: '/pages/packageA/evaluation/overview/overview?'
        }, {
            name: '体测报告',
            link: '/pages/packageA/inbody/overview/overview?'
        }, {
            name: '体验课教案',
            link: '/pages/packageA/training/experience/experience?'
        }, {
            name: '训练规划',
            link: '/pages/packageA/training/classlist/classlist?type=plan&'
        }, {
            name: '训练记录',
            link: '/pages/packageA/training/classlist/classlist?type=record&'
        }],
        showLogs: false,
        logs: {
            // '#2021': {
            //   '11.02': [{
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }], 
            //   '10.03': [{
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }]
            // },
            // '#2020': {
            //   '11.02': [{
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }, {
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }],
            //   '02.11': [{
            //     date: '11.02',
            //     time: '12:10',
            //     content: '训练计划',
            //     coach:'王祥'
            //   }]
            // }
        }
    },
    // 事件处理函数
    bindAct(e) {
        var link = e.currentTarget.dataset.link;
        wx.navigateTo({
            url: link
        })
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad(options) {
        const userId = options.id; //会员id
        // const memberInfo = wx.getStorageSync("memberInfo");
        this.data.id = userId;
        this.getMemberInfo();
    },
    onShow() {
        this.getUserLog();
    },
    getUserLog() {
        const userId = this.data.id;
        app.req.api.getUserLogById({
            userId
        }).then(res => {
            let data = res.data || [];
            // data = [{
            //   userLogId: "fe8efc0c-ba62-103a-abe9-f8ebb2ba8d93",  
            //   createTime: "2021-12-11 00:00:00",                  
            //   controllerPath: "训练计划",                                
            //   createCoachId: "string",                             
            //   userId: "e930ae3a-e64e-47bd-bfe3-07ac06afcb43",      
            //   userName: "ddf"                                        
            // }];
            let temp = {};
            data.forEach(i => {
                const time = i.createTime ? i.createTime.match(/([0-9]+)-([0-9]+-[0-9]+)\s([0-9]+:[0-9]+)/) : [];
                if (time.length > 3) {
                    const year = time[1],
                        date = time[2].replace('-', '/'),
                        t = time[3];
                    if (temp[year]) {
                        let d = temp[year];
                        if (d[date]) {
                            d[date].push({
                                date,
                                time: t,
                                content: i.controllerPath,
                                coach: i.coachName,
                                avatar: i.caochHeadImg
                            })
                        } else {
                            d[date] = [{
                                date,
                                time: t,
                                content: i.controllerPath,
                                coach: i.coachName,
                                avatar: i.caochHeadImg
                            }];
                        }
                    } else {
                        temp[year] = {
                            [`${date}`]: [{
                                date,
                                time: t,
                                content: i.controllerPath,
                                coach: i.coachName,
                                avatar: i.caochHeadImg
                            }]
                        }
                    }
                }
                this.setData({
                    logs: temp,
                    showLogs: data.length
                })
            })
        })
    },
    getMemberInfo() {
        app.req.api.getUserById({ id: this.data.id }).then(res => {
            console.log('返回：', res.data);
            let userInfo = res.data;
            if (userInfo) {
                if (userInfo.headImg && !userInfo.headImg.includes('https://')) {
                    userInfo.headImg = 'https://' + userInfo.headImg
                }
                if (userInfo.birthday) {
                    const birthday = new Date(userInfo.birthday);
                    userInfo.birthday = util.formatDate(birthday);
                    userInfo.age = new Date().getFullYear() - birthday.getFullYear();
                }
                userInfo.customerTag && (userInfo.customerTag = userInfo.customerTag.split(','));
            } else {
                userInfo = {}
            }
            this.setData({
                userInfo: userInfo,
            });
            // console.log(886668, this.data.userInfoGet);
        })
    },

    /**关联客户 */
    getQr() {
        // 接口获取二维码
        this.setData({
            imgUrl: '/images/member/qr.png',
            qrShow: true
        })
    },
    /***转为正式会员弹窗 */
    changeLevel(e) {
        this.setData({
            dialogShow: true
        })
    },
    /***转为正式会员 */
    tapDialogButton(e) {
        if (e.detail.index === 1) {
            //确认
            const _this = this;
            const id = this.data.id;
            app.req.api.transformMember({ id }).then(res => {
                if (res.data) {
                    _this.getMemberInfo();
                    _this.setData({
                        dialogShow: false
                    })
                } else {
                    wx.showToast({
                        title: '请稍后重试',
                        icon: 'error',
                        duration: 2000
                    });
                    _this.setData({
                        dialogShow: false
                    })
                }
                //请求返回之后的结果 失败提示  成功更新按钮状态
            })
        } else {
            this.setData({
                dialogShow: false
            })
        }
    },
    //跳转到其他页面
    gotoServer: function(e) {
        let link = e.currentTarget.dataset.link;
        wx.navigateTo({
            url: link + 'userId=' + this.data.userInfo.id
        })
    }
})