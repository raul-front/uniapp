import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'

Vue.prototype.config = config

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
