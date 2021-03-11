/*
 * @Descripttion: 统一的本地存储
 * @Author: pujianguo
 * @Date: 2021-03-11 09:34:30
 */
const TOKEN = 'token'
const USERINFO = 'userinfo'
const UUID = 'uuid'

const setStorage = (key, value) => {
  try {
    uni.setStorageSync(key, value)
  } catch (e) {}
}
const getStorage = (key) => {
  try {
    return uni.getStorageSync(key)
  } catch (e) {
    return ''
  }
}
const rmStorage = (key) => {
  try {
    uni.removeStorageSync(key)
  } catch (e) {}
}
const clearStorage = () => {
  try {
    uni.clearStorageSync()
  } catch (e) {}
}

export default {
  // token
  setToken: value => setStorage(TOKEN, value),
  getToken: () => getStorage(TOKEN),
  rmToken: () => rmStorage(TOKEN),

  // uuid
  setUuid: value => setStorage(UUID, value),
  getUuid: () => getStorage(UUID),
  rmUuid: () => rmStorage(UUID),

  // userinfo
  setUserInfo: value => setStorage(USERINFO, value),
  getUserInfo: () => getStorage(USERINFO),
  rmUserInfo: () => rmStorage(USERINFO),

  // clear all
  clearStorage: () => clearStorage,
}
