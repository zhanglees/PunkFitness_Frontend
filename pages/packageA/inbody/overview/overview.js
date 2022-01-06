// pages/packageA/inbody/inbody.js
var wxCharts = require('../../../../utils/wxcharts.js');
var util = require('../../../../utils/util.js');
var lineChart = null;
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        textcolor1:'#014f8e',
        textcolor2:'#bfbfbf',
        dataTitle: '',
        reportList: []
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const userid = options.userId;
        let coachId = wx.getStorageSync('mp-req-user-id');
        this.data.userId = userid;
        this.data.coachId = coachId;
        //获取用户体重数据
        // var x_data=["12-05", "12-06", "12-07", "12-08", "12-09", "12-10", "12-11"]
        // var y_data= ["55", "56", "53", "55", "55", "57", "53"]
            //绘制折线图
        // this.OnWxChart(x_data,y_data);
        this.getReportList(userid, coachId);
    },
    getReportList(userid, coachId){
        //获取用户的报告记录
      app.req.api.getUserHealthCheckAll({
          coachId: coachId,
          userId: userid
        }).then(res=>{
          const data = res.data;
          const len = data.length;
          if(len){
            let x_data = [], y_data = [];
            let startDate, endDate;
            data.forEach((i, k)=>{
              if(i.weight && i.createTime){
                const date = util.formatDate(new Date(i.createTime.replace(/\.|\-/g, '/')));
                x_data.push(date);
                y_data.push(i.weight);
              }
            });
            startDate = x_data[0];
            endDate = x_data[x_data.length - 1];
            this.OnWxChart(x_data,y_data);
            this.setData({
                dataTitle: startDate + ' ~ ' + endDate,
                reportList: data
            })
          }
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
        url: '/pages/packageA/inbody/report/report?userId=' + this.data.userId,
      })
    },
    reportDetail(e){
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/packageA/inbody/report/report?reportId=' + id,
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