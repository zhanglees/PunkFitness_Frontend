function install(req, request) {
    req.api = {
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