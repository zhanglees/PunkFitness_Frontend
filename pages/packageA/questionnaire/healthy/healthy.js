// questionnaire overview.js
const app = getApp()
Page({
    data: {
        questionList: [],
        questionList2: [],
        currentPage: 0,
        userId: ''
    },
    onLoad(options){
        // console.log(888, options.id)
        app.req.api.getQuestionnaireAll({
            coachId: 'string'
        }).then(res=>{
            const list = res.data;
            console.log('问卷:', list)
            this.setData({
                questionList: list,
                userId: options.id
            })
        })
    },
    tapAddOption(e){
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`questionList[${index}].addFlag`]: true
        })
    },
    addOption(e){
        const index = e.currentTarget.dataset.index;
        const question = this.data.questionList[index];
        let options = question.option;
        const value = e.detail.value;
        const answer = question.answer || [];
        if(value != ''){
            options.push(value);
            answer.push(value);
            this.setData({
                [`questionList[${index}].option`]: options,
                [`questionList[${index}].answer`]: answer,
                [`questionList[${index}].addInput`]: '',
                [`questionList[${index}].addFlag`]: false
            })
        }else{
            this.setData({
                [`questionList[${index}].addFlag`]: false
            })
        }
    },
    setChoice(e){
        const value = e.detail.value;
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`questionList[${index}].answer`]: value
        })
    },
    setRemark(e){
        const value = e.detail.value;
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`questionList[${index}].remark`]: value
        })
    },
    submitFirstStep(e){
        console.log("问卷一提交：", this.data.questionList)
        //发请求保存数据，然后切换到另一个问卷
        this.setData({
            currentPage: 1
        });
    },
    submitSecondStep(e){
        console.log("问卷二提交：", this.data.questionList2)
        //发请求保存数据
        wx.redirectTo({
          url: '../../memberinfo/memberinfo',
        })
    }
})