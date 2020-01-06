/*
 * @Description: 埋点接口
 * @Author: guanal
 * @Date: 2019-06-18 10:15:51
 * @LastEditTime: 2019-06-24 16:05:22
 * @LastEditors: guanal
 */

import http from '../collect/axiosAdvanced'

/**
 * @description: 上传埋点数据
 * @param {type}
 * @return: 详情
 */
let collectPoint = (BusinessId, ModuleEx) => {
  let param = JSON.stringify({
    'BusinessCode': BusinessId,
    'ModuleEx': ModuleEx
  })
  return http.post(
    `/Collect/Collect/CreateCollectBizInfo`, param
  )
}
export {
  collectPoint
}
