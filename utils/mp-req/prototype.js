const sessionStorageKey = 'mp-req-session-id',
    userStorageKey = 'mp-req-user-id';
let sessionId = wx.getStorageSync(sessionStorageKey);
// let userId = wx.getStorageSync(userStorageKey);
const loginQueue = [];
let isLoginning = false;

const req = {
    apiUrl: '',
    code2sessionId: null,
    isSessionAvailable: null,
    sessionHeaderKey: 'sessionkey',
    init(opt = {}) {
        const {
            apiUrl,
            code2sessionId,
            isSessionAvailable,
            sessionHeaderKey,
        } = opt;
        if (apiUrl) {
            req.apiUrl = apiUrl;
        }
        if (code2sessionId) {
            req.code2sessionId = code2sessionId;
        }
        if (isSessionAvailable) {
            req.isSessionAvailable = isSessionAvailable;
        }
        if (sessionHeaderKey) {
            req.sessionHeaderKey = sessionHeaderKey;
        }
    },
};

/**
 * 判断请求状态是否成功
 * @param {number} status
 */
function isHttpSuccess(status) {
    return (status >= 200 && status < 300) || status === 304;
}

/**
 * promise请求
 * @param {object} options {}
 */
function requestP(options = {}) {
    const {
        success,
        fail,
        data
    } = options;
    // 统一注入约定的header
    const header = Object.assign({
        [req.sessionHeaderKey]: sessionId,
        timestamp: new Date().getTime()
    }, options.header);
    wx.showLoading({
        title: '加载中',
    })
    if (!data.coachId) {
        const coachId = wx.getStorageSync('mp-req-user-id');
        options.data.coachId = coachId;
    }
    // 统一加coachId 到 data
    return new Promise((res, rej) => {
        wx.request(Object.assign({},
            options, {
                header,
                success(r) {
                    const isSuccess = isHttpSuccess(r.statusCode);
                    if (isSuccess) { // 成功的请求状态
                        if (success) {
                            success(r.data);
                            return;
                        }
                        wx.hideLoading();
                        res(r.data);
                    } else {
                        wx.hideLoading();
                        const err = {
                            msg: `服务器出了点小问题（错误代码：${r.statusCode}）`,
                            detail: r,
                        };
                        if (fail) {
                            fail(err);
                            return;
                        }
                        rej(err);
                    }
                },
                fail(err) {
                    wx.hideLoading();
                    if (fail) {
                        fail(err);
                        return;
                    }
                    rej(err);
                },
            },
        ));
    });
}

/**
 * 登录
 */
function login() {
    return new Promise((res, rej) => {
        // 微信登录
        wx.login({
            success(r1) {
                if (r1.code) {
                    // 获取sessionId
                    if (!req.code2sessionId) {
                        rej('code2sessionId未定义');
                        return;
                    }
                    req.code2sessionId(r1.code)
                        .then((r2) => {
                            const newSessionId = r2.session_key;
                            // const newUserId = r2.userId;
                            sessionId = newSessionId; // 更新sessionId
                            // userId = newUserId;
                            // 保存sessionId
                            wx.setStorage({
                                key: sessionStorageKey,
                                data: newSessionId,
                            });
                            // wx.setStorage({
                            //     key: userStorageKey,
                            //     data: newUserId,
                            // });
                            res(r2);
                        })
                        .catch(rej);
                } else {
                    rej(r1);
                }
            },
            fail: rej,
        });
    });
}
/**
 * 获取sessionId
 */
function getSessionId() {
    return new Promise((res, rej) => {
        // 本地sessionId丢失，重新登录
        if (!sessionId) {
            loginQueue.push({ res, rej });

            if (!isLoginning) {
                isLoginning = true;
                login()
                    .then((r1) => {
                        isLoginning = false;
                        while (loginQueue.length) {
                            loginQueue.shift().res(r1);
                        }
                    })
                    .catch((err) => {
                        isLoginning = false;
                        while (loginQueue.length) {
                            loginQueue.shift().rej(err);
                        }
                    });
            }
        } else {
            res(sessionId);
        }
    });
}

/**
 * ajax高级封装
 * @param {object} options {}
 * @param {boolean} keepLogin true
 */
function request(options = {}, keepLogin = true) {
    if (keepLogin) {
        return new Promise((res, rej) => {
            getSessionId()
                .then(() => {
                    // 获取sessionId成功之后，发起请求
                    requestP(options)
                        .then((r2) => {
                            if (!req.isSessionAvailable) {
                                rej('isSessionAvailable未定义');
                                return;
                            }
                            if (!req.isSessionAvailable(r2)) {
                                /**
                                 * 登录状态无效，则重新走一遍登录流程
                                 * 销毁本地已失效的sessionId
                                 */
                                sessionId = '';
                                getSessionId()
                                    .then(() => {
                                        requestP(options)
                                            .then(res)
                                            .catch(rej);
                                    })
                                    .catch(rej);
                            } else {
                                res(r2);
                            }
                        })
                        .catch(rej);
                })
                .catch(rej);
        });
    }
    // 不需要sessionId，直接发起请求
    return requestP(options);
}

/**
 * 插件接口
 * @param {object} plugin
 */
function use(plugin) {
    return plugin.install(req, request);
}

req.use = use;

module.exports = req;