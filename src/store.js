import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/user'
import Quiz from '@/store/quiz'
import Image from '@/store/image'

Vue.use(Vuex)

const state = {
  menuItems: [
    {
      title: 'Rejestracja',
      path: { name: 'RegistrationForm' },
      icon: 'mdi-face',
      requireAuth: false
    },
    {
      title: 'Logowanie',
      path: { name: 'LoginForm' },
      icon: 'mdi-lock-open',
      requireAuth: false
    },
    {
      title: 'Wyloguj się',
      path: { name: 'Home' },
      icon: 'mdi-logout',
      requireAuth: true
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

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    User,
    Quiz,
    Image
  }
})
