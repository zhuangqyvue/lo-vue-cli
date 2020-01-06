/*
 * @Description: 新门户通信JS-SDK
 * @Author: guof-d
 * @Date: 2019-8-21
 */

/**
 * 是否在新门户页签中显示
 */
let isInNewPortalTab = () => {
  return self !== top
}
/**
 * 监听(仅初始化时调用一次)
 */
let listen = callback => {
  window.addEventListener('message', function (event) {
    if (typeof callback === 'function') {
      // 消息
      let data = event.data || {}
      // source – 来源窗口的id | message – 操作 | data – 数据
      callback(data.message, data.data)
    }
  })
}
/**
 * 初始化当前页面标识
 */
let init = id => {
  if (isInNewPortalTab()) {
    window.parent.postMessage({ id: id }, '*')
  }
}
/**
 * 打开新页面
 * @param {Object} tab 页签属性
 */
let openNewPage = tab => {
  // 无效页签
  if (Object.prototype.toString.call(tab) !== '[object Object]') {
    console.error('无效的新页面参数.')
    return 0
  }
  // 缺少参数
  if (!tab.title || !tab.url) {
    console.error('新页面缺少参数.')
    return 0
  }
  // 在新门户页签内显示
  if (isInNewPortalTab()) {
    window.parent.postMessage(tab, '*')
  }
  // 单独窗口显示
  if (!isInNewPortalTab()) {
    window.open(tab.url, tab.name)
  }
}
/**
 * 关闭当前页面
 */
let closeCurrPage = () => {
  // 在新门户页签内显示
  if (isInNewPortalTab()) {
    window.parent.postMessage('close', '*')
    return 0
  }
  // 单独窗口显示
  if (!isInNewPortalTab()) {
    window.close()
  }
}
/**
 * 刷新目标窗口
 */
let refresh = (to, data) => {
  let msg = {
    to: to,
    message: 'refresh',
    data: data
  }
  if (isInNewPortalTab()) {
    window.parent.postMessage(msg, '*')
  }
}
/**
 * 关闭当前页面并且刷新目标窗口
 * @param {Array} to 目标窗口集合
 * @param {Object} data 数据
 */
let refreshAndCloseTab = (to, data) => {
  let msg = [
    {
      to: to,
      message: 'refresh',
      data: data
    },
    {
      to: ['portal'],
      message: 'close',
      data: {}
    }
  ]
  if (isInNewPortalTab()) {
    window.parent.postMessage(msg, '*')
  } else {
    window.close()
  }
}
/**
 * 门户提示消息
 */
let showMessage = param => {
  if (!param) {
    return false
  }
  let msg = {
    to: ['portal'],
    message: 'showMessage',
    data: param
  }
  if (isInNewPortalTab()) {
    window.parent.postMessage(msg, '*')
  } else {
    alert(param.message)
  }
}
/**
 * 门户便签消息
 */
let showNotive = param => {
  if (!param) {
    return false
  }
  let msg = {
    to: ['portal'],
    message: 'showNotive',
    data: param
  }
  if (isInNewPortalTab()) {
    window.parent.postMessage(msg, '*')
  } else {
    alert(param.message)
  }
}
/**
 * 自定义通信事件
 * @param {Array} to 目标窗口集合
 * @param {String} message 操作方法
 * @param {Object} data 数据
 */
let send = (to, message, data) => {
  let msg = {
    to: to,
    message: message,
    data: data
  }
  if (isInNewPortalTab()) {
    window.parent.postMessage(msg, '*')
  }
}
/**
 * 多个消息通信事件
 * @param {Array} msgList 消息集合
 */
let sendMore = msgList => {
  if (isInNewPortalTab()) {
    window.parent.postMessage(msgList, '*')
  }
}

export default {
  isInNewPortalTab,
  init,
  listen,
  openNewPage,
  closeCurrPage,
  showMessage,
  showNotive,
  send,
  sendMore,
  refreshAndCloseTab,
  refresh
}
