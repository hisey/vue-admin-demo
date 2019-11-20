// import Cookies from 'js-cookie'

// const TokenKey = 'isLogin'

// let store = require('store')
import store from "store";

export function getUserInfo() {
  return store.get("user");
}

export function setUserInfo(userInfo) {
  return store.set("user", userInfo);
}

export function removeUserInfo() {
  return store.remove("user");
}

export function getSideBar() {
  return store.get("sideBar");
}

export function setSideBar(sideBar) {
  return store.set("sideBar", sideBar);
}

export function removeSideBar() {
  return store.remove("sideBar");
}
