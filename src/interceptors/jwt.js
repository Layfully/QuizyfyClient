import axios from 'axios'
import store from '@/store'
import UserService from '@/api-services/user.service'

const onSuccess = (response) => {
  return response
}

const onError = (error) => {
  console.log(error)
  switch (error.response.status) {
    case 401:
      const originalRequest = error.config
      if (!originalRequest._retry && error.response.data === 'Token Expired') {
        originalRequest._retry = true
        const refreshToken = store.getters['authentication/refreshtoken']
        const jwtToken = store.getters['authentication/accesstoken']
        return UserService.refresh({ jwtToken, refreshToken }).then((response) => {
          store.commit('authentication/setAccessToken', response.token.access)
          return axios(originalRequest)
        }).catch((error) => {
          store.dispatch('authentication/logout')
          return Promise.reject(error)
        })
      }
      break
    default:
      break
  }
  return Promise.reject(error)
}

const beforeRequestSuccess = (config) => {
  config.headers.Authorization = `Bearer ${store.getters['authentication/accesstoken']}`
  return config
}

const beforeRequestError = (error) => {
  return Promise.reject(error)
}

export { onSuccess, onError, beforeRequestSuccess, beforeRequestError }
