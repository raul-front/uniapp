/*
 * @Descripttion: vuex
 * @Author: pujianguo
 * @Date: 2021-03-11 19:02:48
 */

import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'

const modules = {}
const requireModules = require.context('./modules/', true, /\.js$/)
requireModules.keys().forEach(name => {
  const module = requireModules(name).default
  const moduleName = name.replace(/^\.\//, '').replace(/\.\w+$/, '')
  modules[moduleName] = module
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    ...modules,
  },
  strict: config.debug,
})

export default store
