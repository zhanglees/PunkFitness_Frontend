// questionnaire overview.js
const app = getApp()
Page({
  data: {
    typeList: ['健身问卷', '健康问卷'],
    type: 0,
    userId: '',
    questionnaire: [],
    questionLib: [[{
        q: '您之前有没有参加过健身？',
        a: '没有'
    }, {
        q: '您现在有没有任何的健身计划？',
        a: '没有'
    }], [{
        q: '健康问卷的问题一？',
        a: '没有'
    }, {
        q: '您现在有没有任何的健身计划？',
        a: '没有'
    }]]
  },
  onLoad(options) {
    console.log(888, options.id)
    this.setData({
        questionnaire: this.data.questionLib[this.data.type],
        userId: options.id
    });
  },
    //跳转问卷填写页面
    gotoFitness(e) {
        console.log('overview: ', this.data.userId)
        wx.redirectTo({
            url: '../healthy/healthy?id=' + this.data.userId
        })
    },
    tabChange(e){
       const type = e.currentTarget.dataset.type;
        this.setData({
            type: type,
            questionnaire: this.data.questionLib[type]
        })
    }
})