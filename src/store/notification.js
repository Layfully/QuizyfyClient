import {
  // when releasing check which one are used and delete
  ADD_ERROR,
  REMOVE_ERROR,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '@/store/mutations'

const state = {
  errors: [],
  notifications: [],
  timeout: 5000
}

const getters = {
  hasErrorNotifications (state) {
    return state.errors.length > 0
  },
  hasNotifications (state) {
    return state.notifications.length > 0
  }
}

const actions = {
  addError ({ commit, state }, error) {
    return new Promise((resolve, reject) => {
      commit(ADD_ERROR, error)

      setTimeout(() => {
        commit(REMOVE_ERROR, error)
        resolve()
      }, state.timeout)
    })
  },
  addNotification ({ commit, state }, notification) {
    return new Promise((resolve, reject) => {
      commit(ADD_NOTIFICATION, notification)

      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, notification)
        resolve()
      }, state.timeout)
    })
  }
}

const mutations = {
  [ADD_ERROR] (state, error) {
    state.errors.push(error)
  },
  [REMOVE_ERROR] (state) {
    state.errors.splice(-1, 1)
  },
  [ADD_NOTIFICATION] (state, notification) {
    state.notifications.push(notification)
  },
  [REMOVE_NOTIFICATION] (state) {
    state.errors.splice(-1, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
