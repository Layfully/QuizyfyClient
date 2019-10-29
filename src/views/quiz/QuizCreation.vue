<template>
  <v-form>
    <v-card>
      <v-card-title class="text-center d-block">Kreator quizów</v-card-title>
      <v-card-text>
        <InputImage
          name="Obraz quizu"
          :validationRules="{ dimensions: [256, 256], image:true, require:true }"
          alertElevation="1"
          alertType="error"
          borderLocation="right"
          :alertColoredBorder=true
          :alertDense=true
          v-model="quizImage"
          class="my-12">
          <v-layout justify-center>
            <v-flex md5>
              <v-card>
                <div>
                  <v-img v-ripple v-if="!quizImage.imageURL" class="grey lighten-3" style="height:150px;">
                    <v-layout justify-center align-center style="height:150px; cursor:pointer">
                      <Camera class="icon"></Camera>
                      <span>Dodaj zdjęcie</span>
                    </v-layout>
                  </v-img>
                  <v-img v-ripple v-else :src="quizImage.imageURL">
                  </v-img>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
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
        <QuestionCreation
          v-for="(question, index) in quiz.questions"
          :index="index"
          :key="index"
          :question="quiz.questions[index]"
          @questionDelete="deleteQuestion"/>
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
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import QuestionCreation from '@/components/question/QuestionCreation'
import Camera from 'vue-material-design-icons/Camera'
import { mapActions } from 'vuex'

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
        questions: []
      },
      quizImage: {}
    }
  },
  methods: {
    ...mapActions({
      create: 'Quiz/create'
    }),
    createQuiz () {
      this.create(this.quiz, this.quizImage).then(() => {
        this.quiz = {
          name: '',
          description: '',
          questions: []
        }
        this.quizImage = {}
      }).catch((error) => {
        alert(error)
      })
    },
    addQuestion () {
      this.quiz.questions.push({ text: '', choices: [], image: {} })
    },
    deleteQuestion (index) {
      this.$delete(this.quiz.questions, index)
    }
  }
}
</script>
