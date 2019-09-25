import axios from "axios";
import cryptoJS from "@common/js/cryptoJs.js";
import { GetQueryString, generateMixed, specialUrlEncode } from "./index";
import CryptoJS from "./CryptoJS";
import Base64 from "crypto-js/enc-base64";

// 创建axios实例
const APIkey = process.env.VUE_APP_APIkey; // '1d3763da50344a00be5e6a71a05547bd' // 5bc51a55c6a944d09f3ffce244b6bd18
const APIsecret = process.env.VUE_APP_APIsecret; // '09139a0bca5d4884814491428e55475f' // 107c35ba3ce94d488350e7d56dfeff3f

const VUE_APP_baseURL = process.env.VUE_APP_baseURL;
const VUE_APP_dcaServerURL = process.env.VUE_APP_dcaServerURL;
const VUE_APP_appServerURL = process.env.VUE_APP_appServerURL;
const VUE_APP_huibenApiURL = process.env.VUE_APP_huibenApiURL;
const VUE_APP_huibenMpURL = process.env.VUE_APP_huibenMpURL;
const service = axios.create({
  baseURL: VUE_APP_appServerURL, // api的base_url
  timeout: 10000, // 请求超时时间
  params: {}
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "get") {
      config.data = true;
    }
    if (
      config.baseURL === VUE_APP_baseURL ||
      config.baseURL === VUE_APP_dcaServerURL + "/"
    ) {
      config.params = config.params ? config.params : {};
      // config.headers['Auth-token'] = '6941ae51375f6da82eade3d6c566a7d3' // '6941ae51375f6da82eade3d6c566a7d3'
      delete config.params["openid"];
      delete config.params["deviceid"];
      delete config.params["wechat_id"];
      const nonce = generateMixed(16);
      const timestamp = new Date().getTime();
      const sortQueryStringTmp =
        specialUrlEncode("apikey") +
        "=" +
        specialUrlEncode(APIkey) +
        "&" +
        specialUrlEncode("nonce") +
        "=" +
        specialUrlEncode(nonce) +
        "&" +
        specialUrlEncode("timestamp") +
        "=" +
        specialUrlEncode(timestamp);
      const stringToSign = specialUrlEncode(sortQueryStringTmp);
      const signature = Base64.stringify(
        CryptoJS.HmacSHA1(stringToSign, APIsecret + "&")
      );
      config.params["apikey"] = APIkey;
      config.params["nonce"] = nonce;
      config.params["sig"] = signature;
      config.params["timestamp"] = timestamp;
      if (config.baseURL === VUE_APP_dcaServerURL + "/") {
        delete config.params["apikey"];
        delete config.params["nonce"];
        delete config.params["sig"];
        delete config.params["timestamp"];
        delete config.params["openid"];
        delete config.params["deviceid"];
        delete config.params["wechat_id"];
      }
    } else if (config.baseURL === VUE_APP_appServerURL) {
      config.params = config.params ? config.params : {};
      delete config.params["openid"];
      delete config.params["deviceid"];
      delete config.params["wechat_id"];
    } else if (config.baseURL === "http://172.16.152.64:8080") {
      config.params = config.params ? config.params : {};
      delete config.params["openid"];
      delete config.params["deviceid"];
      delete config.params["wechat_id"];
      delete config.params["nonce"];
      delete config.params["sig"];
      delete config.params["timestamp"];
      delete config.params["apikey"];
      // config.headers['Auth-token'] = '6941ae51375f6da82eade3d6c566a7d3'
    } else if (
      config.baseURL === VUE_APP_huibenApiURL ||
      config.baseURL === VUE_APP_huibenMpURL
    ) {
      config.params = config.params ? config.params : {};
      // delete config.params['openid']
      delete config.params["deviceid"];
      delete config.params["wechat_id"];
      delete config.params["apikey"];
      delete config.params["scope"];
      delete config.params["nonce"];
      delete config.params["sig"];
      delete config.params["timestamp"];
      const apiVersion = 1;
      const machineCode = JSON.parse(localStorage.getItem("outh")).userId; // config.params['openid'] || process.env.OPEN_ID || sessionStorage.getItem('openid') || window.openid || GetQueryString('openid') || '' // 5796c5e88efd83a761a0f591 5c6ec1acb7e049566c9ecec4
      const channelNum = "5c92374ed5dee82b639da544"; // 5ce7a637e4b01482b43bef28 5c7d3757b7e04929f07d4736 "xiaochengxu_ChannelNum_test 5c92374ed5dee82b639da544
      const timestamp = new Date().getTime();
      const strSecret = `${channelNum}${machineCode}${timestamp}`;
      const signature = cryptoJS
        .HmacSHA256(strSecret, "sibichif4RYhVJY1BTJ1Fo62jEv9891")
        .toString(); // sibichif4RYhVJY1BTJ1Fo62jEv9891 gushijiRYhVJYxxxo62jEvlcJS211
      config.headers["apiVersion"] = apiVersion;
      config.headers["machineCode"] = machineCode;
      config.headers["timestamp"] = timestamp;
      config.headers["channelNum"] = channelNum;
      config.headers["signature"] = signature;
    } else {
      config.params = config.params ? config.params : {};
      if (config.params && config.params["apikey"]) {
        delete config.params["apikey"];
      }
      if (config.params && config.params["nonce"]) {
        delete config.params["nonce"];
      }
      if (config.params && config.params["sig"]) {
        delete config.params["sig"];
      }
      if (config.params && config.params["timestamp"]) {
        delete config.params["timestamp"];
      }
      config.params = config.params ? config.params : {};
      config.params["openid"] =
        config.params["openid"] ||
        process.env.OPEN_ID ||
        sessionStorage.getItem("openid") ||
        window.openid ||
        "";
      config.params["deviceid"] =
        config.params["deviceid"] ||
        process.env.DEVICE_ID ||
        sessionStorage.getItem("deviceid") ||
        window.deviceid ||
        "";
      config.params["wechat_id"] =
        config.params["wechat_id"] ||
        process.env.WECHAT_ID ||
        GetQueryString("wechat_id") ||
        "";
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log("err" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);

export default service;
