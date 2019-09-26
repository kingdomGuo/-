import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "@common/js/rem";
import fastclick from "fastclick";
import VueLazyload from "vue-lazyload";
import "@sass/index.scss";
import store from "./store/index";
// import "amfe-flexible";

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
