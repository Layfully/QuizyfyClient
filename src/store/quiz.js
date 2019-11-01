import QuizService from '@/api-services/quiz.service'
import {
  ADD_QUESTION,
  ADD_CHOICE,
  REMOVE_QUESTION,
  REMOVE_CHOICE,
  SET_QUIZ,
  SET_QUESTION,
  SET_CHOICE
} from '@/store/mutations'

const state = {
  newQuiz: {
    name: 'Nowy quiz',
    description: 'Opis quizu',
    image: {},
    questions: []
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
    /**
    * @todo inform user about result of this operation and set state if needed.
    */
    })
  }
}

const mutations = {
  [ADD_QUESTION] (state) {
    state.newQuiz.questions.push({
      text: '',
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
  [SET_QUIZ] (state, data) {
    if (data.name) {
      state.newQuiz.name = data.name
    }
    if (data.description) {
      state.newQuiz.description = data.description
    }
    if (data.image) {
      state.newQuiz.image = data.image
    }
  },
  [SET_QUESTION] (state, data) {
    if (data.text) {
      state.newQuiz.questions[data.questionIndex].text = data.text
    }
  },
  [SET_CHOICE] (state, data) {
    if (data.isCorrect) {
      state.newQuiz.questions[data.questionIndex].choices[data.choiceIndex].isCorrect = data.isCorrect
    }
    if (data.text) {
      state.newQuiz.questions[data.questionIndex].choices[data.choiceIndex].text = data.text
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
