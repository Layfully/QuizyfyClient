import ImageService from '@/api-services/image.service'

const state = {

}

const getters = {

}

const actions = {
  upload ({ commit }, image) {
    return ImageService.create(image).then((response) => {
      return response.data
    })
  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
