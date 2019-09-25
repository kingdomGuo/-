import Vue from "vue";
import Router from "vue-router";
const ucIndex = () => import("@/pages/ucIndex.vue");
const home = () => import("@pages/Home.vue");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ucIndex",
      component: ucIndex
    },
    {
      path: "/ucIndex",
      name: "ucIndex",
      component: ucIndex
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});