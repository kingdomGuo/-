import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "@common/js/rem";
import fastclick from "fastclick";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import store from "./store/index";
import Router from "vue-router";
import "swiper/css/swiper.css";
import { Icon } from "vant";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// import "amfe-flexible";
Vue.use(VueAwesomeSwiper);
Vue.use(Icon);
// 300ms延迟
fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  error: require("./assets/DefaultCover.png"),
  loading: require("./assets/lazyImg.png"),
  attempt: 3 // default 1
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
