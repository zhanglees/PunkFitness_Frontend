// pages/packageA/training/class/class.js
const app = getApp()
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
            text: '粘贴',
            src: '' // icon的路径
        }, {
            type: 'warn',
            text: '删除',
            extClass: 'test',
            src: ''// icon的路径
        }], [{
            text: '复制',
            extClass: 'test',
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
        const { userId, userTrainitemId, trainingPlanId, classId, classNum, coachName, appointmentId } = options;
        const coachId = wx.getStorageSync('mp-req-user-id');
        this.setData({
            coachId,
            userId, 
            classId,
            userTrainitemId, 
            trainingPlanId,
            classNum: classNum=='null' ? 0 : classNum,
            coachName,
            appointmentId
        })
        // this.getClasses();
    },

    getClasses(){
        const {userId, userTrainitemId, trainingPlanId, classId, coachId, classNum} = this.data;
        app.req.api.getUserClassSection({
            classId,                         
            trainingPlanId,                   
            userId,                              
            userTrainitemId,                     
            coachId
        }).then(res=>{
            const data = res.data;
            let classList = new Array(parseInt(classNum)).fill({status: 0});
            let classes = [];
            data.forEach((i, k) => {
                i.status = i.usertrainSectionId ? (i.completeTime ? 2 : 1) : 0;
                classList[i.showOrder - 1] = i;
            });
            this.setData({
                classes: classList
            })
        })
        // this.setData({
        //     name: '适应期',
        //     coach: '王建祥',
        //     count: count,
        //     classes: classList
        // })
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
            if(type != 0){
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
                const {coachId, userId, trainingPlanId, userTrainitemId, copyItem} = this.data;
                console.log(999999, copyItem);
                // cItem = {...cItem, status: 1, time: ''};
                app.req.api.copyUserClassSection({
                    coachId,
                    sectionName: copyItem.sectionName,                            
                    showOrder: index+1,                                          
                    trainingPlanId,           
                    userId,                
                    userTrainitemId,       
                    usertrainSectionId: copyItem.usertrainSectionId
                }).then(res=>{
                    if(res.code == 0){
                        console.log('slide button tap', res.data)
                        this.setData({
                            [`classes[${index}]`]: {
                                ...res.data,
                                status: 1
                            }
                        })
                    }
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
            const {coachId, userId} = this.data;
            let classes = this.data.classes;
            const index = this.data.dialogIndex;
            app.req.api.deleteUserClassSection({
                coachId, 
                userId, 
                usertrainSectionId: classes[index].usertrainSectionId,
                sectionName: classes[index].sectionName
            }).then(res=>{
                console.log('shanchu:', res.data)
                if(res.code == 0){
                    classes.splice(index, 1);
                    classes.push({});
                    this.setData({
                        classes: classes,
                        dialogIndex: ''
                    })
                }
            })
        }
        this.setData({
            dialogShow: false
        })
    },
    gotoDetail(e){
        const {index} = e.currentTarget.dataset;
        const classItem = this.data.classes[index];
        const {userId, trainingPlanId, userTrainitemId, appointmentId} = this.data;
        const {status} = classItem;
        let url = '/pages/packageA/training/lesson/lesson?';
        // let url = '/pages/packageA/training/edit/edit?';
        if(status){
            //已编辑 查详情
            const { coachId, usertrainSectionId, sectionName } = classItem;
            url += ('type=' + (status == 1 ? 'edit' : 'detail' )+ '&showOrder=' + (index+1) + '&userId=' + userId + '&usertrainSectionId=' + usertrainSectionId+ '&sectionName=' + sectionName+ '&trainingPlanId=' + trainingPlanId + '&userTrainitemId=' + userTrainitemId+ '&status=' + status);
        }else{
            //去新建
            url += ('type=new&showOrder=' + (index+1)+ '&trainingPlanId=' + trainingPlanId + '&userId=' + userId + '&userTrainitemId=' + userTrainitemId + '&appointmentId=' + (appointmentId || ''));
        }
        // console.log(8888, url)
        wx.navigateTo({
          url,
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
        this.getClasses();
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