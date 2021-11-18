// pages/packageA/inbody/inbody.js
var wxCharts = require('../../../../utils/wxcharts.js');
var lineChart = null;
Page({

    /**
     * Page initial data
     */
    data: {
        textcolor1:'#014f8e',
        textcolor2:'#bfbfbf',
        userInfo: {
          name: "Ada",
          avatarUrl: '/images/member/avatar.png',
          mobile: "13888888888",
          birthday: "2020-10-22",
          age: '27',
          tags: ['增肌', '减脂', '康复'],
          remark: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。'
        },
        dataTitle: '',
        reportList: []
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const userid = options.userid;
        //获取用户体重数据
        var x_data=["12-05", "12-06", "12-07", "12-08", "12-09", "12-10", "12-11"]
        var y_data= ["55", "56", "53", "55", "55", "57", "53"]
            //绘制折线图
        this.OnWxChart(x_data,y_data);
        this.getReportList(userid);
        this.setData({
            dataTitle: '2021/10/11-2021/10/22'
        })
    },
    getReportList(userid){
        //获取用户的报告记录
        const reportList = [{
            coach: '张小凡',
            time: '2021/10/11',
            weight: '50',
            fatrate: '10',
            ratio: '2.0'
        }, {
            coach: '张小凡',
            time: '2021/10/9',
            weight: '50',
            fatrate: '20.33',
            ratio: '1.0'
        }, {
            coach: '张小凡',
            time: '2021/10/8',
            weight: '50',
            fatrate: '10',
            ratio: '2.0'
        }];
        this.setData({
            reportList: reportList
        })
    },
    OnWxChart:function(x_data,y_data,name){
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        lineChart = new wxCharts({
          canvasId: 'lineCanvas',     //输入wxml中canvas的id
          type: 'line',     
          categories: x_data,    //模拟的x轴横坐标参数
          background: '#3D4257',
          animation: true,  //是否开启动画
          legend: false,
          dataLabel: true,
          dataPointShape: true,
         
          series: [{
            name: "体重",
            data: y_data,
            format: function (val, name) {
              return val + '';
            }
          }],
          xAxis: {   //是否隐藏x轴分割线
            disableGrid: true,
            fontColor: '#eee'
          },
          yAxis: {      //y轴数据
            // format: function (val) {  //返回数值
            //   return val.toFixed(2);
            // },
            gridColor: '#eee',
            disableGrid: true,
            titleFontColor: '#eee',
            fontColor: '#eee',
            gridColor: '#3D4257'
          },
          width: windowWidth,
          height: 200,
          extra: {
              lineStyle: 'curve'
          }
        });
    },
    /***添加体测报告*/
    addReport(){
      wx.redirectTo({
        url: '/pages/packageA/inbody/report/report',
      })
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})