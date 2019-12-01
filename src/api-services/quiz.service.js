import Axios from '@/plugins/axios'

const RESOURCE_NAME = '/quizzes'

export default {
  getAll (pageNumber, pageSize) {
    return Axios.get(RESOURCE_NAME.concat(`?PageNumber=${pageNumber}&PageSize=${pageSize}`))
  },

  get (id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`)
  },

  create (quizData) {
  //  const json = JSON.stringify(quizData)
  //  const formData = new FormData()
  //  formData.append('json', json)
  //  formData.append('image', image)

    return Axios.post(RESOURCE_NAME, quizData//, {
      // headers: {
      //  accept: 'application/json',
      //  'Content-Type': 'multipart/form-data'
      // }
      // }
    )
  },

  update (id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data)
  },

  delete (id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`)
  }
}
