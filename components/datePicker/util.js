// const formatTime = date => {
//     const year = date.getFullYear()
//     const month = date.getMonth() + 1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minute = date.getMinutes()
//     const second = date.getSeconds()
//
//     return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }


const formatHour = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return hour
};


const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatData = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-')
}

const formatDataBefore7 = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() - 7
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-')
}

const formatDataBefore3 = date => {
    const year = date.getFullYear();
    let month;
    let day;
    if (date.getDate() < 4) {
        month = date.getMonth();
    } else {
        month = date.getMonth() + 1;
    }
    if (date.getDate() < 4) {
        if (date.getMonth() === 2) {
            day = 28 - (3 - date.getDate());
        } else if (date.getMonth() === 1 || date.getMonth() === 3 || date.getMonth() === 5 || date.getMonth() === 7 || date.getMonth() === 8 || date.getMonth() === 10 || date.getMonth() === 12) {
            day = 31 - (3 - date.getDate());
        } else {
            day = 30 - (3 - date.getDate());
        }
    } else {
        day = date.getDate() - 3;
    }


    return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}



// 转换时间
const getDate = (year, month, day, hour, minute) => {
    const newyear = year.substr(0, year.length - 1);
    const setmonth = month.substr(0, month.length - 1);
    const newmonth = setmonth < 10 ? '0' + setmonth : setmonth;
    const setday = day.substr(0, day.length - 1);
    const newday = setday < 10 ? '0' + setday : setday;

    // const sethour = hour.substr(0, hour.length - 1);
    const newhour = hour < 10 ? '0' + hour : hour;
    // const setminute = minute.substr(0, minute.length - 1);

    const newminute = minute < 10 ? '0' + minute : minute;

    return newyear + '-' + newmonth + '-' + newday + ' ' + newhour + ":" + newminute;
};
// 将时间戳转换为时间
const stampToDate = (date) => {
    let now;
    if (date) {
        now = new Date(date)
    } else {
        now = new Date()
    }
    let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate(),
        h = now.getHours(), //获取当前小时数(0-23)
        f = now.getMinutes(),

        n = (Math.ceil((now.getMinutes()) / 10)) * 10; //获取当前分钟数(0-59)  取整数
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (f < 10 ? "0" + f : f);

};

//根据年月  获取天数
const mGetDate = (year, month) => {
        var d = new Date(year, month, 0);
        return d.getDate();
    }
    //根据时间2019-01-02 09：12  得到 ['2019','1','2','9','12']
const getArrFromDate = (str) => {
    let arr = [];
    let arr1 = str.split(' ');
    let arr2 = (arr1[0]).split('-');
    let arr3 = arr1[1].split(':');
    arr = arr2.concat(arr3);
    arr[1] = arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1];
    arr[2] = arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2];
    arr[3] = arr[3].startsWith('0') ? arr[3].substr(1, arr[3].length) : arr[3];
    arr[4] = arr[4].startsWith('0') ? arr[4].substr(1, arr[4].length) : arr[4];
    return arr;
};

module.exports = {
    formatTime: formatTime,
    formatData: formatData,
    formatDate: formatDate,
    formatDataBefore7: formatDataBefore7,
    formatDataBefore3: formatDataBefore3,
    formatHour: formatHour,
    getDate,
    stampToDate,
    mGetDate,
    getArrFromDate,
}