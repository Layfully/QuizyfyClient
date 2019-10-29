import QuizService from '@/api-services/quiz.service'

const state = {

}

const getters = {

}

const actions = {
  create ({ commit }, quizData, quizImage) {
    return QuizService.create(quizData, quizImage).then((data) => {
    /**
    * @todo inform user about result of this operation and set state if needed.
    */
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
