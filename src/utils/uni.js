/*
 * @Descripttion: API Promise转化
 * @Author: pujianguo
 * @Date: 2021-03-11 09:48:27
 */

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
