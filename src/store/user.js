import UserService from '@/api-services/user.service'
import {
  // when releasing check which one are used and delete
  SET_USER,
  CLEAR_USER,
  SET_LOGGED_IN,
  SET_ACCESS_TOKEN,
  CLEAR_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  CLEAR_REFERSH_TOKEN
} from '@/store/mutations'

const state = {
  loggedin: false,
  user: false,
  tokens: {
    access: null,
    refresh: null
  }
}

const getters = {
  user(state) {
    return state.user
  },
  isAdmin(state) {
    if (state.user) {
      return (typeof state.user.isAdmin !== 'undefined' && state.user.isAdmin)
    }
    return false
  },
  loggedin(state) {
    return state.loggedin
  },
  accesstoken(state) {
    return state.tokens.access
  },
  refreshtoken(state) {
    return state.tokens.refresh
  },
  authentication(state) {
    return state
  }
}

const actions = {
  login({ commit }, payload) {
    return UserService.login(payload.credentials, payload.recaptchaToken).then((response) => {
      setUserData(commit, response.data)
    })
  },
  register({ commit }, payload) {
    return UserService.register(payload.user, payload.recaptchaToken).then((response) => {
      setUserData(commit, response.data)
    })
  },
  confirmEmail({ commit }, data) {
    return UserService.confirmEmail(data.id, data.verificationToken).then((response) => {
      setUserData(commit, response.data)
    })
  },
  changePassword({ commit }, payload) {
    return UserService.changePassword(payload.id, payload.data).then((response) => {
      setUserData(commit, response.data)
    })
  },
  changeEmail({ commit }, payload) {
    return UserService.changeEmail(payload.id, payload.data).then((response) => {
      setUserData(commit, response.data)
    })
  },
  generateEmailChangeToken({ commit }, payload) {
    return UserService.generateEmailChangeToken(payload.id, payload.data, payload.credentials).then((response) => {
      setUserData(commit, response.data)
    })
  },
  generatePasswordResetToken({ commit }, email) {
    return UserService.generatePasswordResetToken(email).then((response) => {
      setUserData(commit, response.data)
    })
  },
  update({ commit }, payload) {
    return UserService.update(payload.id, payload.data, payload.credentials).then((response) => {
      setUserData(commit, response.data)
    })
  },
  delete({ commit }, payload) {
    return UserService.delete(payload.id, payload.credentials).then(() => {
      commit(SET_LOGGED_IN, false)
      commit(SET_USER, false)
      commit(CLEAR_ACCESS_TOKEN, false)
      commit(CLEAR_REFERSH_TOKEN, false)
    })
  },
  logout({ commit }) {
    console.log('test')
    commit(SET_LOGGED_IN, false)
    commit(SET_USER, false)
    commit(CLEAR_ACCESS_TOKEN, false)
    commit(CLEAR_REFERSH_TOKEN, false)
  }
}

const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [CLEAR_USER](state, user) {
    state.user = false
  },
  [SET_ACCESS_TOKEN](state, token) {
    localStorage.setItem('accessToken', token)
    state.tokens.access = token
  },
  [CLEAR_ACCESS_TOKEN](state) {
    localStorage.removeItem('accessToken')
    state.tokens.access = false
  },
  [SET_REFRESH_TOKEN](state, token) {
    localStorage.setItem('refreshToken', token)
    state.tokens.refresh = token
  },
  [CLEAR_REFERSH_TOKEN](state) {
    localStorage.removeItem('refreshToken')
    state.tokens.refresh = false
  },
  [SET_LOGGED_IN](state, status) {
    state.loggedin = status
  }
}

const setUserData = (commit, data) => {
  let user = {}

  user.id = data.id
  user.firstName = data.firstName
  user.lastName = data.lastName
  user.role = data.role
  user.username = data.username
  user.description = data.description

  commit(SET_LOGGED_IN, true)
  commit(SET_USER, user)

  if (data.jwtToken) {
    commit(SET_ACCESS_TOKEN, data.jwtToken)
  }
  if (data.refreshToken) {
    commit(SET_REFRESH_TOKEN, data.refreshToken.token)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
