/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
let development_config = {
  name: "开发环境",
  host: "xxx.xxx.xxx.xx", // ip
  port: 22, // 端口
  username: "root", // 登录服务器的账号
  password: "xxxxxxx", // 登录服务器的账号
  path: "/xxx/xxx/xxxx/xxx" // 发布至静态服务器的项目路径
};
let test_config = {
  name: "测试环境",
  host: "xxx.xxx.xxx.x", // ip
  port: 22, // 端口
  username: "root", // 登录服务器的账号
  password: "xxxxxxx", // 登录服务器的账号
  path: "/xxx/xxx/xxxx/xxx" // 发布至静态服务器的项目路径
};
let product_config = {
  name: "生产环境",
  host: "xxx.xxx.xxx.x", // ip
  port: 22, // 端口
  username: "root", // 登录服务器的账号
  password: "xxxxxxxx", // 登录服务器的账号
  path: "/xxx/xxx/xxxx/xxx" // 发布至静态服务器的项目路径
};

let configMap = {
  product: product_config,
  test: test_config,
  development: development_config
};

module.exports = configMap[process.env.NODE_ENV];
