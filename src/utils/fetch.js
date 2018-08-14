//引入axios
import axios from 'axios'
import qs from 'qs'
import {
  MessageBox,
  Message
} from 'element-ui'
import {
  removeToken
} from '@/utils/auth'
import { basicUrl } from '@/utils/env'
import { removeUserInfo, removeSideBar } from '@/utils/auth' // 验权

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  // console.log("request:"+JSON(config));
  // console.log(config.url)
  if (config.url.indexOf("syncManual") > -1) {
    config.timeout = 300000
  }
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  const res = response.data;
  // console.log(res);
  if (res.code == '-1001') {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      removeUserInfo();
      removeSideBar();
      location.reload();
      // return Promise.reject(res)
    })
    return Promise.reject(res)
  } else if (res.code != '-1001' && res.code != 1) {
    Message({
      message: res.errorMsg,
      type: 'error'
    });
    return Promise.reject(res)
  } else {
    return Promise.resolve(res)
    // return Promise.reject(res)

    // return res;
  }
}, err => {
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  // Message.err(err.message)
  Message({
    message: "接口：" + err.response.config.url + ";" + err.message,
    type: "error",
    duration: 3000
  });
  return Promise.reject(err.response)
})

// let basicUrl = ""
// if (process.env.NODE_ENV == "development") {
//   basicUrl = "http://localhost:9999"
// } else {
//   basicUrl = "http://193.112.202.42:9999"
// }
axios.defaults.baseURL = basicUrl
//设置默认请求头
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// }
axios.defaults.timeout = 10000

axios.defaults.withCredentials = true

export default {
  //get请求
  get(url, data) {
    return axios.get(url, {
      params: data
    })
  },
  //post请求
  post(url, data) {
    return axios.post(url, data)
  }
}
