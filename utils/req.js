const req = require('./mp-req/index.js');
// api
const api = require('./api.js');

const apiUrlTable = {
  local: 'http://182.92.189.147:443',
  dev: 'http://182.92.189.147:8023',
  pre: 'https://localhost:8080',
  release: 'https://localhost:8080',
};
const baseUrl = apiUrlTable.dev;
const apiUrl = baseUrl + '/api';
/**
 * code换取sessionId
 * @param {string} code
 */
function code2sessionId(code) {
  return new Promise((res, rej) => {
    wx.request({
      url: `${baseUrl}/wechatLogin/coachWeixiLogin`,   //后台登录地址
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      data: {
        code,
      },
      success(r1) {
        console.log(888888888888888, r1)
        if (r1.data && r1.data.code === 0) {
          res(r1.data.data);
        } else {
          rej(r1);
        }
      },
      fail: rej,
    });
  });
}

/**
 * 检查session是否有效  与后端约定session过期码
 * @param {any} res
 */
function isSessionAvailable(res) {
  return res.code !== 1029;
}

req.init({
  apiUrl,
  code2sessionId,
  isSessionAvailable,
});

req.use(api);

module.exports = req;