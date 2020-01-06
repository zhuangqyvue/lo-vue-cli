// const target = 'http://192.168.133.152:8090'
const target = 'http://localhost'
module.exports = {
  proxyList: {
    '/api': {
      // 测试环境
      target: target, // 接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        '^/api': '' // 需要rewrite重写的,
      }
    }
  }
}
