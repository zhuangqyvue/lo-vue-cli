import Vue from 'vue'
import Router from 'vue-router'
// import Identification from '../utils/Identification'

Vue.use(Router)

const routes = [
  {
    path: '/ledger/:formCode/:formId',
    name: 'ledger',
    tagName: '台账页面',
    component: resolve => require(['@/views'], resolve)
  } 
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/') {
    // 判断是否进入
    next()
  } else {
    // 判断是否进入
    // let redirectPara = getQueryString(window.location.search, 'redirect_route')
    if (window.location.search) {
      let redirectPara = getQueryString(
        window.location.search,
        'redirect_route'
      )
      let routerUrl = decodeURIComponent(redirectPara)
      next({
        path: routerUrl
      })
    } else {
      next()
    }
  }
})

// 解析参数
function getQueryString (url, val) {
  let reg = new RegExp('(^|&)' + val + '=([^&]*)(&|$)')
  let r = url.split('?')[1].match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export default router
