import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// let accountList = import("@/views/urgeIncome/accountList").then(m => m.default);
// let closedAccountList = import("@/views/urgeIncome/closedAccountList").then(
// m => m.default
// );
export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index").then(m => m.default),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404").then(m => m.default),
    hidden: true
  },

  {
    path: "",
    component: Layout,
    redirect: "/login",
    name: "home",
    // hidden: true,
    // children: [
    //   {
    //     path: "",
    //     component: () => import("@/views/home/index").then(m => m.default),
    //     meta: { title: "首页", icon: "home" }
    //   }
    // ]
  },
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
