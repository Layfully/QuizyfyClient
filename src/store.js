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
      icon: 'Face',
      requireAuth: false
    },
    {
      title: 'Logowanie',
      path: { name: 'LoginForm' },
      icon: 'LockOpen',
      requireAuth: false
    },
    {
      title: 'Wyloguj się',
      path: { name: 'Home' },
      icon: 'Logout',
      requireAuth: true
    },
    {
      title: 'Katalog Quizów',
      path: { name: 'QuizList', params: { pageNumber: 1 } },
      icon: 'BookMultiple',
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
