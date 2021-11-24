// pages/packageA/training/class/class.js
Page({

    /**
     * Page initial data
     */
    data: {
        name: '',
        coach: '',
        classes: [],
        count: '',
        slideButtons: [[{
            text: '复制',
            extClass: 'test',
            src: '' // icon的路径
        }, {
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }], [{
            text: '粘贴',
            src: '' // icon的路径
        }, {
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }]],
        dialogShow: false,
        dialogIndex: '',//当前要删除的index
        dialogButtons: [{ text: '取消' }, { text: '确定' }],
        copyItem: null
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const id = options.id;
        this.setData({
            id: id
        })
    },

    slideButtonTap(e) {
        const {type, index} = e.currentTarget.dataset;
        if(e.detail.index === 1){
            //删除
            this.setData({
                dialogShow: true,
                dialogIndex: index
            })
        }else{
            //复制 or 粘贴
            if(type === 0){
                //复制
                const item = this.data.classes[index];
                this.setData({
                    copyItem: item
                })
                wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 1000
                })
                  
            }else if(this.data.copyItem){
                //粘贴
                let cItem = this.data.copyItem;
                cItem = {...cItem, status: 1, time: ''};
                console.log('slide button tap', cItem)
                this.setData({
                    [`classes[${index}]`]: cItem
                })
            }else{  
                wx.showModal({
                    showCancel: false,
                    content: '请先复制课程',
                });
            }
        }
        console.log('slide button tap', this.data.classes[index])
    },

    tapDialogButton(e) {
        if(e.detail.index === 1){
            //删除
            let classes = this.data.classes;
            const index = this.data.dialogIndex;
            classes.splice(index, 1);
            classes.push({});
            this.setData({
                classes: classes,
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
        const id = this.data.id;
        const stage = wx.getStorageSync('stageList')[id];
        const classes = wx.getStorageSync('classee');
        const count = stage.classes;
        console.log('getStorageSync', classes)
        let classList = new Array(count).fill({});
        classList.map((i, k) => {
            if(classes[k]){
                classList[k] = classes[k];
                classList[k].status = 1;  //已编辑 未完成
            }
        });
        this.setData({
            name: stage.name,
            coach: '王建祥',
            count: count,
            classes: classList
        })
        // this.setData({
        //     [`classes[${0}]`]: {name:'第一节课', status: 1},
        //     [`classes[${1}]`]: {name:'第2节课', status: 2, time: '2021/11/11'}
        // });

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