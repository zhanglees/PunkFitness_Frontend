// evaluation overview.js
const app = getApp()
Page({
  data: {
    type: '0',
    tabList: [{
      name: '静态评估',
      id: '0'
    }, {
      name: '体适能评估',
      id: '2'
    }, {
      name: '动态评估',
      id: '1'
    }],
    evaluation: []//评估结果预览
  },
  onLoad(){
    //页面加载完请求数据
    this.getEvaluationData(0);
  },
  getEvaluationData(){
    const type = this.data.type;
    app.req.api.getTrainersAssessment({
      assessmentType: type
    }).then(res=>{
      this.setData({
        evaluation: res.data
      })

    });
  },
  tabChange(e){
    const type = e.currentTarget.dataset.id;
    //请求评估结果数据 或者页面加载时一次拿回来
    this.setData({
        type: type
    });
    this.getEvaluationData(type);
  },
  //跳转新建评估页面
  gotoEvaluation(e) {
    const url = ['static', 'dynamic', 'physical'][this.data.type];
      wx.navigateTo({
          url: `/pages/packageA/evaluation/${url}/${url}`
      })
  },

})