/*
 * @Description:埋点专业网络请求
 * @Author: guanal
 * @Date: 2019-06-24 15:57:30
 * @LastEditTime: 2019-06-24 16:24:00
 * @LastEditors: guanal
 */

/* eslint-disable */
import axios from 'axios'

// 反向代理url
const BASE_URL = {
  development: '/api',
  production: window.BASE_PATH === undefined ? '/ofs' : window.BASE_PATH
}
const instance = axios.create()
instance.withCredentials = true
// 设置请求默认参数
instance.defaults.timeout = 10000
instance.defaults.baseURL = BASE_URL[process.env.NODE_ENV]
// 请求拦截
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    console.log(error)
    // 提示请求超时
    // showTimeout()
    return error
  }
)

// 响应拦截
instance.interceptors.response.use(response => {
  if (response.data.success) {
    return response.data
  } else {
    console.log(response.data.errMsg)
  }
})

// 导出默认的实例
export default instance
