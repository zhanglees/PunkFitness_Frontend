// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name: '',
    genders: ["男", "女"],
    gendersIndex: 0,
    birthday: '',
    tagsItems: [{
      name: '增肌',
      value: '01',
      checked: false
    }, {
      name: '减脂',
      value: '02',
      checked: false
    }, {
      name: '康复',
      value: '03',
      checked: false
    }],
    rules: [{
        name: 'name',
        // rules: {required: true, message: '请输入姓名'},
    }, {
        name: 'mobile',
        // rules: [{required: true, message: '请输入手机号'}, {mobile: true, message: '请输入正确的手机号'}],
    }],
    formData: {
      name: '',
      mobile: ''
    },
    imgUrl: '',  //后端返回的绑定二维码
    qrShow: false,
    waitTimes:0,//超时变量
    timeList:[],//定时器列表
  },
  // 事件处理函数

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  bindGendersChange(e){
    this.setData({
      gendersIndex: e.detail.value
    })
  },
  bindBirthdayChange(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  tagsChange(e){
    var tagsItems = this.data.tagsItems, values = e.detail.value;
    for (var i = 0, lenI = tagsItems.length; i < lenI; ++i) {
      tagsItems[i].checked = values.includes(tagsItems[i].value);
    }
    this.setData({
        tagsItems: tagsItems,
        [`formData.tags`]: e.detail.value
    });
  },
  submitForm() {
    const _this = this;
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
            this.setData({
                error: errors[firstError[0]].message
            })
        }
      } else {
        //提交表单，拿返回的二维码弹窗显示，轮询客户扫码结果，客户扫码后跳转会员详情页
        console.log(9999, this.data.formData)
        // wx.showToast({
        //     title: '保存成功'
        // });
        const id = '123445'; //返回的用户id
        this.startWaiting();
        _this.setData({
          imgUrl: '/images/member/qr.png',  
          qrShow: true,
          userid: id
        })
      }
    })
  },
  /***轮询接口判断是否绑定成功 */
  qrStatusUpdate() {
    const id = this.data.userid;
    var maxWait = 10 //超时次数
    var newWait = this.data.waitTimes + 1 //执行的次数
    if (newWait >= maxWait) { //超时了
        console.log(new Date(), '轮询超时')
    } else { //未超时
        var time = setTimeout(this.qrStatusUpdate, 2000)
        this.data.timeList.push(time) // 存储定时器
        //这里发送请求判断绑定结果，如果绑定成功则进入拿到数据流程
        console.log(new Date(), '第', newWait, '次轮询中...')
        if (newWait === 2) { //拿到数据，轮询终止
            console.log(new Date(), '拿到了所需数据！轮询停止')
            wx.redirectTo({
              url: '../memberinfo/memberinfo' + '?userid=' + id,
            })
            this.stopWaiting()
        } else { //继续轮询
            this.setData({
                waitTimes: newWait
            })
        }
    }
  },
  startWaiting() {
      setTimeout(this.qrStatusUpdate, 2000)
  },
  stopWaiting() {
      for (var i = 0; i < this.data.timeList.length; i++) {
          clearTimeout(this.data.timeList[i]); //清除了所有定时器
      }
  },
  onHide: function () {
    this.stopWaiting();
  },
  onUnload: function () {
    this.stopWaiting();
  }
})
