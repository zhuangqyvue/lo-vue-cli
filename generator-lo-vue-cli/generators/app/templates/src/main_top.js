// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './assets/iconfont/iconfont.css'
import axiosPlugin from './api'
import utils from './assets/utils'
import 'babel-polyfill'
import collectUtils from './collect/collectUtils'
import newPortal from '@/assets/newPortalApi'
import './units/dialogDrag'
Vue.use(newPortal)

Vue.config.productionTip = false

Vue.use(axiosPlugin)

Vue.use(ElementUI)

Vue.use(utils)

Vue.use(collectUtils)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
