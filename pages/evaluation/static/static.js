// evaluation static.js
var util = require('../../../utils/util.js');
const app = getApp()
Page({
  data: {
    showReport: false,
    date: util.formatDate(new Date()),
    tabList: ['侧面', '背面'],
    current: 0,
    expImage: ['/images/evaluation/static-left.png', '/images/evaluation/static-back.png'],
    userImg: [[], []],
    remark: [],
    authCamera: false,
    startPhoto: false,
    swiperHeight: 160, //动态计算swiper高度
    feedbackList: [[{
        name: '全身',
        options: ['C型侧弯', 'S型侧弯'],
        value: '',
        checked: false
    }, {
        name: '头部',
        options: ['前倾', '后倾'],
        value: '',
        checked: false
    }, {
        name: '颈椎',
        options: ['前引', '后引'],
        value: '',
        checked: false
    }, {
        name: '肩胛骨',
        options: ['圆肩', '上提'],
        value: '',
        checked: false
    }, {
        name: '胸椎',
        options: ['过直', '过曲'],
        value: '',
        checked: false
    }, {
        name: '腰椎',
        options: ['过于后曲', '过度伸直'],
        value: '',
        checked: false
    }, {
        name: '骨盆',
        options: ['前倾', '后倾'],
        value: '',
        checked: false
    }, {
        name: '髋关节',
        options: ['屈曲', '伸展'],
        value: '',
        checked: false
    }, {
        name: '膝关节',
        options: ['超伸'],
        value: '',
        checked: false
    }, {
        name: '踝关节',
        options: ['足背屈', '足拓屈'],
        value: '',
        checked: false
    }], [{
        name: '头部',
        options: ['左侧倾', '右侧倾', '左旋转', '右旋转'],
        value: '',
        checked: false
    }, {
        name: '肩峰',
        options: ['左侧提肩', '左侧塌肩', '右侧提肩', '右侧塌肩'],
        value: '',
        checked: false
    }, {
        name: '肩胛骨',
        options: ['肩带前引', '肩带缩回', '左侧肩胛骨外旋', '右侧肩胛骨外旋'],
        value: '',
        checked: false
    }, {
        name: '上肢',
        options: ['左侧离体间隙大', '右侧离体间隙大'],
        value: '',
        checked: false
    }, {
        name: '脊柱',
        options: ['C型侧弯', 'S型侧弯'],
        value: '',
        checked: false
    }, {
        name: '骨盆',
        options: ['骨盆左侧倾', '骨盆右侧倾'],
        value: '',
        checked: false
    }, {
        name: '臀线',
        options: ['左高', '右高'],
        value: '',
        checked: false
    }, {
        name: '髋关节',
        options: ['髋内旋', '髋外旋', '髋外展', '髋内收'],
        value: '',
        checked: false
    }, {
        name: '踝关节',
        options: ['中立位', '外屈', '内屈'],
        value: '',
        checked: false
    }, {
        name: '足部',
        options: ['足外翻', '足外翻', '扁平足'],
        value: '',
        checked: false
    }]]
  },
  onLoad(){
    this.comSwiperHeight();
  },
  comSwiperHeight(){
    var query = wx.createSelectorQuery();
    const _this = this;
    query.select(`#swiperItem${this.data.current}`).boundingClientRect(function (rect) {
        _this.setData({
            swiperHeight: rect.height
        })
    }).exec();
  },
  tabChange(e){
    const curr = e.currentTarget.dataset.id;
    this.setData({
        current: curr
    })
    this.comSwiperHeight();
  },
  swiperChange(e){
    const curr = e.detail.current;
    this.setData({
        current: curr
    })
    this.comSwiperHeight();
  },
  /****添加照片 */
  startPhoto(){
      if(!this.data.authCamera){
        wx.getSetting({  
          success: (res) => {  
              if (res.authSetting["scope.camera"]){  
                  this.setData({  
                    authCamera:true,  
                  })  
              } else {  
                this.setData({  
                  authCamera:false,  
                });
                wx.showToast({  
                  title:'请打开相机授权',  
                  icon: 'none'  
                })  
              }  
          }  
        }); 
      }
      this.setData({
        startPhoto: true
      })
  },
  cancelPhone(){
    this.setData({
      startPhoto: false
    })
  },
  /****拍照 */
  takePhoto() {
    const ctx = wx.createCameraContext();
    const _this = this;
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const curr = this.data.current;//当前是哪个tab
        let userImg = _this.data.userImg[curr];
        const file = res.tempImagePath;
        userImg.push(file); 
        //上传图片到服务器  
        // wx.uploadFile({  
        //     url: 'XXXX', //上传服务器地址  
        //     filePath: file,  
        //     name: 'file',  
        //     formData: {  
        //       'test': 'test'  
        //     },  
        //     success: (res) => {  
        //       //上传成功  
        //     },  
        //     fail: function(t) {  
        //       //上传失败  
        //     }
        // });
        this.setData({
          [`userImg[${curr}]`]: userImg,
          startPhoto: false
        })
        this.comSwiperHeight();
      },
      fail: (res) => {  
        //拍摄失败  
        wx.showToast({  
            title:res,  
            icon: 'none'  
        })  
      },  
    })
  },
  handleCameraError:function() {  
    wx.showToast({  
      title:'请打开摄像头',  
      icon: 'none'  
    })  
  }, 
  openSetting(){
      // 打开相机授权。。。
  },
  /***选择问题反馈的身体部位 */
  setChoice(e){
    const index = e.currentTarget.dataset.index;
    const curr = this.data.current;
    this.setData({
        [`feedbackList[${curr}][${index}].checked`]: !this.data.feedbackList[curr][index].checked
    })
    this.comSwiperHeight();
  },
  radioChange(e){
    const index = e.currentTarget.dataset.index;
    const curr = this.data.current;
    const value = e.detail.value;
    this.setData({
        [`feedbackList[${curr}][${index}].result`]: value
    })
  },
  remarkChange(e){
      console.log(888,e.detail.value)
    this.setData({
        [`remark[${this.data.current}]`]: e.detail.value 
    })
  },
  /***提交侧面信息 */
  submitFirstStep(){
    //图片列表and问题反馈
    let data = {
        img: this.data.userImg[0],
        feedback: this.data.feedbackList[0],
        remark: this.data.remark[0]
    };
    this.setData({
        current: 1
    });
    console.log(88888, data)
  },
  /***生成报告 */
  finishStep(){
      //提交背面信息  跳转报告页面
    let data = {
        img: this.data.userImg[1],
        feedback: this.data.feedbackList[1],
        remark: this.data.remark[1]
    };
    this.setData({
        showReport: true
    })
    // wx.navigateTo({
    //   url: '/pages/packageA/report/report',
    // })
  },
  /***回到评估测试 */
  finish(){
    wx.navigateTo({
      url: '/pages/packageA/evaluation/overview/overview',
    })
  }
})