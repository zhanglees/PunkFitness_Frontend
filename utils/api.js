function install(req, request) {
    req.api = {
        getWXPhone(data) {
            const url = 'https://zhangleixd.com/wechatLogin/loginByPhone';
            return request({ url, method: 'GET', data });
        },
        userRegister(data) {
            const url = `${req.apiUrl}/user/register`;
            return request({ url, method: 'POST', data });
        },
        modifyUserInfoById(data) {
            const url = `${req.apiUrl}/user/modifyUserInfoById`;
            return request({ url, method: 'POST', data });
        },
        getTrainerInfoByCoachId(data) {
            const url = `${req.apiUrl}/user/getTrainerInfoByCoachId`;
            return request({ url, method: 'POST', header: { 'content-type': 'application/x-www-form-urlencoded' }, data });
        },
        getUserById(data) {
            const url = `${req.apiUrl}/user/byid`;
            return request({ url, method: 'GET', data });
        },
        getUserAll(data) {
            const url = `${req.apiUrl}/user/getUserAll`;
            return request({ url, method: 'GET', data });
        },
        decodePhone(data) {
            // const url = `${req.apiUrl}/user/decodePhone`;
            return request({ url: 'url', data });
        },
        transformMember(data) {
            const url = `${req.apiUrl}/user/transformMember`;
            return request({ url, method: 'POST', data });
        },
        //搜索
        searchMember(data) {
            const url = `${req.apiUrl}/user/searchMembers`;
            return request({ url, method: 'POST', data });
        },
        //筛选
        getAppointmentAllByDate(data) {
            const url = `${req.apiUrl}/coachAppointment/getAppointMembersByDates`;
            return request({ url, method: 'GET', data });
        },
        getUserLogById(data) {
            const url = `${req.apiUrl}/userSystemLog/getUserLogById`;
            return request({ url, method: 'GET', data });
        },
        /*****问卷 */

        getQuestionByType(data) {
            const url = `${req.apiUrl}/questionnaire/getQuestionByType`;
            return request({ url, method: 'POST', header: { 'content-type': 'application/x-www-form-urlencoded' }, data });
        },
        saveUserQuestion(data) {
            const url = `${req.apiUrl}/questionnaire/saveUserQuestion`;
            return request({ url, method: 'POST', data });
        },
        saveUserTemplateQuestion(data) {
            const url = `${req.apiUrl}/questionnaire/saveUserTemplateQuestion`;
            return request({ url, method: 'POST', data });
        },
        getQuestionDetail(data) {
            const url = `${req.apiUrl}/questionnaire/getQuestionDetail`;
            return request({ url, method: 'POST', header: { 'content-type': 'application/x-www-form-urlencoded' }, data });
        },
        getUserTemplateQuestionDetail(data) {
            const url = `${req.apiUrl}/questionnaire/getUserTemplateQuestionDetail`;
            return request({ url, method: 'POST', header: { 'content-type': 'application/x-www-form-urlencoded' }, data });
        },

        getUserQuestionList(data) {
            const url = `${req.apiUrl}/questionnaire/getUserQuestionListByType`;
            return request({ url, method: 'GET', data });
        },
        /****评估测试 */
        getAssessmentByCoachId(data) {
            const url = `${req.apiUrl}/assessment/getAssessmentByCoachId`;
            return request({ url, method: 'GET', data });
        },
        getAssessmentByType(data) {
            const url = `${req.apiUrl}/assessment/getAssessmentByType`;
            return request({ url, method: 'GET', data });
        },
        addUserAssessment(data) {
            const url = `${req.apiUrl}/assessment/addUserAssessment`;
            return request({ url, method: 'POST', data });
        },
        getTrainersAssessment(data) {
            const url = `${req.apiUrl}/assessment/getTrainersAssessment`;
            return request({ url, method: 'POST', data });
        },
        getTrainerAssessmentByRecord(data) {
            const url = `${req.apiUrl}/assessment/getTrainerAssessmentByRecord`;
            return request({ url, method: 'POST', data });
        },
        getTrainerAssessmentDetail(data) {
            const url = `${req.apiUrl}/assessment/getTrainerAssessmentDetail`;
            return request({ url, method: 'POST', data });
        },
        /****体测报告**/
        getUserHealthCheckAll(data) { //得到用户所有体测信息
            const url = `${req.apiUrl}/healthCheck/getUserHealthCheckAll`;
            return request({ url, method: 'GET', data });
        },
        addHealthCheckReport(data) { //提交
            const url = `${req.apiUrl}/healthCheck/addHealthCheckReport`;
            return request({ url, method: 'POST', data });
        },
        getHealthReportDetail(data) { //查看详情
            const url = `${req.apiUrl}/healthCheck/getHealthReportDetail`;
            return request({ url, method: 'POST', data, header: { 'content-type': 'application/x-www-form-urlencoded' } });
        },
        /**训练规划***/
        getTrainClassByCoachId(data) { //得到教练下得课程
            const url = `${req.apiUrl}/trainPlan/getTrainClassByCoachId`;
            return request({ url, method: 'GET', data });
        },
        createUserTrainPlan(data) { //提交
            const url = `${req.apiUrl}/trainPlan/createUserTrainPlan`;
            return request({ url, method: 'POST', data });
        },
        addTrainClass(data) { //教练添加阶段
            const url = `${req.apiUrl}/trainPlan/addTrainClass`;
            return request({ url, method: 'POST', data });
        },
        getUserClassByCoachId(data) { //得到计划阶段列表
            const url = `${req.apiUrl}/trainPlan/getUserClassByCoachId`;
            return request({ url, method: 'GET', data });
        },
        addTrainClassContent(data) { //创建训练课自定义标签
            const url = `${req.apiUrl}/trainPlan/addTrainClassContent`;
            return request({ url, method: 'POST', data });
        },
        delUserTrainClassById(data) { //删除某个阶段
            const url = `${req.apiUrl}/trainPlan/delUserTrainClassById`;
            return request({ url, method: 'GET', data });
        },
        getTrainClassItemContent(data) { //查用户阶段详情
            const url = `${req.apiUrl}/trainPlan/getTrainClassItemContent`;
            return request({ url, method: 'POST', data });
        },
        getLastHealthReport(data) { //最近一次身体报告
            const url = `${req.apiUrl}/healthCheck/getLastHealthReport`;
            return request({ url, method: 'GET', data });
        },
        getUserTrainPlainDetail(data) { //训练计划详情
            const url = `${req.apiUrl}/trainPlan/getUserTrainPlainDetai`;
            return request({ url, method: 'GET', data });
        },
        deleteCoachTrainClass(data) { //教练删除阶段
            const url = `${req.apiUrl}/trainPlan/deleteCoachTrainClass`;
            return request({ url, method: 'POST', data });
        },
        modifyUserTrainClass(data) { //修改
            const url = `${req.apiUrl}/trainPlan/modifyUserTrainClass`;
            return request({ url, method: 'POST', data });
        },
        createUserTrainClass(data) { //用户新增阶段
            const url = `${req.apiUrl}/trainPlan/createUserTrainClass`;
            return request({ url, method: 'POST', data });
        },
        /***训练记录**/
        getUserClassSection(data) { //课时列表
            const url = `${req.apiUrl}/trainPlan/getUserClassSection`;
            return request({ url, method: 'POST', data });
        },
        addUserTrainClassSection(data) { //保存课程
            const url = `${req.apiUrl}/trainPlan/addUserTrainClassSection`;
            return request({ url, method: 'POST', data });
        },
        getUserClassSectionDetail(data) { //查看详情
            const url = `${req.apiUrl}/trainPlan/getUserClassSectionDetail`;
            return request({ url, method: 'POST', data });
        },
        delUserSectionDetail(data) { //删除某个动作
            const url = `${req.apiUrl}/trainPlan/delUserSectionDetail`;
            return request({ url, method: 'POST', data });
        },
        deleteUserClassSection(data) { //删除某节课
            const url = `${req.apiUrl}/trainPlan/deleteUserClassSection`;
            return request({ url, method: 'POST', data });
        },
        copyUserClassSection(data) { //复制一节小时课
            const url = `${req.apiUrl}/trainPlan/copyUserClassSection`;
            return request({ url, method: 'POST', data });
        },
        submitUserClassSection(data) { //保存编辑  其实只编辑了课程名称
            const url = `${req.apiUrl}/trainPlan/submitUserClassSection`;
            return request({ url, method: 'POST', data });
        },
        adddUserSectionDetail(data) { //编辑的时候新增一个动作
            const url = `${req.apiUrl}/trainPlan/adddUserSectionDetail`;
            return request({ url, method: 'POST', data });
        },
        editUserClassSectionDetail(data) { //编辑的时候编辑一个动作 多么的无奈~
            const url = `${req.apiUrl}/trainPlan/editUserClassSectionDetail`;
            return request({ url, method: 'POST', data });
        },
        getUserExperienceLessonDetail(data) { //体验课
            const url = `${req.apiUrl}/experienceLesson/getUserExperienceLessonDetail`;
            return request({ url, method: 'GET', data });
        },
        getUserExperienceLessonList(data) {
            const url = `${req.apiUrl}/experienceLesson/getUserExperienceLessonList`;
            return request({ url, method: 'GET', data });
        },
        addUserExperiencleClassSection(data) { //添加体验课
            const url = `${req.apiUrl}/experienceLesson/addUserExperiencleClassSection`;
            return request({ url, method: 'POST', data });
        },
        /******预约 */
        getUserAppointmentAllByDate(data) { //教练查预约
            const url = `${req.apiUrl}/coachAppointment/getUserAppointmentAllByDate`;
            return request({ url, method: 'POST', data });
        },
        appointment(data) {
            const url = `${req.apiUrl}/coachAppointment/appointment`;
            return request({ url, method: 'POST', data });
        },
        singIn(data) { //签到
            const url = `${req.apiUrl}/coachAppointment/singIn`;
            return request({ url, method: 'POST', data });
        },
        getUserSectionList(data) { //可预约的课程
            const url = `${req.apiUrl}/trainPlan/getUserSectionList`;
            return request({ url, method: 'POST', data });
        },
        // getAppointmentAllByDate(data){   //查询预约列表，这个接口需要改
        //     const url = `${req.apiUrl}/userAppointment/getAppointmentAllByDate`;
        //     return request({ url, method: 'GET', data });
        // }, 
        /*****支付 */
        payOrder(data) { //
            const url = `https://zhangleixd.com/wixinPayment/payOrder`;
            return request({ url, method: 'POST', data });
        },

        uploadFile(data) {
            console.log('上传参数：', data.formData)
            wx.uploadFile({
                url: `${req.apiUrl}/resource/uploadFile`,
                filePath: data.path,
                name: 'files',
                formData: data.formData,
                header: { 'content-type': 'multipart/form-data' },
                complete(res) {
                    //do something
                    console.log('图片上传完：', res.data)
                    data.success && data.success(JSON.parse(res.data));
                }
            })
        },
        /***上传图片
         * 多张图片上传
         */
        uploadimg(data) {
            var that = this,
                i = data.i ? data.i : 0,
                success = data.success ? data.success : 0,
                fail = data.fail ? data.fail : 0,
                upUrl = [];

            console.log('path', data.path[i]);
            wx.uploadFile({
                url: `${req.apiUrl}/resource/uploadFile`,
                filePath: data.path[i],
                name: 'fileData', //这里根据自己的实际情况改
                header: data.header,
                formData: {
                    sequence: i + 1
                },
                success: (resp) => {
                    success++;
                    upUrl.push(resp); //把成功的地址保存下来
                    console.log(resp)
                    console.log(i + "成功");
                },
                fail: (res) => {
                    fail++;
                    upUrl.push(res);
                    console.log('当前fail:' + i + "共fail:" + fail);
                },
                complete: () => {
                    // console.log(i);
                    i++;
                    if (i == data.path.length) { //当图片传完时，停止调用
                        console.log('执行完毕');
                        console.log('成功：' + success + " 失败：" + fail);
                        data.callBack(upUrl);
                    } else { //若图片还没有传完，则继续调用函数
                        console.log(i);
                        data.i = i;
                        data.success = success;
                        data.fail = fail;
                        that.uploadimg(data);
                    }
                }
            });
        },


        login() {
            const url = `${req.apiUrl}/api/user/login`;
            return request({ url }, false);
        },
        getMyInfo() {
            const url = `${req.apiUrl}/api/user/myInfo`;
            return request({ url });
        },
    };
}

module.exports = {
    install,
};