const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  //路径前缀
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 1888,
    open: true
  },
  configureWebpack:{
    resolve: {
      alias: {
        src: resolve('src')
      }
    },
  }
}
