// app.js
const req = require('/utils/req.js');
App({
  onLaunch() {
    // 这里是不是应该先登录一下呢
  },
  req: req,
  globalData: {
    userInfo: null
  }
})
