<template>
  <v-form>
    <v-card>
      <v-card-title class="text-center d-block">Kreator quizów</v-card-title>
      <v-card-text>
        <InputImage v-model="quiz.image" class="my-12">
          <div slot="activator">
            <v-img v-ripple v-if="!quiz.image.imageURL" class="grey lighten-3">
              <v-layout justify-center align-center style="height:150px; cursor:pointer">
                <Camera class="icon"></Camera>
                <span>Dodaj zdjęcie</span>
              </v-layout>
            </v-img>
            <v-img v-ripple v-else :src="quiz.image.imageURL">
            </v-img>
          </div>
        </InputImage>
        <InputField
          name="Nazwa quizu"
          type="text"
          outlined
          :validationRules="{ require:true }"
          dense
          v-model="quiz.name"/>
        <v-textarea
          auto-grow
          dense
          clearable
          outlined
          label="Opis quizu"
          rows="1"
          v-model="quiz.description"/>
        <QuestionCreation v-for="(question, index) in quiz.questions" :index=index :key="index" @questionChange="questionChange()"/>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn color="primary" @click="addQuestion()">Dodaj pytanie</v-btn>
          <v-btn color="success" @click="createQuiz()">Utwórz quiz</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import QuizService from '@/api-services/quiz.service'
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import QuestionCreation from '@/components/question/QuestionCreation'
import Camera from 'vue-material-design-icons/Camera'

export default {
  name: 'QuizCreation',
  components: {
    InputField,
    InputImage,
    QuestionCreation,
    Camera
  },
  data () {
    return {
      quiz: {
        name: '',
        description: '',
        questions: [],
        image: {}
      }
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
    addQuestion () {
      this.quiz.questions.push({ name: '' })
    },
    questionChange (question, index) {
      this.quiz.questions[index] = question
    }
  }
}
</script>
