// evaluation overview.js
const app = getApp()
Page({
  data: {
    type: 'static',
    tabList: [{
      name: '静态评估',
      id: 'static'
    }, {
      name: '体适能评估',
      id: 'physical'
    }, {
      name: '动态评估',
      id: 'dynamic'
    }],
    evaluation: []//评估结果预览
  },
  onLoad(){
    //页面加载完请求数据
    this.setData({
      evaluation: [{
        type: '静态评估',
        coach: '王建祥',
        time: '2021-11-11',
        list: []
      }]
    })
  },
  tabChange(e){
    const type = e.currentTarget.dataset.id;
    //请求评估结果数据 或者页面加载时一次拿回来
    this.setData({
        type: type,
        evaluation: []
    })
  },
  //跳转新建评估页面
  gotoEvaluation(e) {
      wx.navigateTo({
          url: `/pages/evaluation/${this.data.type}/${this.data.type}`
      })
  },

})