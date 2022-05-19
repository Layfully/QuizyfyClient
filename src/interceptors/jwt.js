import axios from 'axios'
import store from '@/store'
import UserService from '@/api-services/user.service'

const onSuccess = (response) => {
  return response
}

const onError = (error) => {
  if (error.response !== undefined) {
    if (error.response.status === 401) {
      const originalRequest = error.config
      if (!originalRequest._retry && error.response.data === 'Token Expired') {
        originalRequest._retry = true
        const refreshToken = store.getters['User/refreshtoken']
        const jwtToken = store.getters['User/accesstoken']

        return UserService.refresh({ jwtToken, refreshToken }).then((response) => {
          store.commit('User/setAccessToken', response.token.access)
          return axios(originalRequest)
        }).catch((error) => {
          store.dispatch('User/logout')
          return Promise.reject(error)
        })
      }
    }
  }
  return Promise.reject(error)
}

const beforeRequestSuccess = (config) => {
  config.headers.Authorization = `Bearer ${store.getters['User/accesstoken']}`
  return config
}

const beforeRequestError = (error) => {
  return Promise.reject(error)
}

export { onSuccess, onError, beforeRequestSuccess, beforeRequestError }
