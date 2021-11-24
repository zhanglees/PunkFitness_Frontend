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