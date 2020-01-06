/*
 * @Description: 新门户API
 * @Author: guof-d
 * @Date: 2019-7-1
 * @Remark: .vue通过vue原型链调用（组件中使用） .js文件直接import新门户JS-SDK(路由中使用)
 */

import LOPTL from './loptl-jssdk'

/**
 * 是否在新门户页签中显示
 */
let isInNewPortalTab = () => {
  return LOPTL.isInNewPortalTab()
}
/**
 * 打开新页面
 * @param {Object} tab 页签属性
 */
let openNewPage = tab => {
  LOPTL.openNewPage(tab)
}

/**
 * 关闭当前页面
 */
let closeCurrPage = () => {
  LOPTL.closeCurrPage()
}

export default {
  install (Vue, options) {
    Vue.prototype.$LOPTL = LOPTL
    Vue.prototype.$isInNewPortalTab = isInNewPortalTab
    Vue.prototype.$openNewPage = openNewPage
    Vue.prototype.$closeCurrPage = closeCurrPage
  }
}
