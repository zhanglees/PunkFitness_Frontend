const dateUtils = require('./util.js')

// 初始化日期模态框数据
let date = new Date();
let years = [];
let months = [];
let days = [];
// let hours = [];
// let minutes = [];
for (let i = date.getFullYear() - 60; i <= date.getFullYear(); i++) {
    years.push(i + "年")
}
for (let i = 1; i <= 12; i++) {

    if (i < 10) {
        months.push("0" + i + "月")
    } else {
        months.push(i + "月")
    }
}
for (let i = 1; i <= 31; i++) {
    if (i < 10) {
        days.push("0" + i + "日");
    } else {
        days.push(i + "日");
    }

}
// for (let i = 0; i <= 23; i++) {
//     hours.push(i + "")
// }
// for (let i = 0; i <= 59; i++) {
//     minutes.push(i + "")
// }


Component({
    // options: {
    //   multipleSlots: true // 在组件定义时的选项中启用多slot支持
    // },

    properties: {
        // title: {            // 属性名
        //   type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        //   value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
        // }

        // timeValue: {
        //   type: Array,
        //   value: "标题"
        // },
        // years: {
        //   type: Array,
        //   value: "年"
        // },
        // months: {
        //   type: Array,
        //   value: "月"
        // },
        // days: {
        //   type: Array,
        //   value: "日"
        // },
        // hours: {
        //   type: Array,
        //   value: "小时"
        // },
        // minutes: {
        //   type: Array,
        //   value: "分钟"
        // }
    },

    data: {
        startDate: "",
        endDate: "",
        userName: "",
        farmerId: "",
        timeValue: [years.length - 20, 0, 0],
        changeFlag: false,
        value: [years.length - 20, 0, 0],
        openFlag: true, //1日期控件显示  2控件滚动选择 底部页面不滚动
        years: years, //时间可选范围模态框数据
        months: months,
        days: days,
        // hours: hours,
        // minutes: minutes,
        year: '', //时间值
        month: '',
        day: '',
        hour: '',
        minute: '',
        startTime: dateUtils.stampToDate(),
        selectDate: ""
    },


    methods: {

        //取消
        // cancelBtn() {
        //     // this.triggerEvent("cancelBtn");
        //     this.hideModal()
        // },
        //确认
        // confirmBtn(e) {
        //     if (this.data.selectDate == "") {
        //         this.triggerEvent("confirmBtn", this.data.dateItem);
        //     } else {
        //         this.triggerEvent("confirmBtn", this.data.selectDate);
        //     }
        //     this.hideModal();
        //     // this.bindChangeEvent();
        //     // this.triggerEvent("bindChangeEvent",e.detail);
        // },
        // 调用父组件  事件
        bindChangeEvent(e) {
            let changeDate = "";
            let year1 = years[e.detail.value[0]].replace("年", "-").trim();
            let month1 = months[e.detail.value[1]].replace("月", "-").trim();
            let day1 = this.data.days[e.detail.value[2]].replace("日", "").trim();
            const selectDate = year1 + month1 + day1;
            this.setData({
                selectDate
            });
            // console.log("year1", year1+month1+day1);
            // console.log("days", days);
            this.setData({
                timeValue: e.detail.value
            });
            let val = e.detail.value;

            const year = this.data.years[val[0]];
            const month = this.data.months[val[1]];
            const day = this.data.days[val[2]];
            // const hour = this.data.hours[val[3]];
            // const minute = this.data.minutes[val[4]];

            //如果点击月份  那么后面日跟着变换数据
            let days = [];
            const dayNum = dateUtils.mGetDate(year.substr(0, year.length - 1), month.substr(0, month.length - 1));
            for (let i = 1; i <= dayNum; i++) {
                if (i < 10) {
                    days.push("0" + i + "日");
                } else {
                    days.push(i + "日");
                }
            }

            this.triggerEvent("bindChangeEvent", selectDate);
            this.setData({
                days,
                year,
                month,
                day,
                // hour,
                // minute,
                changeFlag: true,
            })
        },

        // //显示
        // showModal: function() {
        //     this.setData({
        //         modalName: "DialogModal1"
        //     })
        //     let dateArr = this.data.dateItem.split("-");
        //     console.log("dateArr", dateArr);
        //     let yearNum = this.getArrayIndex(years, dateArr[0] + "年");
        //     let monthNum = this.getArrayIndex(months, dateArr[1] + "月");
        //     let dayNum = this.getArrayIndex(this.data.days, dateArr[2] + "日");
        //     this.setData({
        //         timeValue: [yearNum, monthNum, dayNum]
        //     });
        // },

        // hideModal: function() {
        //     this.setData({
        //         modalName: null
        //     })
        // },

        getArrayIndex(arr, obj) {
            let i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return i;
                }
            }
            return -1;
        }

    },

});