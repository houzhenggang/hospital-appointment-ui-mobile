import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/router/axios'
import vueAxios from 'vue-axios'
import 'animate.css'
import vant from 'vant'
import 'vant/lib/index.css'

Vue.use(vueAxios, axios)
Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
