/*
 * @Descripttion: API Promise转化
 * @Author: pujianguo
 * @Date: 2021-03-11 09:48:27
 */
import storage from '@/utils/storage'
import config from '@/config'
import { showToastSuccess, showToastError } from '@/utils/func'

/** ********************** 获取登录code，不需要授权 ************************/
export const uniLogin = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}

/** ********************** 获取用户个人信息 ************************/
export const uniGetUserInfo = () => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      withCredentials: true,
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}

/** ********************** 获取用户授权信息 ************************/
export const uniGetSetting = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      withCredentials: true,
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}

/** ********************** 上传文件 ************************/
export const uniUploadFile = (url, filePath, loading, type = 'image', formData = null) => {
  const token = storage.getToken()
  // TODO:
  // if (!token) {
  //   uni.redirectTo({ url: '/pages/index/index' })
  //   return Promise.reject(new Error('未登陆'))
  // }
  const header = {
    'content-type': 'multipart/form-data',
    Token: token,
  }
  loading && uni.showLoading({ title: '上传中' })
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: config.baseUrl + url,
      filePath: filePath,
      header: header,
      name: type,
      formData: formData,
      success: res => {
        if (res.statusCode < 400) {
          res = JSON.parse(res.data)
          loading && showToastSuccess('上传成功')
          resolve(res)
        } else {
          try {
            const obj = JSON.parse(res.data)
            const msg = obj.message ? obj.message : ''
            loading && showToastError('上传失败：' + msg)
            reject(msg)
          } catch (e) {
            loading && showToastError('上传失败：未知错误')
            reject(res.data)
          }
        }
      },
      fail: err => {
        loading && showToastError('上传失败！')
        reject(err)
      },
      complete: () => {
        loading && uni.hideLoading()
      },
    })
  })
}
