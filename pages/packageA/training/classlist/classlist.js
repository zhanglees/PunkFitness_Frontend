// pages/packageA/training/classlist/classlist.js
Page({

    /**
     * Page initial data
     */
    data: {
        type: 'plan',  //默认是训练计划进来
        list: [],
        slideButtons: [{
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }],
        dialogShow: false,
        dialogIndex: '',//当前要删除的index
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const type = options.type;   //用来区分是训练规划还是训练记录,记录则每条跳转到该阶段对应的课程，规划则每条跳转到该阶段的详情
        //取数据
        const stageList = wx.getStorageSync('stageList');
        stageList.length && stageList.map(i=>{
            i.coach= "王建祥";
            i.time= "2021/10/11";
        })
        this.setData({
            list: stageList,
            type: type
        });
    },
    /****添加训练计划 */
    addBtn(e){
        wx.navigateTo({
          url: '/pages/packageA/training/plan/plan',
        })
    },
    /***查看该阶段课程列表 */
    goClass(e){
        const {index} = e.currentTarget.dataset;
        wx.navigateTo({
          url: '/pages/packageA/training/class/class?id=' + index //这边应该传一个id过去
        })
    },
    slideButtonTap(e) {
        const {index} = e.currentTarget.dataset;
        //删除
        this.setData({
            dialogShow: true,
            dialogIndex: index
        })
    },

    tapDialogButton(e) {
        if(e.detail.index === 1){
            //删除
            let list = this.data.list;
            const index = this.data.dialogIndex;
            list.splice(index, 1);
            this.setData({
                list: list,
                dialogIndex: ''
            })
        }
        this.setData({
            dialogShow: false
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