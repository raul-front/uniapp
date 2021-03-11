import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'
import globalComponent from './components/common/global'

Vue.prototype.config = config
Vue.prototype.$store = store
Vue.use(globalComponent)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App,
})
app.$mount()
