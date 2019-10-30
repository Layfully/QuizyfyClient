import Axios from '@/plugins/axios'

const RESOURCE_NAME = '/images'

export default {
  create (image) {
    return Axios.post(RESOURCE_NAME, image.formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
