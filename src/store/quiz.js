import QuizService from '@/api-services/quiz.service'

const state = {

}

const getters = {

}

const actions = {
  create ({ commit }, quizData, quizImage) {
    return QuizService.create(quizData, quizImage).then((data) => {
      console.log('created new quiz')
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