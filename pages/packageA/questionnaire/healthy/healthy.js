// questionnaire overview.js
const app = getApp()
Page({
    data: {
        typeList: ['健身问卷', '健康问卷'],
        questionList: [[], []],
        currentPage: 0,
        coachId: '',
        swiperHeight: 160, //动态计算swiper高度
        userId: '',
        answers: [[], []]//记录选择选项
    },
    onLoad(options){
        // console.log(888, options.id)
        let coachId = wx.getStorageSync('mp-req-user-id');
        const {userId, recordTime, questionType} = options;
        this.setData({
            coachId: coachId,
            userId: userId
        });
        if(recordTime && questionType){
            //查看详情，去取详情
            this.setData({
                currentPage: questionType,
                recordTime, 
                questionType
            });
            this.getQuestionDetail(questionType);
        }else{
            this.getQuestion(0);
        }
    },
    /***获取问卷内容*/
    getQuestion(type){
        app.req.api.getQuestionByType({
            coachId: this.data.coachId,
            type: type
        }).then(res=>{
            const list = res.data;
            console.log('问卷:', list)
            this.setData({
                [`questionList[${type}]`]: list
            })
            this.comSwiperHeight();
        })
    },
    /***查看问卷详情时拿着数据请求问卷详情****/
    getQuestionDetail(type){
        const {userId, coachId, recordTime} = this.data;
        app.req.api.getUserTemplateQuestionDetail({
            userId,
            coachId,
            recordTime,
            questionType: type
        }).then(res=>{
            // let answers = [];
            // answers = res.data.map(i=>{
            //     return i.questionItemId
            // })
            console.log('问卷详情：', res)
            this.setData({
                [`questionList[${type}]`]: res.data ? res.data.questions : []
            })
            this.comSwiperHeight();
        });
    },
    comSwiperHeight(){
      var query = wx.createSelectorQuery();
      const _this = this;
      query.select(`#swiperItem${this.data.currentPage}`).boundingClientRect(function (rect) {
        if(rect){
          _this.setData({
            swiperHeight: rect.height
          })
        }
      }).exec();
    },
    swiperChange(e){
      this.goTop();
      const curr = e.detail.current;
      this.setData({
          currentPage: curr
      })
      if(!this.data.questionList[curr].length){
        this.getQuestion(curr);
      }else{
        this.comSwiperHeight();
      }
    }, 
    goTop(e) {  // 左右滑动后回到顶部
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
          })
        } 
    },
    // tapAddOption(e){
    //     const index = e.currentTarget.dataset.index;
    //     this.setData({
    //         [`questionList[${index}].addFlag`]: true
    //     })
    // },
    // addOption(e){
    //     const index = e.currentTarget.dataset.index;
    //     const question = this.data.questionList[index];
    //     let options = question.option;
    //     const value = e.detail.value;
    //     const answer = question.answer || [];
    //     if(value != ''){
    //         options.push(value);
    //         answer.push(value);
    //         this.setData({
    //             [`questionList[${index}].option`]: options,
    //             [`questionList[${index}].answer`]: answer,
    //             [`questionList[${index}].addInput`]: '',
    //             [`questionList[${index}].addFlag`]: false
    //         })
    //     }else{
    //         this.setData({
    //             [`questionList[${index}].addFlag`]: false
    //         })
    //     }
    // },
    setChoice(e){
        const value = e.detail.value;
        const current = this.data.currentPage;
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`questionList[${current}][${index}].answer`]: value
        })
        console.log(888, this.data.questionList[current][index].answer)
    },
    // userSel(e){
    //     const {index, value} = e.currentTarget.dataset;
    //     const current = this.data.currentPage;
    //     let answers = this.data.answers[current];
    //     const i = answers.indexOf(value);
    //     if(i != -1){
    //         answers.splice(i, 1);
    //     }else{
    //         answers.push(value);
    //     }
    //     this.setData({
    //         [`answers[${current}]`]: answers
    //     });
    //     console.log(888888888888,'answers:', this.data.answers);
    // },
    setRemark(e){
        const value = e.detail.value;
        const current = this.data.currentPage;
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`questionList[${current}][${index}].itemExplain`]: value
        })
    },
    nextStep(e){
        const step = e.currentTarget.dataset.value;
        if(step == 0){
            //下一步 切换到另一个问卷
            this.setData({
                currentPage: 1
            });
        }else{
            //提交问卷
            this.submitForm()
        }
    },
    /****问卷提交 */
    submitForm(){
        //发请求保存数据 
        // let answers = this.data.answers;
        const {userId, coachId} = this.data;
        let questionList = this.data.questionList[0].concat(this.data.questionList[1]);
        let list = questionList.map(i=>{
            i.items = (i.answer && i.answer.length) ? ((i.questionType == 1) ? ([{questionItemId: i.answer}]) : i.answer.map(a=>{
                return {questionItemId: a};
            })) : [];
            return i;
        });
        console.log("问卷提交：", list)
        let data = {
            coachId,
            userId,
            createTime: new Date().getTime(),
            questions: questionList
        };
        // answers.forEach((item, k) => {
        //     item.forEach(i => {
        //         data.push({
        //             questionItemId: i,
        //             questionType: k,
        //             userId: userId,
        //             coachId: coachId
        //         })
        //     });
        // });
        // console.log('问卷提交：', data);
        app.req.api.saveUserTemplateQuestion(data).then(res=>{
            console.log('提交返回：', res);
            if(res.code == 0){
                wx.showToast({
                    title: '提交成功',
                    duration: 2000
                });
                wx.navigateBack({
                  delta: 0,
                })
            }
        })
    }
})