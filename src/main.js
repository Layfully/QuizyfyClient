import '@babel/polyfill'
import 'mutationobserver-shim'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faHeart, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import { onSuccess, onError, beforeRequestSuccess, beforeRequestError } from '@/interceptors/jwt'

library.add(faLock)
library.add(faHeart)
library.add(faUserPlus)
library.add(faUser)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Axios.defaults.baseURL = 'https://localhost:5001/api'
Axios.interceptors.request.use(beforeRequestSuccess, beforeRequestError)
Axios.interceptors.response.use(onSuccess, onError)

Vue.prototype.$http = Axios

const jwtToken = localStorage.getItem('access_token')

if (jwtToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = jwtToken
}

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
