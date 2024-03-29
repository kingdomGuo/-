import fetch from "@/utils/fetch";
const APIkey = process.env.VUE_APP_APIkey;
// const VUE_APP_dcaServerURL = process.env.VUE_APP_dcaServerURL;
// const VUE_APP_appServerURL = process.env.VUE_APP_appServerURL;
const VUE_APP_huibenApiURL = process.env.VUE_APP_huibenApiURL;
const VUE_APP_huibenMpURL = process.env.VUE_APP_huibenMpURL;

// 轮播图
export function carousel(query) {
  query = {
    app_id: APIkey, // 5bc51a55c6a944d09f3ffce244b6bd18
    user_id: 1000009738, //JSON.parse(localStorage.getItem("outh")).userId,
    type: "index"
  };
  return fetch({
    url: "/mobile-app/api/resource/carousel/index",
    method: "get",
    params: query
  });
}

// 首页板块
export function batchIndexList(query) {
  query = {
    app_id: APIkey,
    user_id: 1000009738, // JSON.parse(localStorage.getItem("outh")).userId,
    type: "child",
    page: query.page,
    count: query.count
  };
  return fetch({
    url: "/mobile-app/api/resource/batch/list",
    method: "get",
    params: query
  });
}
// 绘本轮播图
export function aiGetCompleteSystemRecommend(data, query) {
  return fetch({
    baseURL: VUE_APP_huibenMpURL,
    url: "/recommend/getCompleteSystemRecommend",
    method: "post",
    data: data,
    params: query
  });
}
// 绘本轮播图
export function aiGetRecommendDetailed(data, query) {
  return fetch({
    baseURL: VUE_APP_huibenMpURL,
    url: "/recommend/getRecommendDetailed",
    method: "post",
    data: data,
    params: query
  });
}
// 绘本详情
export function aiGetMiniProgramBookInfo(data, query) {
  return fetch({
    baseURL: VUE_APP_huibenApiURL,
    url: "/mpPicbook/getMiniProgramBookInfo",
    method: "post",
    data: data,
    params: query
  });
}
// 首页更多
export function albumsListAllDetail(query) {
  query = {
    app_id: APIkey, // 5bc51a55c6a944d09f3ffce244b6bd18
    user_id: 1000009738,
    type: "child",
    page: query.page,
    module_id: query.module_id,
    count: query.count
  };
  return fetch({
    url: "/mobile-app/api/resource/batch/detail",
    method: "get",
    params: query
  });
}

// 首页专辑详情和专辑的歌曲列表
export function albumsBrowse(query) {
  // query = {
  //   app_id: APIkey,
  //   user_id: 1000009738, //JSON.parse(localStorage.getItem("outh")).userId,
  //   type: query.type,
  //   page: query.page,
  //   device_id: query.device_id,
  //   album_id: query.album_id,
  //   album_source: query.album_source,
  //   album_type: query.album_type,
  //   information: query.information,
  //   count: query.count
  // };
  if (query) {
    query.user_id = 1000009738;
    query.app_id = APIkey;
  }
  return fetch({
    url: "/mobile-app/api/resource/album/browse",
    method: "get",
    params: query
  });
}
