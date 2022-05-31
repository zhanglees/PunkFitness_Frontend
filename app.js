// app.js
const req = require('/utils/req.js');
App({
    onLaunch() {
        // 这里是不是应该先登录一下呢
        this.overShare();
        wx.loadFontFace({
            global: true,
            family: 'Roboto-Medium',
            source: 'url("https://www.zhangleixd.com/static/imgs/Roboto-Medium-12.ttf")',
            success: console.log
        })
        wx.loadFontFace({
            global: true,
            family: 'Roboto-Bold',
            source: 'url("https://www.zhangleixd.com/static/imgs/Roboto-Bold-3.ttf")',
            success: console.log
        })
    },
    /**
     * 开启朋友圈分享功能
     * @description 监听路由切换/自动执行
     * @return void
     */
    overShare() {
        wx.onAppRoute((res) => {
            // console.log('route', res)
            let pages = getCurrentPages()
            let view = pages[pages.length - 1]
            if (view) {
                wx.showShareMenu({
                    menus: ['shareAppMessage', 'shareTimeline'],
                    success(res) {},
                    fail(e) {}
                })
            }
        })
    },
    req: req,
    globalData: {
        userInfo: null
    }
})