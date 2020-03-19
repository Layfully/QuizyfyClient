import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VuePageTransition from 'vue-page-transition'
import vuetify from './plugins/vuetify'
import Axios from './plugins/axios'
import './plugins/icons'
import 'vue-material-design-icons/styles.css'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import 'nprogress/nprogress.css'

Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_CAPTCHA_SITE_KEY })
Vue.use(VuePageTransition)

Vue.config.productionTip = process.env.NODE_ENV === 'development'

Vue.prototype.$http = Axios
Vue.prototype.$eventBus = new Vue() // todo: remove


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  vuetify,
  components: { App }
})
