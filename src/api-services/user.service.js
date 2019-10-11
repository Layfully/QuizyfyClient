import Axios from 'axios'

const RESOURCE_NAME = '/users'

export default {
  getAll (pageNumber, pageSize) {
    return Axios.get(RESOURCE_NAME.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`))
  },

  get (id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`)
  },
  register (userData, token) {
    userData.recaptchaToken = token
    userData.role = 'user'
    return Axios.post(RESOURCE_NAME.concat('/register'), userData)
  },
  login (userData, token) {
    userData.recaptchaToken = token
    return Axios.post(RESOURCE_NAME.concat('/login'), userData)
  },
  confirmEmail (id, token) {
    return Axios.patch(RESOURCE_NAME.concat(`/emailVerification/${id}`), token)
  },
  changePassword (id, userData) {
    return Axios.patch(RESOURCE_NAME.concat(`/passwordRecovery/${id}`), userData)
  },
  generatePasswordResetToken (email) {
    return Axios.patch(RESOURCE_NAME.concat(`/recoveryTokenGeneration`), email)
  },
  update (id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data)
  },
  delete (id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`)
  }
}
