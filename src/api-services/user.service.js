import Axios from 'axios'

const RESOURCE_NAME = '/users'

export default {
  getAll (pageNumber, pageSize) {
    return Axios.get(RESOURCE_NAME.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`))
  },

  get (id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`)
  },
  register (userData) {
    return Axios.post(RESOURCE_NAME.concat('/register'), userData)
  },
  login (userData) {
    return Axios.post(RESOURCE_NAME.concat('/login'), userData)
  },

  update (id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data)
  },

  delete (id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`)
  }
}
