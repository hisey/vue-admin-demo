// const autoprefixer = require("autoprefixer");
const path = require("path");
const WebpackBar = require("webpackbar");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// const pxtorem = require("postcss-pxtorem");
module.exports = {
  publicPath: process.env.NODE_ENV == "development" ? "/" : "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    disableHostCheck: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://10.220.202.26:53000/api", //开发
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    // modules: false,
    loaderOptions: {
      css: {
        modules: true
      },
      scss: {
        // 全局变量
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: {
    plugins:[
      new WebpackBar()
    ],
    //警告 webpack 的性能提示
    performance: {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
