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
            num: null
        }, {
            name: '7天未出勤',
            num: null
        }, {
            name: '14天未出勤',
            num: null
        }],
        fliterChecked: '',
        // navigatorList:[
        //   {
        //     name: '首次体验',
        //     link: '/pages/packageA/experience/experience',
        //     icon: ''
        //   }, {
        //     name: '准会员',
        //     link: '../experience/experience',
        //     icon: ''
        //   }, {
        //     name: '会员',
        //     link: '../experience/experience',
        //     icon: ''
        //   // }, {
        //   //   name: '动作库',
        //   //   link: '../experience/experience',
        //   //   icon: ''
        //   }
        // ],
        showSearchInput: [false, false],
        searchText: ['', ''],
        memberList: [],
        userInfo: {},
        resShow: false
    },
    onLoad() {
        // this.comSwiperHeight();
        this.data.userId = wx.getStorageSync('mp-req-user-id');
        const _this = this;
        wx.getSystemInfo({
            success: function(res) {
                if (res.platform == "ios") {
                    _this.setData({
                        isiOS: true,
                    })
                }
            }
        })
    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo,
            fliterChecked: '',
            showSearchInput: [false, false],
            searchText: ['', ''],
            resShow: false,
            current: this.data.current == 2 ? 0 : this.data.current
        });
        if (userInfo && userInfo.phone) {
            this.getAllData(0);
            this.getAllData(1);
        } else {
            this.setData({
                memberList: [],
                nums: [],
                current: 0,
            })
        }
    },
    getAllData(type) {
        // const data = [{age: null,
        //   appointmentNum: null,
        //   birthday: 1512691200000,
        //   coustomLevel: 1,
        //   customerTag: "康复,减脂,增肌",
        //   email: null,
        //   headImg: null,
        //   id: "75d15de0-f99a-4a37-ad53-0bb5abf2c09b",
        //   phone: "13766767677",
        //   remarks: "",
        //   sessionKey: null,
        //   sex: 0,
        //   singInNum: null,
        //   trainClassNumbers: null,
        //   userName: "小明",
        //   versionKey: null,
        //   wxid: null,}]

        // this.setData({
        //   [`memberList[${type}]`]: data,
        //   [`nums[${type}]`]: data.length
        // });
        // this.comSwiperHeight();
        app.req.api.getTrainerInfoByCoachId({
            coachId: this.data.userId,
            trainerType: 1 - type //0为准会员 1为会员
        }).then(res => {
            let data = res.data;
            console.log('返回：', res);
            this.setData({
                [`memberList[${type}]`]: data,
                [`nums[${type}]`]: data.length
            });
            this.comSwiperHeight();
        })

    },
    comSwiperHeight() {
        var query = wx.createSelectorQuery();
        const _this = this;
        query.select(`#swiperItem${this.data.current}`).boundingClientRect(function(rect) {
            if (rect) {
                _this.setData({
                    swiperHeight: rect.height
                })
            }
        }).exec();
    },
    tabChange(e) {
        if (this.data.userInfo && this.data.userInfo.phone) {
            const curr = e.currentTarget.dataset.id;
            this.setData({
                current: curr
            })
            this.comSwiperHeight();
        } else {
            //未登录跳转登录
            wx.redirectTo({
                url: '/pages/login/login?back=/pages/index/index',
            })
        }
    },
    // 事件处理函数
    bindAct(e) {
        var link = e.currentTarget.dataset.link;
        wx.navigateTo({
            url: link
        })
    },
    swiperChange(e) {
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
    showInput(e) {
        const index = this.data.current;
        this.setData({
            [`showSearchInput[${index}]`]: true,
            fliterChecked: '',
        })
    },
    clearInput(e) {
        const index = this.data.current;
        //这里需要请求一下全量数据  清空查询条件就是查全量数据
        this.setData({
            [`searchText[${index}]`]: '',
            [`showSearchInput[${index}]`]: false,
        })
        this.getAllData(index);
        // app.req.api.getTrainerInfoByCoachId({
        //   coachId: 'string',
        //   trainerType: (index === 0) ? 1 : 0
        // }).then(res => {
        //   let data = res.data;
        //   console.log('返回：', res);
        //   this.setData({
        //     ['memberList[${index}]']: data
        //   });
        //   this.comSwiperHeight();
        // });
    },
    searchInputChange: function(e) {
        const value = e.detail.value;
        const _this = this;
        const current = this.data.current;
        if (value) {
            //发送搜索请求
            app.req.api.searchMember({
                "coachId": this.data.userId,
                "condition": value,
                "trainerType": 1 - current
            }).then(res => {
                const data = res.data;
                _this.setData({
                    [`memberList[${current}]`]: data,
                    // [`nums[${current}]`]: data ? data.length : 0
                })
            })
        } else {
            this.getAllData(current);
        }
    },
    selectResult: function(e) {
        console.log('select result', e.detail)
    },
    filterTap(e) {
        const i = e.currentTarget.dataset.index;
        const checked = (i !== this.data.fliterChecked);
        if (checked) {
            app.req.api.getAppointmentAllByDate({
                coachId: this.data.userId,
                dateType: i,
                customerType: 1
            }).then(res => {
                let data = res.data;
                console.log('返回：', res);
                if (data.trainners) {
                    this.setData({
                        [`memberList[0]`]: data.trainners,
                        [`fliterList[${i}].num`]: data.trainnerNums
                    });
                } else {
                    this.setData({
                        [`memberList[0]`]: [],
                        [`fliterList[${i}].num`]: 0
                    });
                }
            })
        } else {
            //取消选择 展示全量数据
            this.getAllData(0);
        }
        this.setData({
            fliterChecked: (checked ? i : ''),
            // [`searchText[${index}]`]: checked ? this.data.fliterList[i].name : '',
            // [`showSearchInput[${index}]`]: checked,
        })
    },
    memberDetail(e) {
        const index = e.currentTarget.dataset.index;
        // wx.setStorage({
        //   key: "memberInfo",
        //   data: this.data.memberList[this.data.current][index]
        // })
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
    bindCreateActiviy: function(event) {
        wx.navigateTo({
            url: '/pages/home/addActvity/addActvity'
        })
    },
    showAddRes() {
        this.setData({
            resShow: true
        })
    },
    gotoBuy() {
        if (this.data.isiOS) {
            this.setData({
                resShow: false
            })
        } else {
            wx.navigateTo({
                url: '/pages/packageB/mine/buy/buy',
            })

        }
    },
    cancelBuy() {
        this.setData({
            resShow: false
        })
    }
})