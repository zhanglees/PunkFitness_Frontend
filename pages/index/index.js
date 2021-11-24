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
    app.req.api.getTrainerInfoByCoachId({
      coachId: 'string'
    }).then(res => {
      let data = res.data;
      console.log('返回：', res);
      let memberList = [[], []];
      data.forEach(item => {
        if(item.coustomLevel){
          memberList[0].push(item);
        }else{
          memberList[1].push(item);
        }
      });
      const nums = [memberList[0].length, memberList[1].length];
      this.setData({
        memberList: memberList,
        nums: nums
      });
      this.comSwiperHeight();
    })
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
    // if(curr == 1 && !this.data.memberList[curr].length){
    //   this.setData({
    //     [`memberList[${curr}]`]: [{
    //       name: '准会员^0^',
    //       link: false,
    //       classComp: 1,
    //       classCount: 10,
    //       type: 1,  //准会员
    //       id: 1
    //     }, {
    //       name: '准会员大灰狼',
    //       link: false,
    //       classComp: 0,
    //       classCount: 0,
    //       type: 1,
    //       id: 2
    //     },{
    //       name: '准会员小白兔',
    //       link: true,
    //       classComp: 0,
    //       classCount: 0,
    //       type: 1,
    //       id: 3
    //     }]
    //   })
    // }
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
    const fliterChecked = this.data.fliterChecked;
    if((fliterChecked!=='') && (value != this.data.fliterList[fliterChecked].name)){
      this.setData({
        fliterChecked: ''
      })
    }
    //发送搜索请求
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
