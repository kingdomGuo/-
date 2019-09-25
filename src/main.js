import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "@common/js/rem";
import fastclick from "fastclick";
import { Lazyload } from "vant";
import "@sass/index.scss";
import store from "./store/index";
// import "amfe-flexible";

// 300ms延迟
fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(Lazyload, {});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
