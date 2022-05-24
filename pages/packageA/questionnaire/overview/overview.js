// questionnaire overview.js
const app = getApp()
Page({
    data: {
        typeList: ['健身问卷', '健康问卷'],
        type: 0,
        userId: '',
        questionList: [],
    },
    onLoad(options) {
        console.log(888, options.userId)
        this.setData({
            // questionnaire: this.data.questionLib[this.data.type],
            userId: options.userId
        });
        // this.getList();
    },
    getList() {
        let coachId = wx.getStorageSync('mp-req-user-id');
        app.req.api.getUserQuestionList({
            coachId: coachId,
            userId: this.data.userId,
            type: 0
        }).then(res => {
            // console.log(888888, res)
            this.setData({
                [`questionList[${0}]`]: res.data
            });
        });
        app.req.api.getUserQuestionList({
            coachId: coachId,
            userId: this.data.userId,
            type: 1
        }).then(res => {
            this.setData({
                [`questionList[${1}]`]: res.data
            });
        });
    },
    //跳转问卷填写页面
    gotoFitness(e) {
        console.log('overview: ', this.data.userId)
        wx.navigateTo({
            url: '../healthy/healthy?userId=' + this.data.userId
        })
    },
    //查看详情
    gotoDetail(e) {
        const { recordtime, questiontype } = e.currentTarget.dataset;
        console.log('overview: ', recordtime, questiontype, e.currentTarget.dataset)
        wx.navigateTo({
            url: '../healthy/healthy?userId=' + this.data.userId + '&recordTime=' + recordtime + '&questionType=' + questiontype
        })
    },
    tabChange(e) {
        const type = e.currentTarget.dataset.type;
        this.setData({
            type: type
        })
    },
    onShow() {
        this.getList();
    }
})