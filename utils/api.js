function install(req, request) {
    req.api = {
        userRegister(data){
            const url = `${req.apiUrl}/user/register`;
            return request({ url, method: 'POST', data }, false);
        },
        getTrainerInfoByCoachId(data){
            const url = `${req.apiUrl}/user/getTrainerInfoByCoachId`;
            return request({ url, method: 'POST', header:{ 'content-type': 'application/x-www-form-urlencoded'}, data }, false);
        },
        getUserById(data){
            const url = `${req.apiUrl}/user/byid`;
            return request({ url, method: 'GET', data }, false);
        },
        getUserAll(data){
            const url = `${req.apiUrl}/user/getUserAll`;
            return request({ url, method: 'GET', data }, false);
        },
        decodePhone(data){
            // const url = `${req.apiUrl}/user/decodePhone`;
            return request({ url: 'url', data }, false);
        },
/*****问卷 */

        getQuestionnaireAll(data){
            const url = `${req.apiUrl}/questionnaire/getQuestionnaireAll`;
            return request({ url, method: 'POST', header:{ 'content-type': 'application/x-www-form-urlencoded'}, data }, false);
        },
/******预约 */
        appointment(data){
            const url = `${req.apiUrl}/userAppointment/appointment`;
            return request({ url, method: 'POST', data }, false);
        },
        getAppointmentAllByDate(data){
            const url = `${req.apiUrl}/userAppointment/getAppointmentAllByDate`;
            return request({ url, method: 'GET', data }, false);
        },
        singIn(data){   //签到
            const url = `${req.apiUrl}/userAppointment/singIn`;
            return request({ url, method: 'POST', data }, false);
        },
        /***上传图片
         * 多张图片上传
        */
        uploadimg(data){
            var that= this,
            i=data.i ? data.i : 0,
            success=data.success ? data.success : 0,
            fail=data.fail ? data.fail : 0,
            upUrl= [];
            
            console.log('path',data.path[i]);
            wx.uploadFile({
                url: data.url,
                filePath: data.path[i],
                name: 'fileData',//这里根据自己的实际情况改
                header: data.header,
                formData: {
                    sequence:i+1
                },
                success: (resp) => {
                    success++;
                    upUrl.push(resp);//把成功的地址保存下来
                    console.log(resp)
                    console.log(i+"成功");
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
                    } else {//若图片还没有传完，则继续调用函数
                        console.log(i);
                        data.i = i;
                        data.success = success;
                        data.fail = fail;
                        that.uploadimg(data);
                    }
                }
            });
        },
        

        login(){
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