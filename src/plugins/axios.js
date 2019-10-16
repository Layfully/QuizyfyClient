import Axios from 'axios'
import { onSuccess, onError, beforeRequestSuccess, beforeRequestError } from '@/interceptors/jwt'

Axios.defaults.baseURL = process.env.VUE_APP_API_URL
Axios.interceptors.request.use(beforeRequestSuccess, beforeRequestError)
Axios.interceptors.response.use(onSuccess, onError)
const jwtToken = localStorage.getItem('access_token')

if (jwtToken) {
  Axios.defaults.headers.common['Authorization'] = jwtToken
}

export default Axios
