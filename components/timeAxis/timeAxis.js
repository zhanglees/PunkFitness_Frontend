Component({
    options: {},

    properties: {
        axisArr: {
            type: Object,
            value: {}
        }
    },

    data: {

    },
    ready() {
        wx.loadFontFace({
            global: true,
            family: 'Roboto-Medium',
            source: 'url("https://www.zhangleixd.com/static/imgs/Roboto-Medium-12.ttf")'
        })
    },

    methods: {}
})