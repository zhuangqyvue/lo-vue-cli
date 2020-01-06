import {
  collectPoint
} from '../CollectPoint.api'

/**
 * @description: 埋点接口
 * @param {type} id,ex 埋点id和埋点描述信息
 * @return:
 */
const setCollect = (id, Ex) => {
  // console.log('全局埋点')
  collectPoint(id, Ex).then(res => {})
}

let common = {}

common.install = function (Vue, options) {
  Vue.prototype.$setCollectPoint = setCollect
}

export default common
