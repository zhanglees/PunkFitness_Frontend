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
        rules: {required: true, message: '请输入姓名'},
    }, {
        name: 'mobile',
        rules: [{required: true, message: '请输入手机号'}, {mobile: true, message: '请输入正确的手机号'}],
    }],
    formData: {
      name: '',
      mobile: ''
    }
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
        //提交表单，拿返回的用户id访问会员详情页
        console.log(9999, this.data.formData)
        wx.showToast({
            title: '保存成功'
        });
        wx.navigateTo({
          url: '../memberinfo/memberinfo',
        })
      }
    })
  }
})
