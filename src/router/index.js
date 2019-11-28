import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";
export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login").then(m => m.default),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404").then(m => m.default),
    hidden: true
  },
  // {
  //   path: "",
  //   component: Layout,
  //   redirect: "/login",
  //   name: "home",
  // },
  {
    path: "/icon",
    component: Layout,
    redirect: "/icon",
    name: "icon",
    // hidden: true,
    children: [
      {
        path: "",
        component: () =>
          import("@/views/iconDemo/iconList").then(m => m.default),
        meta: { title: "图标示例", icon: "form" }
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
