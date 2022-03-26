import Vue from 'vue'
import Vuex from 'vuex'
import VuexHandler from './plugins/vuexHandler'
import User from '@/store/user'
import Quiz from '@/store/quiz'
import Image from '@/store/image'
import Notification from '@/store/notification'

Vue.use(Vuex)

const state = {
  menuItems: [
    {
      title: 'Rejestracja',
      path: { name: 'RegistrationForm' },
      icon: 'mdi-account-plus',
      requireAuth: false
    },
    {
      title: 'Logowanie',
      path: { name: 'LoginForm' },
      icon: 'mdi-login',
      requireAuth: false
    },
    {
      title: 'Wyloguj się',
      path: { name: 'Home' },
      icon: 'mdi-logout',
      requireAuth: true,
      onClick: (event) => store.dispatch('User/logout', null, { root: true })
    },
    {
      title: 'Katalog Quizów',
      path: { name: 'QuizList', params: { pageNumber: 1 } },
      icon: 'mdi-book-multiple',
      requireAuth: false
    }
  ]
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
    VuexHandler
  ]
})

store.handler.onFailure = (result, type, params) => {
  store.dispatch('Notification/addError', { type, result })
} // Remove on success from plugin if not needed
export default store
