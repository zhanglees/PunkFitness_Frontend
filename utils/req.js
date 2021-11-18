const req = require('./mp-req/index.js');
// api
const api = require('./api.js');

const apiUrlTable = {
  local: 'http://localhost:8080',
  dev: 'http://localhost:8080',
  pre: 'https://localhost:8080',
  release: 'https://localhost:8080',
};
const apiUrl = apiUrlTable.release;

/**
 * code换取sessionId
 * @param {string} code
 */
function code2sessionId(code) {
  return new Promise((res, rej) => {
    wx.request({
      url: `${apiUrl}/api/sys/login`,   //后台登录地址
      method: 'POST',
      data: {
        code,
      },
      success(r1) {
        if (r1.data && r1.data.code === 0) {
          res(r1.data.data.sessionId);
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
  return res.code !== 3000;
}

req.init({
  apiUrl,
  code2sessionId,
  isSessionAvailable,
});

req.use(api);

module.exports = req;