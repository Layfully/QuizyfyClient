import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/user'
import Quiz from '@/store/quiz'

Vue.use(Vuex)

const state = {

}

const getters = {

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
    Quiz
  }
})
