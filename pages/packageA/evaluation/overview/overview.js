// evaluation overview.js
const app = getApp()
Page({
  data: {
    userId: '',
    type: '0',
    tabList: [{
      name: '静态评估',
      id: '0'
    }, {
      name: '健康体适能',
      id: '2'
    }, {
      name: '动态评估',
      id: '1'
    }],
    evaluation: []//评估结果预览
  },
  onLoad(options){
    const userId = options.userId;
    this.setData({
      userId
    });
  },
  getEvaluationData(){
    const type = this.data.type;
    console.log(type, 9999999)
    app.req.api.getTrainerAssessmentByRecord({
      assessmentType: type,
      userId: this.data.userId
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
    this.getEvaluationData();
  },
  //跳转新建评估页面
  gotoEvaluation(e) {
    const url = ['static', 'dynamic', 'physical'][this.data.type];
      wx.navigateTo({
          url: `/pages/packageA/evaluation/${url}/${url}?userId=${this.data.userId}`
      })

  },
  //点击查看详情
  gotoDetail(e){
    const {createtime, coachid} = e.currentTarget.dataset;
    const url = ['static', 'dynamic', 'physical'][this.data.type];
      wx.navigateTo({
          url: `/pages/packageA/evaluation/${url}/${url}?userId=${this.data.userId}&createTime=${createtime}&coachId=${coachid}&color=${'#363D56'}`
      })
      wx:if(url=='physical'){
        wx.setNavigationBarTitle({
          title: '',
        })
    
        wx.setNavigationBarColor({
          backgroundColor: "#363D56",
          frontColor: "#ffffff",
        })
        this.setData({
          showReport: true,
          pageBackgroundColor:'#363D56'
        })
      }
  },
  onShow(){
    //请求数据
    this.getEvaluationData();
  }
})