import ImageService from '@/api-services/image.service'

const state = {

}

const getters = {

}

const actions = {
  upload ({ commit }, image) {
    if (image) {
      return ImageService.create(image)
    }
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
