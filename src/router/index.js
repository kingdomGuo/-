import Vue from "vue";
import Router from "vue-router";
const ucIndex = () => import("@/pages/ucIndex.vue");
const home = () => import("@pages/Home.vue");
const muchAlbum = () => import("@pages/muchAlbum.vue");
const songDetail = () => import("@pages/songDetail.vue");
const search = () => import("@pages/search.vue");
const allType = () => import("@pages/allType.vue");
const huibenDetail = () => import("@pages/huibenDetail.vue");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/ucIndex"
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/ucIndex",
      name: "ucIndex",
      component: ucIndex,
      children: [
        {
          path: "muchAlbum",
          name: "muchAlbum",
          component: muchAlbum
        },
        {
          path: "songDetail",
          name: "songDetail",
          component: songDetail
        },
        {
          path: "huibenDetail",
          name: "huibenDetail",
          component: huibenDetail
        },
        {
          path: "search",
          name: "search",
          component: search
        },
        {
          path: "allType",
          name: "allType",
          component: allType,
          children: [
            {
              path: "muchAlbum",
              name: "muchAlbumList",
              component: muchAlbum
            }
          ]
        }
      ]
    }
  ]
});
