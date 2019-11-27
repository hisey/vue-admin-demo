import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// import "@/styles/theme/index.css";
// import "@/styles/theme/demo.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import '@/assets/css/index.scss'
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router";
import store from "./store";

import "@/icons"; // icon
import "@/permission"; // permission control
import * as filters from "@/filters";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
