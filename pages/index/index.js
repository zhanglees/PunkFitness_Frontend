// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    swiperHeight: 160, //动态计算swiper高度
    tabList: ['会员', '准会员', '首次体验'],
    nums: [],
    current: 0,
    fliterList: [{
      name: '周出勤2次',
      num: 26
    }, {
      name: '7天未出勤',
      num: 2
    }, {
      name: '14天未出勤',
      num: 26
    }],
    fliterChecked: '',
    navigatorList:[
      {
        name: '首次体验',
        link: '/pages/packageA/experience/experience',
        icon: ''
      }, {
        name: '准会员',
        link: '../experience/experience',
        icon: ''
      }, {
        name: '会员',
        link: '../experience/experience',
        icon: ''
      // }, {
      //   name: '动作库',
      //   link: '../experience/experience',
      //   icon: ''
      }
    ],
    showSearchInput: [false, false],
    searchText: ['', ''],
    memberList: [],
    userInfo: {}
  },
  onLoad() {
    const data = [[{
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "是用户名呀",
      wxid: "string"
    }, {
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "string",
      wxid: "string"
    }, {
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "string",
      wxid: "string"
    }], [{
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "是用户名呀",
      wxid: "string"
    }, {
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "string",
      wxid: "string"
    }, {
      age: 0,
      appointmentNum: null,
      birthday: "2021-11-24T02:29:19.000+0000",
      coustomLevel: 0,
      customerTag: "string",
      email: "string",
      headImg: "string",
      id: "052ae9c1-626e-4c9b-966d-bbabb3be7107",
      phone: "string",
      remarks: "string",
      sex: 0,
      singInNum: null,
      userName: "string",
      wxid: "string"
    }]];
    this.setData({
      ['memberList[0]']: data[0],
      ['nums[0]']: data[0].length,
      ['memberList[1]']: data[1],
      ['nums[1]']: data[1].length
    });
    this.comSwiperHeight();
    // app.req.api.getTrainerInfoByCoachId({
    //   coachId: 'string',
    //   trainerType: 1
    // }).then(res => {
    //   let data = res.data;
    //   console.log('返回：', res);
    //   this.setData({
    //     ['memberList[0]']: data,
    //     ['nums[0]']: data.length
    //   });
    //   this.comSwiperHeight();
    // });

    // app.req.api.getTrainerInfoByCoachId({
    //   coachId: 'string',
    //   trainerType: 0
    // }).then(res => {
    //   let data = res.data;
    //   console.log('返回：', res);
    //   this.setData({
    //     ['memberList[1]']: data,
    //     ['nums[1]']: data.length
    //   });
    // })
  },

  comSwiperHeight(){
    var query = wx.createSelectorQuery();
    const _this = this;
    query.select(`#swiperItem${this.data.current}`).boundingClientRect(function (rect) {
      if(rect){
        _this.setData({
          swiperHeight: rect.height
        })
      }
    }).exec();
  },
  tabChange(e){
    const curr = e.currentTarget.dataset.id;
    this.setData({
        current: curr
    })
    this.comSwiperHeight();
  },
  // 事件处理函数
  bindAct(e){
    var link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  swiperChange(e){
    const curr = e.detail.current;
    this.setData({
        current: curr
    })
    this.comSwiperHeight();
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
  showInput(e){
    const index = this.data.current;
    this.setData({
      [`showSearchInput[${index}]`]: true,
    })
  },
  clearInput(e){
    const index = this.data.current;
    this.setData({
      [`searchText[${index}]`]: '',
      [`showSearchInput[${index}]`]: false,
    })
  },
  searchInputChange: function (e) {
    const value = e.detail.value;
    // const fliterChecked = this.data.fliterChecked;
    // if((fliterChecked!=='') && (value != this.data.fliterList[fliterChecked].name)){
    //   this.setData({
    //     fliterChecked: ''
    //   })
    // }
    //发送搜索请求
    // app.req.api.search({
    //   key: value
    // }).then(res=>{
      
    // })
      // return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //         resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
      //     }, 200)
      // })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },
  filterTap(e){
    const index = this.data.current;
    const i = e.currentTarget.dataset.index;
    const checked = (i !== this.data.fliterChecked);
    console.log(8888, i, checked, this.data.fliterChecked)
    this.setData({
      fliterChecked: (checked ? i : ''),
      [`searchText[${index}]`]: checked ? this.data.fliterList[i].name : '',
      [`showSearchInput[${index}]`]: checked,
    })
  },
  memberDetail(e){
    const index = e.currentTarget.dataset.index;
    wx.setStorage({
      key: "memberInfo",
      data: this.data.memberList[this.data.current][index]
    })
    wx.navigateTo({
      url: '/pages/packageA/memberinfo/memberinfo?id=' + index,
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


   //跳转到其他页面
   bindCreateActiviy: function (event) {
    wx.navigateTo({
      url: '/pages/home/addActvity/addActvity'
    })
  }
})
