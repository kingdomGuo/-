const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProduction = process.env.NODE_DEV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // baseUrl: "./",
  assetsDir: "static",
  lintOnSave: true,
  publicPath: "./",
  productionSourceMap: false,
  parallel: require("os").cpus.length > 1,
  css: {
    extract: true, // 分离插件
    sourceMap: false,
    modules: false
    // loaderOptions: {
    //   sass: {
    //     prependData: `@import "~@/common/css/index.scss"`
    //   }
    // }
  },
  // webpack配置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets"))
      .set("@common", resolve("src/common"))
      .set("@components", resolve("src/components"))
      .set("@pages", resolve("src/pages"))
      .set("@store", resolve("src/store"))
      .set("@sass", resolve("src/common/css"));
    if (isProduction) {
      // 压缩图片
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          bypassOnDebug: true
        })
        .end();
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minisize(true);
      config.optimization.splitChunks({
        chunks: "all"
      });
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new UglifyJsPlugin({
          compress: {
            drop_debugger: true,
            drop_console: true
          },
          sourceMap: false,
          parallel: true // 多进程并行来提高构建速度
        })
      );
    }
  }
};
