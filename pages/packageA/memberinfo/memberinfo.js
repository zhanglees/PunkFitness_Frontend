// memberinfo.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    id: '',
    coverImage: '',
    avatarUrl: '/images/member/avatar.png',
    userInfo: {
      userName: "Ada",
      headImg: '',
      phone: "13888888888",
      birthday: "2020-10-22",
      age: '27',
      customerTag: ['增肌', '减脂', '康复'],
      remarks: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。'
    },
    userInfoGet: {},
    qrShow: false,
    imgUrl: '',  //后端返回的绑定二维码
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
      link: '/pages/packageA/training/edit/edit?'
    }, {
      name: '训练规划',
      link: '/pages/packageA/training/classlist/classlist?type=plan&'
    }, {
      name: '训练记录',
      link: '/pages/packageA/training/classlist/classlist?type=record&'
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
    const userId = options.id;  //会员id
    // const memberInfo = wx.getStorageSync("memberInfo");
    this.setData({
      id: userId
    });
    this.getMemberInfo();
  },
  getMemberInfo(){
    app.req.api.getUserById({id: this.data.id}).then(res => {
      console.log('返回：', res.data);
      let userInfo = {...res.data};
      let birthday = userInfo.birthday.match(/([0-9]+)-[0-9]+-[0-9]+/);
      userInfo.birthday = birthday[0];
      userInfo.age = new Date().getFullYear() - birthday[1];
      userInfo.customerTag = userInfo.customerTag.split(',');
      this.setData({
        userInfo: userInfo,
        userInfoGet: res.data
      });
      console.log(886668, this.data.userInfoGet);
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
  /***转为正式会员弹窗 */
  changeLevel(e){
    this.setData({
        dialogShow: true
    })
  },
  /***转为正式会员 */
  tapDialogButton(e) {
      if(e.detail.index === 1){
          //确认
          const _this = this;
          const id = this.data.id;
          app.req.api.transformMember(this.data.userInfoGet).then(res=>{
            if(res.data) {
              _this.getMemberInfo();
              _this.setData({
                dialogShow: false
              })
            }else{
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
      }else{
        this.setData({
            dialogShow: false
        })
      }
  },
   //跳转到其他页面
   gotoServer: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link + 'userId=' + this.data.userInfo.id
    })
  }
})
