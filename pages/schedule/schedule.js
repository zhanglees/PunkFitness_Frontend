// pages/schedule/schedule.js
var utils = require('../../utils/util.js')
const app = getApp()
Page({

    /**
     * Page initial data
     */
    data: {
        list: [{
            userName: 'XXXXX',
            time: '上午 10：00',
            status: 1
        }, {
            userName: 'XXXXX',
            time: '下午 10：00',
            status: 1
        }, {
            userName: 'XXXXX',
            time: '上午 10：00',
            status: 0
        }],
        classList: [{    //签课弹窗展示课程列表
            title: '力量训练',
            index: 1
        }, {    
            title: '体能训练',
            index: 2
        }, {    
            title: '体能训练',
            index: 3
        }, {    
            title: '体能训练',
            index: 4
        }],
        dialogShow: false,
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        checkClass: [0], //选中的课
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        //日历初始化的时候就会调用接口请求数据，所以页面load完之后不用再请求一遍
    },
    getList(date){
        console.log('日期： ', date)
    // app.req.api({
    //     date: date
    // }).then(res=>{
    //     //
        // const list = res.data;
        // this.setData({
        //     selDate: date,
        //     list: list
        // })
    // })
    },
    /****签课 */
    checkin(e){
        const index = e.currentTarget.dataset.index;
        //这里要发请求拿回该用户的课程列表
        // app.req.api.xxxx({
        //     id: 'xxxx'
        // }).then(res=>{})
        this.setData({
            dialogShow: true
        })
    },
    /****签到选课 */
    bindClassChange(e){
        const value = e.detail.value;
        console.log(888, value);
        // this.setData({
        //     checkClass: value
        // })
    }, 
    tapDialogButton(e) {
        if(e.detail.index === 1){
            //确定  发请求确定签到   签到成功后更新列表数据
            const classId = this.data.classList[this.data.checkClass[0]].id;
            // app.req.api.
        }
        this.setData({
            dialogShow: false
        })
    },
//日历点击事件
  mydata(e) { 
    let date = e.detail.data
    console.log(date);
    //去拿着日期请求当天的预约列表
    this.getList(date);
  },
    /****去预约界面 */
    goReserve(e){
        wx.navigateTo({
          url: '/pages/reserve/reserve',
        })
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