const { defineConfig } = require('@vue/cli-service')
let proxyconfig={};
proxyconfig['/']={
  //websocket
  ws:false,
  //目标地址
  target:'http://localhost:8080',
  //发送请求头中host会设置成target
  changeOrigin:true,
  //不重写请求地址
  pathRewrite: {
    '^/': '/'
  }
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host:'localhost',
    port:90,
    proxy: proxyconfig
  }
})
