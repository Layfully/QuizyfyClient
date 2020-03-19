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
  user () {
    return state.user
  },
  isAdmin () {
    if (state.user) {
      return (typeof state.user.isAdmin !== 'undefined' && state.user.isAdmin)
    }
    return false
  },
  loggedin () {
    return state.loggedin
  },
  accesstoken () {
    return state.tokens.access
  },
  refreshtoken () {
    return state.tokens.refresh
  },
  authentication () {
    return state
  }
}

const actions = {
  login ({ commit }, credentials, recaptchaToken) {
    return UserService.login(credentials, recaptchaToken).then((response) => {
      setUserData(commit, response.data)
    }).then(() => this.$router.push({ name: 'Home' }))
  },
  register ({ commit }, user, recaptchaToken) {
    return UserService.register(user, recaptchaToken).then((response) => {
      setUserData(commit, response.data)
    }).then(() => this.$router.push({ name: 'LoginForm' }))
  },
  confirmEmail ({ commit }, data) {
    return UserService.confirmEmail(data.id, data.verificationToken).then((response) => {
      setUserData(commit, response.data)
    }).then(() => this.$router.push({ name: 'Home' }))
  },
  changePassword ({ commit }, id, user) {
    return UserService.changePasssword(id, user).then((response) => {
      setUserData(commit, response.data)
    }).then(() => this.$router.push({ name: 'LoginForm' }))
  },
  generatePasswordResetToken ({ commit }, email) {
    return UserService.generatePasswordResetToken(email).then((response) => {
      setUserData(commit, response.data)
    })
  },
  logout ({ commit }) {
    commit(SET_LOGGED_IN, false)
    commit(SET_USER, false)
    commit(CLEAR_ACCESS_TOKEN, false)
    commit(CLEAR_REFERSH_TOKEN, false)
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  },
  [CLEAR_USER] (state, user) {
    state.user = false
  },
  [SET_ACCESS_TOKEN] (state, token) {
    localStorage.setItem('accessToken', token)
    state.tokens.access = token
  },
  [CLEAR_ACCESS_TOKEN] (state) {
    localStorage.removeItem('accessToken')
    state.tokens.access = false
  },
  [SET_REFRESH_TOKEN] (state, token) {
    localStorage.setItem('refreshToken', token)
    state.tokens.refresh = token
  },
  [CLEAR_REFERSH_TOKEN] (state) {
    localStorage.removeItem('refreshToken')
    state.tokens.refresh = false
  },
  [SET_LOGGED_IN] (state, status) {
    state.loggedin = status
  }
}

const setUserData = (commit, data) => {
  let user = {}

  user.firstName = data.data.firstName
  user.lastName = data.data.lastName
  user.role = data.data.role
  user.username = data.data.username

  commit('setLoggedIn', true)
  commit('setUser', user)
  commit('setAccessToken', data.data.jwtToken)
  commit('setRefreshToken', data.data.refreshToken.token)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
