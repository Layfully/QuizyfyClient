import QuizService from '@/api-services/quiz.service'

import {
  // when releasing check which one are used and delete
  ADD_QUESTION,
  ADD_CHOICE,
  REMOVE_QUESTION,
  REMOVE_CHOICE,
  SET_NEW_QUIZ,
  SET_QUESTION,
  SET_CHOICE,
  SET_CURRENT_QUIZ,
  SET_ANSWER_QUIZ_ID,
  SET_ANSWER,
  RESET_ANSWER,
  SET_QUIZ_LIST
} from '@/store/mutations'

const state = {
  newQuiz: {
    name: '',
    description: '',
    imageUrl: null,
    questions: [
      {
        text: '',
        image: null,
        choices: []
      }
    ]
  },
  quizAnswer: {
    quizId: -1,
    answers: {}
  },
  currentQuiz: {
  },
  quizList: {
    items: {},
    paging: {
      pageSize: 4,
      pageNumber: 1
    }
  }
}

const getters = {
  newQuestion (state) {
    return (questionIndex) => {
      return state.newQuiz.questions[questionIndex]
    }
  },
  newChoice (state) {
    return (questionIndex, choiceIndex) => {
      return state.newQuiz.questions[questionIndex].choices[choiceIndex]
    }
  }
}

const actions = {
  create ({ commit, dispatch }, quizData) {
    return QuizService.create(quizData).then((data) => {
      const action = 'Notification/addNotification'
      dispatch(action, { message: 'Quiz successfully created' }, { root: true })
    })
  },
  get ({ commit }, config) {
    return QuizService.get(config).then(response => {
      commit(SET_CURRENT_QUIZ, response.data)
    })
  },
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
  },
  [SET_CURRENT_QUIZ] (state, data) {
    state.currentQuiz = data
  },
  [SET_ANSWER_QUIZ_ID] (state, data) {
    state.quizAnswer.quizId = data.id
  },
  [SET_ANSWER] (state, data) {
    state.quizAnswer.answers[data.questionId] = data.choiceId
  },
  [RESET_ANSWER] (state) {
    state.quizAnswer.quizId = -1
    state.quizAnswer.answers = {}
  },
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
