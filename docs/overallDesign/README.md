
## 需求概述
部目前是基于门店系统的模块进行操作，但是由于原版不是按照他们需求定制，在获取字段的时候效率比较低（新增字段）
不利于权限控制，兼有业务模块的权限（新增角色，经理）
模式不同，目前的团队是以一个订单号作为一个数据单元进行，而系统这是以账单进行
后续对于权限、、的需求还有深入的规划
 独立系统建议：
平台账单一直没有独立的系统支持，目前核心系统和普惠系统都带着的功能，造成了数据显示分散
与业务在同一个系统的话，会造成迭代绑定，和相互影响
权限会更加的复杂
需求针对用户：
部门（不同组织架构）
门店的业务员

## 软件结构
<img src="./img/soft.png">

## 核心功能流程图
<img src="./img/process.png">

## 设计模式
**mvvm** </br>
<img src="./img/mvvm.png">

## 目录结构
``` bash
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  .travis.yml
│  app.js
│  favicon.ico
│  gulpfile.js
│  index.html
│  LICENSE
│  package.json
│  README.md
│  sftpConfig.js
│
├─build                        # 构建脚本
│      build.js
│      check-versions.js
│      logo.png
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config                      # 相关构建配置
│      dev.env.js
│      index.js
│      prod.env.js
│
├─icon                        # README.md里面的图标.
│      add.png
│      bable.png
│      element.png
│      es6.png
│      vue.png
│      webpack.png
│
├─src                        # 源码路径
│  │  App.vue                # 入口vue文件
│  │  main.js                # 入口js 文件
│  │  permission.js          # 权限文件
│  │
│  ├─api                     # api管理
│  │      login.js
│  │      user.js
│  │
│  ├─assets                  # 静态文件（会被打包）
│  │  ├─404_images
│  │  │      404.png
│  │  │      404_cloud.png
│  │  │
│  │  └─images               
│  │          login-bg.jpg
│  │
│  ├─components              # 项目ui组件
│  │  ├─Breadcrumb
│  │  │      index.vue
│  │  │
│  │  ├─Hamburger
│  │  │      index.vue
│  │  │
│  │  └─SvgIcon
│  │          index.vue
│  │
│  ├─filters              # 全局过滤器
│  │      index.js
│  │
│  ├─icons                # 项目所使用的图标
│  │  │  index.js
│  │  │
│  │  └─svg
│  │          example.svg
│  │          eye.svg
│  │          form.svg
│  │          home.svg
│  │          password.svg
│  │          role.svg
│  │          table.svg
│  │          tree.svg
│  │          urgeIncome.svg
│  │          user.svg
│  │          users.svg
│  │
│  ├─router               # 路由配置
│  │      index.js
│  │
│  ├─store                # store配置
│  │  │  getters.js
│  │  │  index.js
│  │  │
│  │  └─modules
│  │          app.js
│  │          user.js
│  │
│  ├─styles              # 全局样式
│  │      element-ui.scss
│  │      index.scss
│  │      mixin.scss
│  │      sidebar.scss
│  │      transition.scss
│  │      variables.scss
│  │
│  ├─utils              # 所需工具集
│  │      auth.js
│  │      env.js
│  │      fetch.js
│  │      index.js
│  │      validate.js
│  │
│  └─views               # 页面文件
│      │  404.vue
│      │
│      ├─division        # 管理       
│      │      assignRecord.vue
│      │      caseAttr.vue
│      │      outsourced.vue
│      │      phoneUrge.vue
│      │
│      ├─foreignVisits   # 管理
│      │      allCase.vue
│      │      pendingCase.vue
│      │
│      ├─home            # 首页
│      │      index.vue
│      │
│      ├─iconDemo        # 示例demo
│      │      iconList.vue
│      │
│      ├─layout          # 所需的layout
│      │  │  Layout.vue
│      │  │
│      │  ├─components
│      │  │  │  AppMain.vue
│      │  │  │  index.js
│      │  │  │  Navbar.vue
│      │  │  │
│      │  │  └─Sidebar
│      │  │          index.vue
│      │  │          SidebarItem.vue
│      │  │
│      │  └─mixin
│      │          ResizeHandler.js
│      │
│      ├─login           # 登录
│      │      index.vue
│      │
│      ├─outsourced      # 管理
│      │      allCase.vue
│      │      pendingCase.vue
│      │
│      ├─systeMmanage    # 系统管理
│      │      allUser.vue
│      │      collectionGroup.vue
│      │      entrustCompany.vue
│      │
│      └─urgeIncome     # 管理
│              overdue.vue
│
└─static                # 静态文件（不需要打包）
        .gitkeep
```

## 构建步骤

``` bash

# Clone project
git clone http://code.demovip.com/demo/collection-html.git

# Install dependencies
npm install

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 技术栈

[vue](https://cn.vuejs.org/) + [bable](http://babeljs.io/) + [webpack](http://webpack.github.io/) + [es6](http://es6.ruanyifeng.com/)

<img src="./img/icon/vue.png" width="70">
<img src="./img/icon/add.png" width="30">
<img src="./img/icon/bable.png" width="70">
<img src="./img/icon/add.png" width="30">
<img src="./img/icon/webpack.png" width="70">
<img src="./img/icon/add.png" width="30">
<img src="./img/icon/es6.png" width="70">

## ui组件库

[elementUI](http://element.eleme.io/#/zh-CN)<br>
<img width="70" src="./img/icon/element.png"> 

 
