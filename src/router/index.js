import Vue from "vue";
import Router from "vue-router";
const ucIndex = () => import("@/pages/ucIndex.vue");
// const ucIndex = resolve => {
//   import("@/pages/ucIndex.vue").then(module => {
//     resolve(module);
//   });
// };
const home = () => import("@pages/Home.vue");
const muchAlbum = () => import("@pages/muchAlbum.vue");
// const muchAlbum = resolve => {
//   import("@pages/muchAlbum.vue").then(module => {
//     resolve(module);
//   });
// };
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/ucIndex"
    },
    {
      path: "/muchAlbum",
      name: "muchAlbum",
      component: muchAlbum
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/ucIndex",
      name: "ucIndex",
      component: ucIndex
      // children: [
      //   {
      //     path: "/detail",
      //     name: "detail",
      //     component: detail
      //   }
      // ]
    }
  ]
});
