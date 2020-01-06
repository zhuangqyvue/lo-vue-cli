/* eslint-disable */
import axios from 'axios'
import store from '../store/index'
import { MessageBox } from 'element-ui'

// 请求状态码
const STATUS_CODE = {
  400: '无效的请求',
  401: '未授权',
  404: '获取的资源不存在',
  500: '出现错误，请联系管理员',
  408: '请求超时！',
  10002: '获取UserId失败：未找到claim 值'
}

// 反向代理url
const BASE_URL = {
  development: '/api',
  production: window.BASE_PATH === undefined ? '/ofs' : window.BASE_PATH
}
const instance = axios.create()

instance.defaults.baseURL = BASE_URL[process.env.NODE_ENV]
// 请求拦截
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  error => {
    // 提示请求超时
    showTimeout()
    return error
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data
    } else {
      if (
        response.data.errCode !== 0 &&
        response.config.headers['NO-ERRORMSG'] !== '1'
      ) {
        showYeWuErrorMsg(response.data)
      }
      return response.data
    }
  },
  error => {
    // 弹出错误信息
    if (error.config.headers['NO-ERRORMSG'] !== '1') {
      showErrorMsg(error)
    }
    return Promise.reject(
      new Error(
        JSON.stringify({
          message: error.message,
          status: error.response.data.errCode,
          url: error.request.responseURL
        })
      )
    )
  }
)
/**
 * 状态码为200的返回业务错误
 * @param error
 */
function showYeWuErrorMsg(data) {
  MessageBox.alert(data.errMsg, '业务异常', {
    type: 'info'
  })
}
/**
 * 弹出错误信息
 * @param error [Object] 请求错误对象
 */
function showErrorMsg(error) {
  let errorCode = error.response.data.errCode || error.response.status
  MessageBox.alert(
    error.response.data.errMsg + '！',
    STATUS_CODE[errorCode] || '错误',
    {
      type: 'error'
    }
  )
}
/**
 * 弹出请求超时
 */
function showTimeout() {
  MessageBox.alert('请求超时', '请求超时', {
    type: 'warning '
  })
}
// 导出默认的实例
export default instance
