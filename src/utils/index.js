// import {assign} from 'lodash'
// import { Base64 } from 'js-base64'
// import { sha256 } from 'js-sha256'
// import sha256 from './sha256'
import Base64 from "crypto-js/enc-base64";
import cryptoJS from "@common/js/cryptoJs";
var Basen64 = require("js-base64").Base64;
export function dateAdd(interval, number, date) {
  /*
   * 功能:实现VBScript的DateAdd功能.
   * 参数:interval,字符串表达式，表示要添加的时间间隔.
   * 参数:number ,数值表达式，表示要添加的时间间隔的个数.
   * 参数:date,时间对象.
   * 返回:新的时间对象.
   * var now = new Date()
   * var newDate = DateAdd('d',5,now)
   *--------------- DateAdd(interval,number ,date) -----------------
   */
  switch (interval) {
    case "year": {
      date.setFullYear(date.getFullYear() + number);
      return date;
    }
    case "quarter": {
      date.setMonth(date.getMonth() + number * 3);
      return date;
    }
    case "month": {
      date.setMonth(date.getMonth() + number);
      return date;
    }
    case "week": {
      date.setDate(date.getDate() + number * 7);
      return date;
    }
    case "day": {
      date.setDate(date.getDate() + number);
      return date;
    }
    case "hour": {
      date.setHours(date.getHours() + number);
      return date;
    }
    case "minute": {
      date.setMinutes(date.getMinutes() + number);
      return date;
    }
    case "second": {
      date.setSeconds(date.getSeconds() + number);
      return date;
    }
    default: {
      date.setDate(date.getDate() + number);
      return date;
    }
  }
}

export function removeRepeatArr(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i].musicId === arr2[j].musicId) {
        arr1.splice(i, 1); // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
      }
    }
  }
  // alert(arr1.length)
  for (var m = 0; m < arr2.length; m++) {
    arr1.unshift(arr2[m]);
  }
  console.log(arr1);
  return arr1;
}

export function unshiftRepeatArr(arr1, arr2) {
  console.log(arr1, arr2);
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i].musicId === arr2[j].musicId) {
        arr1.splice(i, 1); // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
      }
    }
  }
  for (var m = arr2.length - 1; m >= 0; m--) {
    arr1.unshift(arr2[m]);
  }
  console.log(arr1);
  return arr1;
}

export function distinctArr(arr1) {
  var arr = arr1;
  var i;
  var obj = {};
  var result = [];
  for (i = 0; i < arr.length; i++) {
    if (!obj[arr[i].musicId]) {
      // 如果能查找到，证明数组元素重复了
      obj[arr[i].musicId] = 1;
      result.push(arr[i]);
    }
  }
  return result;
}

/*
 * 功能:判断是否在微信浏览器中打开
 */
export function isWeixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("micromessenger") > -1) {
    return true;
  } else {
    return false;
  }
}
/*
 * 功能:采用正则表达式获取地址栏参数
 */
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function GetQuerySongString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
// 获取指定日期前一个月
export function getPreMonth(date) {
  var arr = date.split("-");
  var year = arr[0]; // 获取当前日期的年份
  var month = arr[1]; // 获取当前日期的月份
  var day = arr[2]; // 获取当前日期的日
  // var days = new Date(year, month, 0);
  // days = days.getDate(); // 获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = "0" + month2;
  }
  var t2 = year2 + "-" + month2 + "-" + day2;
  return t2;
}
// 获取指定当前日期的前30天
export function getThirtyDay() {
  var myDate = new Date();
  var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); // 最后一个数字30可改，30天的意思
  var lastY = lw.getFullYear();
  var lastM = lw.getMonth() + 1;
  var lastD = lw.getDate();
  var startdate =
    lastY +
    "-" +
    (lastM < 10 ? "0" + lastM : lastM) +
    "-" +
    (lastD < 10 ? "0" + lastD : lastD); // 三十天之前日期
  return startdate;
}

export function parseTrack(tracks) {
  return tracks;
}
/*
 * 功能:判断中英文字符长度
 */
export function countLength(str) {
  var inputLength = 0;
  // 给一个变量来记录长度
  for (var i = 0; i < str.length; i++) {
    var countCode = str.charCodeAt(i);
    // 返回指定位置的字符的Unicode编码
    // 判断是不是ASCII码,Unicode码前128个字符是ASCII码
    if (countCode >= 0 && countCode <= 128) {
      inputLength++;
    } else {
      inputLength += 2;
      // 如果是扩展码，则一次+2
    }
  }
  return inputLength;
}
/*
 * 功能:判断中英文字符长度是否超出长度
 */
export function isOverLength(str, strLength) {
  var isOver = false;
  var inputLength = 0;
  // 给一个变量来记录长度
  for (var i = 0; i < str.length; i++) {
    var countCode = str.charCodeAt(i);
    // 返回指定位置的字符的Unicode编码
    // 判断是不是ASCII码,Unicode码前128个字符是ASCII码
    if (countCode >= 0 && countCode <= 128) {
      inputLength++;
    } else {
      inputLength += 2;
      // 如果是扩展码，则一次+2
    }
    // 是否超过置顶长度
    if (strLength > inputLength) {
      isOver = true;
    }
  }
  return isOver;
}
/*
 * 功能:根据日期格式，格式化时间戳
 */
