import Axios from '@/plugins/axios'

const RESOURCE_NAME = '/users'

function generateBasicAuthToken(credentials) {
  return 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
}

export default {
  getAll(pageNumber, pageSize) {
    return Axios.get(RESOURCE_NAME.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`))
  },
  get(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`)
  },
  register(userData, recaptchaToken) {
    userData.recaptchaToken = recaptchaToken
    userData.role = 'user'
    return Axios.post(RESOURCE_NAME.concat('/register'), userData)
  },
  login(userData, recaptchaToken) {
    userData.recaptchaToken = recaptchaToken
    return Axios.post(RESOURCE_NAME.concat('/login'), userData)
  },
  confirmEmail(id, verificationToken) {
    return Axios.patch(RESOURCE_NAME.concat(`/emailVerification/${id}`), { 'token': verificationToken })
  },
  changePassword(id, data) {
    return Axios.patch(RESOURCE_NAME.concat(`/passwordRecovery/${id}`), data)
  },
  changeEmail(id, data) {
    return Axios.patch(RESOURCE_NAME.concat(`/changeEmail/${id}`), data)
  },
  generatePasswordResetToken(email) {
    return Axios.patch(RESOURCE_NAME.concat(`/recoveryTokenGeneration`), { 'email': email })
  },
  generateEmailChangeToken(id, data, credentials) {
    return Axios.patch(RESOURCE_NAME.concat(`/emailChangeTokenGeneration/${id}`), data, { headers: { 'X-Authorization': generateBasicAuthToken(credentials) } })
  },
  update(id, data, credentials) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data, { headers: { 'X-Authorization': generateBasicAuthToken(credentials) } })
  },
  delete(id, credentials) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`, { headers: { 'X-Authorization': generateBasicAuthToken(credentials) } })
  }
}
