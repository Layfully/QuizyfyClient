import UserService from '@/api-services/user.service'

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
  login ({ commit }, credentials) {
    return UserService.login(credentials).then((data) => {
      setUserData(commit, data)
    })
  },
  register ({ commit }, user) {
    return UserService.register(user).then((data) => {
      setUserData(commit, data)
    })
  },
  confirmEmail ({ commit }, data) {
    return UserService.confirmEmail(data.id, data.token).then((data) => {
      setUserData(commit, data)
    })
  },
  changePassword ({ commit }, id, user) {
    return UserService.changePasssword(id, user).then((data) => {
      setUserData(commit, data)
    })
  },
  generatePasswordResetToken ({ commit }, email) {
    return UserService.generatePasswordResetToken(email).then((data) => {
      setUserData(commit, data)
    })
  },
  logout ({ commit }) {
    commit('setLoggedIn', false)
    commit('setUser', false)
    commit('clearAccessToken', false)
    commit('clearRefreshToken', false)
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  clearUser (state, user) {
    state.user = false
  },
  setAccessToken (state, token) {
    localStorage.setItem('accessToken', token)
    state.tokens.access = token
  },
  clearAccessToken (state) {
    localStorage.removeItem('accessToken')
    state.tokens.access = false
  },
  setRefreshToken (state, token) {
    localStorage.setItem('refreshToken', token)
    state.tokens.refresh = token
  },
  clearRefreshToken (state) {
    localStorage.removeItem('refreshToken')
    state.tokens.refresh = false
  },
  setLoggedIn (state, status) {
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
