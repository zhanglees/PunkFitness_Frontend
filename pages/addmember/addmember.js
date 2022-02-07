// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        userName: '',
        genders: ["男", "女"],
        sex: 0,
        birthday: '',
        tagsItems: ['增肌', '减脂', '康复'],
        tagsItems1: [{
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
            name: 'userName',
            rules: { required: true, message: '请输入姓名' },
        }, {
            name: 'phone',
            rules: [{ required: true, message: '请输入手机号' }, { mobile: true, message: '请输入正确的手机号' }],
        }],
        formData: {
            userName: '',
            phone: '',
            sex: 0,
            remarks: '',
            birthday: '',
            customerTag: ''
        },
        imgUrl: '', //后端返回的绑定二维码
        qrShow: false,
        waitTimes: 0, //超时变量
        timeList: [], //定时器列表
    },
    // 事件处理函数

    formInputChange(e) {
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },
    bindGendersChange(e) {
        this.setData({
            [`formData.sex`]: e.detail.value
        })
    },
    bindBirthdayChange(e) {
        this.setData({
            [`formData.birthday`]: e.detail.value
        })
    },
    tagsChange(e) {
        const value = e.detail.value;
        this.setData({
            [`formData.customerTag`]: value.join(',')
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
                    if (wx.pageScrollTo) {
                        wx.pageScrollTo({
                            scrollTop: 0
                        })
                    }
                }
            } else {
                //提交表单，拿返回的二维码弹窗显示，轮询客户扫码结果，客户扫码后跳转会员详情页
                console.log('传参：', this.data.formData)
                    // wx.showToast({
                    //     title: '保存成功'
                    // });  
                let data = this.data.formData;
                let userId = wx.getStorageSync('mp-req-user-id');
                // data.age = new Date().getFullYear() - data.birthday.split('-')[0];
                app.req.api.userRegister({
                        teacherId: userId,
                        ...data
                    })
                    .then((res) => {
                        console.log('返回：', res);
                        if (res.code == 0) {
                            const id = res.data.id;
                            _this.setData({
                                    imgUrl: '/images/member/qr.png',
                                    qrShow: true,
                                    userid: id
                                })
                                // _this.startWaiting();
                        } else {
                            this.setData({
                                error: res.message
                            })
                            if (wx.pageScrollTo) {
                                wx.pageScrollTo({
                                    scrollTop: 0
                                })
                            }
                        }
                    })
                    .catch(app.req.err.show);
                // wx.setStorage({
                //   key: "memberInfo",
                //   data: this.data.formData
                // });
            }
        })
    },
    /***轮询接口判断是否绑定成功 */
    qrStatusUpdate(_this) {
        const id = _this.data.userid;
        var maxWait = 10 //超时次数
        var newWait = _this.data.waitTimes + 1 //执行的次数
        if (newWait >= maxWait) { //超时了
            console.log(new Date(), '轮询超时')
        } else { //未超时
            var time = setTimeout(function() { _this.qrStatusUpdate(_this) }, 2000)
            _this.data.timeList.push(time) // 存储定时器
                //这里发送请求判断绑定结果，如果绑定成功则进入拿到数据流程
            console.log(new Date(), '第', newWait, '次轮询中...')
            if (newWait === 1) { //拿到数据，轮询终止
                console.log(new Date(), '拿到了所需数据！轮询停止')
                wx.redirectTo({
                    url: '/pages/packageA/memberinfo/memberinfo' + '?id=' + id,
                })
                _this.stopWaiting()
            } else { //继续轮询
                _this.setData({
                    waitTimes: newWait
                })
            }
        }
    },
    startWaiting() {
        const _this = this;
        setTimeout(function() { _this.qrStatusUpdate(_this) }, 2000)
    },
    stopWaiting() {
        for (var i = 0; i < this.data.timeList.length; i++) {
            clearTimeout(this.data.timeList[i]); //清除了所有定时器
        }
    },
    confirmBind() {
        //展示一个列表选择
        wx.redirectTo({
            url: '/pages/packageA/memberinfo/memberinfo' + '?id=' + this.data.userid,
        })
    },
    cancelBind() {
        wx.redirectTo({
            url: '/pages/packageA/memberinfo/memberinfo' + '?id=' + this.data.userid,
        })
    },
    onHide: function() {
        this.stopWaiting();
    },
    onUnload: function() {
        this.stopWaiting();
    }
})