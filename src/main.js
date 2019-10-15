import '@babel/polyfill'
import 'mutationobserver-shim'
import Axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { onSuccess, onError, beforeRequestSuccess, beforeRequestError } from '@/interceptors/jwt'
import VuePageTransition from 'vue-page-transition'
import vuetify from './plugins/vuetify'
import './plugins/icons'
import 'vue-material-design-icons/styles.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, { siteKey: process.env.CAPTCHA_SITE_KEY })
Vue.use(VuePageTransition)

Vue.config.productionTip = process.env.NODE_ENV === 'development'

Axios.defaults.baseURL = process.env.API_URL
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
