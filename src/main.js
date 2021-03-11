import Vue from 'vue'
import App from './App'
import config from './config'
import globalComponent from './components/common/global'

Vue.prototype.config = config
Vue.use(globalComponent)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
