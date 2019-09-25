import fetch from "@/utils/fetch";
const APIkey = process.env.VUE_APP_APIkey;

// 轮播图
export function carousel(query) {
  query = {
    app_id: APIkey, // 5bc51a55c6a944d09f3ffce244b6bd18
    user_id: JSON.parse(localStorage.getItem("outh")).userId,
    type: "index"
  };
  return fetch({
    url: "/mobile-app/api/resource/carousel/index",
    method: "get",
    params: query
  });
}
