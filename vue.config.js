const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: '81',
    sockHost: 'localhost',
    disableHostCheck: true,
    open: true,
    host: "localhost",
    proxy: {
      '/api': {
        target: 'http://10.0.88.161/api/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

  },
  chainWebpack: config => {
    //路径配置
    config.resolve.alias
        .set('assets', resolve('src/assets'))
        .set('styles', resolve('src/assets/styles'))
},

  //输出打包文件目录
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist'
  // lintOnSave: false // 取消 eslint 验证
}
