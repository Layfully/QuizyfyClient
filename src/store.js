import Vue from 'vue'
import Vuex from 'vuex'
import VuexHandler from './plugins/vuexHandler'
import User from '@/store/user'
import Quiz from '@/store/quiz'
import Image from '@/store/image'
import Notification from '@/store/notification'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const state = {
}

const getters = {
  menuItems () {
    return state.menuItems
  }
}

const actions = {
}

const mutations = {
}

const persistentStorage = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    User,
    Quiz,
    Image,
    Notification
  },
  plugins: [
    persistentStorage.plugin,
    VuexHandler,
  ]
})

store.handler.onFailure = (result, type, params) => {
  store.dispatch('Notification/addError', { type, result })
} // Remove on success from plugin if not needed
export default store
