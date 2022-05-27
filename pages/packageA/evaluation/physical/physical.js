// pages/packageA/evaluation/physical/physical.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    showReport: false,
    newFlag: false,
    list: [{
      name: '心脏功能',
      method: '运动前心率',
      performance: ''
    }, {
      name: '心肺功能',
      method: '2分钟踏板（心率）',
      performance: ''
    }, {
      name: '核心力量',
      method: 'plank（平板支撑）',
      performance: ''
    }, {
      name: '上肢力量',
      method: '俯卧撑',
      performance: ''
    }, {
      name: '下肢力量',
      method: '深蹲',
      performance: ''
    }, {
      name: '柔韧性',
      method: '坐姿体前屈',
      options: ['手到脚踝', '手到脚尖', '手指过脚尖', '掌根到脚尖'],
      performance: ''
    }],
    feedbackList: [],
    pageBackgroundColor:'#FFFFFF'

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { userId, createTime, coachId,color } = options;
    this.setData({
      userId,
      pageBackgroundColor:color
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
      assessmentType: 2
    }).then(res => {
      let data = res.data;
      const feedbackList = [];
      data.forEach((i, j) => {
        if (i.feedbacks.length) {
          const feedback = i.feedbacks[0];
          i.method = feedback.feedbackItem;
          i.performance = feedback.itemValue;
          i.unit = feedback.itemUnit.includes(',') ? '' : feedback.itemUnit;
        }
      });
      this.setData({
        feedbackList: data
      })
      console.log(88888, this.data.feedbackList);
    })
  },
  getAssessment() {
    let coachId = wx.getStorageSync('mp-req-user-id');
    let feedbackList = [];
    app.req.api.getAssessmentByType({
      coachId: coachId,
      assessmentType: 2
    }).then(res => {
      res.data.forEach((item, i) => {
        let options;
        const feedbacks = item.feedbacks[0];
        let unit = feedbacks.itemUnit;
        if (unit.includes(',')) {
          options = unit.split(', ');
          unit = '';
        }
        feedbackList.push({
          ...item,
          unit,
          method: feedbacks.feedbackItem,
          options
        })
      });
      console.log('feed:', feedbackList)
      this.setData({
        coachId: coachId,
        feedbackList,
        newFlag: true
      });
    });
  },
  bindInputChange(e) {
    const index = e.currentTarget.dataset.i;
    this.setData({
      [`feedbackList[${index}].performance`]: e.detail.value
    });
  },
  bindSelChange(e) {
    const index = e.currentTarget.dataset.i;
    const value = e.detail.value;
    const performance = this.data.feedbackList[index].options[value];
    this.setData({
      [`feedbackList[${index}].performance`]: performance
    });
  },
  generateReport() {
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

  },
  /***提交 */
  finish() {
    console.log(888888, 'feedbackList', this.data.feedbackList);
    let feedbackList = this.data.feedbackList;
    let userAssessmentFeedbacks = [];
    feedbackList.forEach((item, i) => {
      item.feedbacks.forEach((itemFeed, j) => {
        if (item.performance) {
          userAssessmentFeedbacks.push({
            assessmentFeedbackId: itemFeed.assessmentFeedbackId,
            assessmentFeedbackValue: item.performance,
            assessmentId: itemFeed.assessmentId,
            coachId: this.data.coachId,
            createTime: new Date().getTime(),
            userId: this.data.userId
          })
        }
      });
    })
    console.log(8888888, userAssessmentFeedbacks)
    app.req.api.addUserAssessment({
      flagRemarks: [],
      userAssessmentFeedbacks,
      userAssessmentResources: []
    }).then(res => {
      console.log('提交返回：', res)
      wx.showToast({
        title: '提交成功',
        duration: 2000
      });
      // this.setData({
      //   pageBackgroundColor:'#ffffff'
      // })
      // wx.setNavigationBarTitle({
      //   title: '健康体适能',
      // })  
      // wx.setNavigationBarColor({
      //   backgroundColor: "#ffffff",
      //   frontColor: "#000000",
      // })
      wx.navigateBack({
        delta: 0,
      })
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})