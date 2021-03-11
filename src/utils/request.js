/*
 * @Descripttion: 接口请求方法定义
 * @Author: pujianguo
 * @Date: 2021-03-11 09:33:56
 */

import config from '../config'
import storage from './storage'
import { showRequestLoading, hideRequestLoading, showRequestError, checkTokenToLogin } from './func'

// const httpRequest = function ({ url, method, data, loading, showErrorInfo = true, version = 'v1',needAuth = true, }) {
/**
 * 请求接口方法
 * @param {Object} params 参数对象，可结构为以下参数
 * @param {String} url 接口地址
 * @param {String} method http方法
 * @param {Object} data 请求参数
 * @param {Boolean|String} loading Boolean：是否展示加载框；String：加载框展示内容
 * @param {Boolean} showErrorInfo 是否展示错误提示，默认展示
 * @param {String} version 接口版本
 * @param {Boolean} needAuth 是否需要校验token，默认需要
 * @return {Promise} Promise对象
 */
const httpRequest = function (params) {
  const { url, method, data, loading, showErrorInfo, version, needAuth } = Object.assign({
    showErrorInfo: true,
    version: 'v1',
    needAuth: true,
  }, params)

  let header = {}
  if (version === 'v1') {
    header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      PROJECTID: 2,
      SOURCE: 215,
    }
  } else if (version === 'v2') {
    header = {
      'Content-Type': 'application/json;',
      businessId: 2,
    }
  }
  if (needAuth) {
    const token = storage.getToken()
    if (!token) {
      checkTokenToLogin()
      return Promise.reject(new Error('未登陆'))
    } else {
      header.token = token
      if (version === 'v1') {
        header.UUID = storage.getUuid()
      }
    }
  }
  loading && showRequestLoading(loading)
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: res => {
        if (res.statusCode >= 400) {
          const msg = getResponseError(res)
          showErrorInfo && showRequestError(msg)
          reject(msg)
        } else {
          if (res.data.code === 1 || res.data.code === '1') {
            resolve(res.data.data)
          } else {
            showErrorInfo && showRequestError(res.data.msg)
            reject(res.data.msg)
          }
        }
      },
      fail: e => reject(e),
      complete: () => {
        loading && hideRequestLoading()
      },
    })
  })
}

const getResponseError = res => {
  let msg = ''
  switch (res.statusCode) {
    case 400:
      msg = res.data.msg
      break
    case 401:
      storage.rmToken()
      checkTokenToLogin()
      return
    default:
      if (res.data) {
        msg = res.data.msg ? res.data.msg : res.data
      } else {
        msg = '网络连接异常'
      }
      break
  }
  return msg
}

/** ******************** http请求相关 ******************** **/
export const _publicGet = function (url, data = {}, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'GET', needAuth: false })
}
export const _get = function (url, data = {}, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'GET' })
}
export const _publicPost = function (url, data, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'POST', needAuth: false })
}

export const _post = function (url, data = {}, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'POST' })
}
export const _put = function (url, data = {}, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'PUT' })
}
export const _delete = function (url, data = {}, loading = true, showErrorInfo = true, version = 'v2') {
  url = `${config.baseUrl}/${url}`
  return httpRequest({ url, data, loading, showErrorInfo, version, method: 'DELETE' })
}
