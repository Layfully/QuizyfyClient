import QuizService from '@/api-services/quiz.service'

import {
  // when releasing check which one are used and delete
  ADD_QUESTION,
  ADD_CHOICE,
  REMOVE_QUESTION,
  REMOVE_CHOICE,
  SET_NEW_QUIZ,
  SET_QUESTION,
  SET_QUIZ_LIST
} from '@/store/mutations'

const state = {
  newQuiz: {
    name: '',
    description: '',
    imageUrl: null,
    questions: []
  }
  quizList: {
    items: {},
    paging: {
      pageSize: 4,
      pageNumber: 1
    }
  }
}

const getters = {
  newQuiz () {
    return state.newQuiz
  },
  newQuestion () {
    return (questionIndex) => {
      return state.newQuiz.questions[questionIndex]
    }
  },
  newChoice () {
    return (questionIndex, choiceIndex) => {
      return state.newQuiz.questions[questionIndex].choices[choiceIndex]
    }
  }
}

const actions = {
  create ({ commit }, quizData) {
    return QuizService.create(quizData).then((data) => {
  getPage ({ commit, state }, pageNumber) {
    return QuizService.getAll(pageNumber, state.quizList.paging.pageSize).then((response) => {
      commit(SET_QUIZ_LIST, response.data)
    })
  }
}

const mutations = {
  [ADD_QUESTION] (state) {
    state.newQuiz.questions.push({
      text: '',
      imageUrl: null,
      choices: []
    })
  },
  [ADD_CHOICE] (state, questionIndex) {
    state.newQuiz.questions[questionIndex].choices.push({
      text: '',
      isCorrect: false
    })
  },
  [REMOVE_QUESTION] (state, questionIndex) {
    state.newQuiz.questions.splice(questionIndex, 1)
  },
  [REMOVE_CHOICE] (state, data) {
    state.newQuiz.questions[data.questionIndex].choices.splice(data.choiceIndex, 1)
  },
  [SET_NEW_QUIZ] (state, data) {
    if ('name' in data) {
      state.newQuiz.name = data.name
    }
    if ('description' in data) {
      state.newQuiz.description = data.description
    }
    if ('imageUrl' in data) {
      state.newQuiz.imageUrl = data.imageUrl
    }
  },
  [SET_QUESTION] (state, data) {
    if ('text' in data) {
      state.newQuiz.questions[data.questionIndex].text = data.text
    }
    if ('imageUrl' in data) {
      state.newQuiz.questions[data.questionIndex].imageUrl = data.imageUrl
    }
  },
  [SET_CHOICE] (state, data) {
    if ('isCorrect' in data) {
      state.newQuiz.questions[data.questionIndex].choices[data.choiceIndex].isCorrect = data.isCorrect
    }
    if ('text' in data) {
      state.newQuiz.questions[data.questionIndex].choices[data.choiceIndex].text = data.text
    }
  [SET_QUIZ_LIST] (state, data) {
    state.quizList = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
