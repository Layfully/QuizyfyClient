import '@babel/polyfill'
import 'mutationobserver-shim'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faHeart, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { onSuccess, onError, beforeRequestSuccess, beforeRequestError } from '@/interceptors/jwt'
import VuePageTransition from 'vue-page-transition'
import vuetify from './plugins/vuetify'
import 'vue-material-design-icons/styles.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { siteKey: '6LeZgrgUAAAAACAeeUO1yZhMWqO30BgcBppjPnz4' })
Vue.use(VuePageTransition)

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

Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  vuetify,
  components: { App }
})
