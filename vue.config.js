const autoprefixer = require("autoprefixer");
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
        target: "http://192.168.1.240:53000/api", //开发
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  },
  css: {
    requireModuleExtension:false,
    loaderOptions: {
      css: {
        modules: true,
        // localIdentName: "localIdentName: '[local]_[hash:base64:8]'",
        // camelCase: "only",
      },
      scss: {
        // 全局变量
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: {
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
  }
};
