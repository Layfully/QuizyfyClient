import Axios from '@/plugins/axios'

const RESOURCE_NAME = '/users'

export default {
  getAll (pageNumber, pageSize) {
    return Axios.get(RESOURCE_NAME.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`))
  },

  get (id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`)
  },
  register (userData, recaptchaToken) {
    userData.recaptchaToken = recaptchaToken
    userData.role = 'user'
    return Axios.post(RESOURCE_NAME.concat('/register'), userData)
  },
  login (userData, recaptchaToken) {
    userData.recaptchaToken = recaptchaToken
    return Axios.post(RESOURCE_NAME.concat('/login'), userData)
  },
  confirmEmail (id, verificationToken) {
    return Axios.patch(RESOURCE_NAME.concat(`/emailVerification/${id}`), { 'token': verificationToken })
  },
  changePassword (id, data) {
    return Axios.patch(RESOURCE_NAME.concat(`/passwordRecovery/${id}`), data)
  },
  generatePasswordResetToken (email) {
    return Axios.patch(RESOURCE_NAME.concat(`/recoveryTokenGeneration`), { 'email': email })
  },
  update (id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data)
  },
  delete (id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`)
  }
}
