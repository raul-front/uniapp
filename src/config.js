/*
 * @Descripttion: 配置文件
 * @Author: pujianguo
 * @Date: 2021-03-11 09:23:36
 */
const ENV = process.env.VUE_APP_TITLE === 'pre'
  ? 'pre'
  : process.env.VUE_APP_TITLE === 'test'
    ? 'test'
    : process.env.NODE_ENV === 'production' ? 'release' : 'dev'

// 开发版
const dev = {
  env: 'dev',
  baseUrl: 'https://dev-api.ekeguan.com',
  debug: true,
}
// 测试版
const test = {
  env: 'test',
  baseUrl: 'https://test-api.ekeguan.com',
  debug: true,
}
// 预上线版
const pre = {
  env: 'pre',
  baseUrl: 'https://pre-api.ekeguan.com',
  debug: true,
}
// 正式版
const release = {
  env: 'release',
  baseUrl: 'https://api.ekeguan.com',
  debug: false,
}

const common = {
  loginPath: '/pages/login/login',
}

let config = {}
if (ENV === 'release') {
  config = Object.assign({}, common, release)
} else if (ENV === 'pre') {
  config = Object.assign({}, common, pre)
} else if (ENV === 'test') {
  config = Object.assign({}, common, test)
} else {
  config = Object.assign({}, common, dev)
}

export default config
