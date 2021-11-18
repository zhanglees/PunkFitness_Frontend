// memberinfo.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    coverImage: '',
    userInfo: {
      name: "Ada",
      avatarUrl: '/images/member/avatar.png',
      mobile: "13888888888",
      birthday: "2020-10-22",
      age: '27',
      tags: ['增肌', '减脂', '康复'],
      remark: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。'
    },
    qrShow: false,
    imgUrl: '',  //后端返回的绑定二维码
    serverList: [{
      name: '健康问卷',
      link: '/pages/packageA/questionnaire/overview/overview'
    }, {
      name: '评估测试',
      link: '/pages/packageA/evaluation/overview/overview'
    }, {
      name: '体测报告',
      link: '/pages/packageA/inbody/overview/overview'
    }, {
      name: '体验课教案',
      link: '/pages/packageA/training/list/list'
    }, {
      name: '训练规划',
      link: '/pages/packageA/training/plan/plan'
    }, {
      name: '训练记录',
      link: '/pages/packageA/training/record/record'
    }],
    news: {
      '#2021': {
        '11.02': [{
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }], 
        '10.03': [{
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }]
      },
      '#2020': {
        '11.02': [{
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }, {
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }],
        '02.11': [{
          date: '11.02',
          time: '12:10',
          content: '训练计划',
          coach:'王祥'
        }]
      }
    }
  },
  // 事件处理函数
  bindAct(e){
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
    const userId = options.userid;  //会员id
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**关联客户 */
  getQr(){
    // 接口获取二维码
    this.setData({
      imgUrl: '/images/member/qr.png',  
      qrShow: true
    })
  },
   //跳转到其他页面
   gotoServer: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.link
    })
  }
})
