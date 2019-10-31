import QuizService from '@/api-services/quiz.service'

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
  addQuestion (state) {
    state.newQuiz.questions.push({
      text: '',
      choices: []
    })
  },
  addChoice (state, questionIndex) {
    state.newQuiz.questions[questionIndex].choices.push({
      text: '',
      isCorrect: false
    })
  },
  deleteQuestion (state, questionIndex) {
    state.newQuiz.questions.splice(questionIndex, 1)
  },
  deleteChoice (state, data) {
    state.newQuiz.questions[data.questionIndex].choices.splice(data.choiceIndex, 1)
  },
  updateQuiz (state, data) {
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
  updateQuestion (state, data) {
    if (data.text) {
      state.newQuiz.questions[data.questionIndex].text = data.text
    }
  },
  updateChoice (state, data) {
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
