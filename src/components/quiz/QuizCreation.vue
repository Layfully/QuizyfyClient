<template>
  <b-container fluid>
    <div class="form-wrapper">
      <b-form @submit.prevent="createQuiz" enctype="multipart/form-data">
        <b-form-group
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          label="Nazwa quizu"
          for="name">
          <b-col :md="5" class="center">
            <b-input
              id="name"
              v-model="quiz.name"
              maxlength="60"
              required />
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          label="Opis"
          for="description">
          <b-col :md="5" class="center">
            <b-form-textarea
              v-model="quiz.description"
              id="description"
              placeholder="Opis..."
              rows="3"
              max-rows="8"
              required
            ></b-form-textarea>
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          label="Thumbnail:"
          for="Image">
          <b-col :md="5" class="center">
              <b-form-file
                id="image"
                accept=".jpg, .png, .gif"
                v-model="image"
                :state="Boolean(file)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                required
              ></b-form-file>
          </b-col>
        </b-form-group>

        <b-col
          :md="5"
          class="center flex-center"
          v-if="!this.shouldStartQuestionCreation"
          offset="4">
          <b-button
            v-on:click.once="startQuestionCreation"
            variant="info">Dodaj pytania</b-button>
          <b-button
            :to="{ name: 'OwnerList' }"
            variant="danger">Anuluj</b-button>
        </b-col>
        <div v-if="this.shouldStartQuestionCreation">
          <template v-for="(question, index) in quiz.questions">
            <QuestionCreate :index=index :key="index" @questionChange='applyChangedQuestion'/>
          </template>
          <b-col
            :md="5"
            class="center flex-center"
            offset="4">
            <b-button @click="addNewQuestion" variant="info">Dodaj kolejne pytanie</b-button>
            <b-button @click="createQuiz" variant="success">Utwórz quiz</b-button>
          </b-col>
        </div>
      </b-form>
    </div>
  </b-container>
</template>
<script>
import QuizService from '@/api-services/quiz.service'
import QuestionCreate from '../question/QuestionCreate.vue'

export default {
  name: 'QuizCreation',
  components: {
    'QuestionCreate': QuestionCreate
  },
  data () {
    return {
      quiz: {
        name: '',
        description: '',
        questions: []
      },
      image: '',
      shouldStartQuestionCreation: false
    }
  },
  methods: {
    createQuiz () {
      QuizService.create(this.quiz, this.image).then(() => {
        this.quiz = {
          name: '',
          description: '',
          questions: ''
        }
        this.image = ''
        this.shouldStartQuestionCreation = false
      }).catch((error) => {
        alert(error)
      })
    },
    startQuestionCreation () {
      this.shouldStartQuestionCreation = true
      this.addNewQuestion()
    },
    addNewQuestion () {
      this.quiz.questions.push({ name: '' })
    },
    applyChangedQuestion (question, index) {
      this.quiz.questions[index] = question
    }
  }
}
</script>
<style>
.form-wrapper {
  margin-top: 20px;
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}

.form-row{
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.center{
  margin: 0 auto;
}

.flex-center{
  display: flex;
  justify-content: center;
}
</style>