export function timeformat(format, time) {
  if (!format) return;
  var dateObj = time ? new Date(time) : new Date();
  var date = {
    "M+": dateObj.getMonth() + 1,
    "d+": dateObj.getDate(),
    "h+": dateObj.getHours(),
    "m+": dateObj.getMinutes(),
    "s+": dateObj.getSeconds(),
    "q+": Math.floor((dateObj.getMonth() + 3) / 3),
    "S+": dateObj.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? date[k]
          : ("00" + date[k]).substr(("" + date[k]).length)
      );
    }
  }
  return format;
}
/*
 * 功能:设置页面title
 */
export function setTitle(title) {
  document.title = title;
}
/*
 * 功能:页面输入框失去焦点
 */
export function inputBlur() {
  let inputArr = document.querySelectorAll("input,textarea");
  for (var i = 0; i < inputArr.length; i++) {
    inputArr[i].blur();
  }
}
/*
 * 功能:计算图片的文件流大小 单位为字节
 */
export function countImgLength(str) {
  if (!str) return;
  str = str.substring(22);
  var equalIndex = str.indexOf("=");
  if (str.indexOf("=") > 0) {
    str = str.substring(0, equalIndex);
  }
  var strLength = str.length;
  var fileLength = parseInt(strLength - (strLength / 8) * 2);
  return fileLength;
}
/*
 * 功能:URL解析函数和分段URL解析方法
 */
export function parseURL(url) {
  var a = document.createElement("a");
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      var ret = {};
      var seg = a.search.replace(/^\?/, "").split("&");
      var len = seg.length;
      var i = 0;
      var s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split("=");
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\\/?#]+)$/i) || ["", ""])[1],
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\\/])/, "/$1"),
    relative: (a.href.match(/tps?:\/\/[^\\/]+(.+)/) || ["", ""])[1],
    segments: a.pathname.replace(/^\//, "").split("/")
  };
}
/*
 * 功能:过滤字符串前后空格或去掉所有空格
 * @param string
 * @param {string}
 * @returns string
 */
export function trim(str = "", isGlobal) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (isGlobal && isGlobal.toLowerCase() === "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}
/*
 * 功能:验证手机号码
 */
export function checkPhoneNum(mobile) {
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  return reg.test(mobile);
}
/*
 * 功能: 抓取页面错误
 */
export function catchError() {
  window.onerror = (
    errorMessage,
    scriptURI,
    lineNumber,
    columnNumber,
    errorObj
  ) => {
    alert("错误信息：", errorMessage);
    alert("出错文件：", scriptURI);
    alert("出错行号：", lineNumber);
    alert("出错列号：", columnNumber);
    alert("错误详情：", errorObj);
  };
}
/*
 * 功能: 生成指定随机数
 * @params number
 * return string
 */
export function generateMixed(n) {
  var jschars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += jschars[id];
  }
  return res;
}

export function specialUrlEncode(code) {
  let s = encodeURIComponent(code)
    .replace("+", "%20")
    .replace("*", "%2A")
    .replace("%7E", "~");
  return s;
}

export function base64urlencode(code) {
  let s = Basen64.encode(code);
  s = s.split("=")[0];
  s = s.replace("+", "-");
  s = s.replace("/", "_");
  return s;
}
export function genCodeChallenge(str) {
  let st = cryptoJS.SHA256(str);
  let s = Base64.stringify(st);
  s = s.split("=")[0];
  s = s.replace("+", "-");
  s = s.replace("/", "_");
  return s;
}

/*
 * 功能: 获取浏览器客户端信息
 * @params
 * return
 */
export function getBrowser() {
  var a = navigator.userAgent;
  var browser = {
    trident: a.indexOf("Trident") > -1,
    presto: a.indexOf("Presto") > -1,
    webKit: a.indexOf("AppleWebKit") > -1,
    gecko: a.indexOf("Gecko") > -1 && a.indexOf("KHTML") === -1,
    mobile: !!a.match(/AppleWebKit.*Mobile.*/),
    ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
    iPhone: a.indexOf("iPhone") > -1,
    iPad: a.indexOf("iPad") > -1,
    webApp: a.indexOf("Safari") === -1,
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  return browser;
}
/*
 * 功能: 获取设备信息
 * @params
 * return
 */
export function getDeviceInfo() {
  var browser = getBrowser();
  var device = {};
  var user = {};
  // Document对象数据
  if (document) {
    device.domain = document.domain || "";
    device.url = document.URL || "";
    device.title = document.title || "";
    device.referrer = document.referrer || "";
  }
  // Window对象数据
  if (window && window.screen) {
    device.sh = window.screen.height || 0;
    device.sw = window.screen.width || 0;
    device.cd = window.screen.colorDepth || 0;
  }
  // navigator对象数据
  if (navigator) {
    device.lang = browser.language || "";
    device.platform = browser.android ? "android" : "ios";
  }
  // 微信用户信息
  user.openid = window.openid || "";
  user.deviceid = window.deviceid || "";
  return { device, user };
}

export function getTimestamp() {
  return new Date().getTime();
}

export function findARR(arr, key, value) {
  let status = arr.find(item => {
    return item[key] === value;
  });
  if (status) {
    return true;
  } else {
    return false;
  }
}

let second = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59"
];
let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const years = [["上午", "下午"], hours, second];
