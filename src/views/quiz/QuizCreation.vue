<template>
  <v-form>
    <v-card>
      <v-card-title class="text-center d-block">Kreator quizów</v-card-title>
      <v-card-text>
        <InputImage
          :value="quiz.image"
          @input="setQuiz({image: $event})"
          class="my-12">
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
          :value="quiz.name"
          @input="setQuiz({name: $event})"
          dense/>
        <v-textarea
          auto-grow
          dense
          clearable
          outlined
          :value="quiz.description"
          @input="updateQuiz({description: $event})"
          label="Opis quizu"
          rows="1"/>
        <QuestionCreation
          v-for="(question, index) in quiz.questions"
          :questionIndex="index"
          :key="index"/>
      </v-card-text>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn color="primary" @click="addQuestion">Dodaj pytanie</v-btn>
          <v-btn color="success" @click="createQuiz">Utwórz quiz</v-btn>
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
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { ADD_QUESTION, SET_QUIZ } from '@/store/mutations'

export default {
  name: 'QuizCreation',
  components: {
    InputField,
    InputImage,
    QuestionCreation,
    Camera
  },
  computed: {
    ...mapGetters('Quiz', {
      quiz: 'newQuiz'
    })
  },
  methods: {
    ...mapActions('Quiz', {
      create: 'create'
    }),
    ...mapMutations('Quiz', {
      addQuestion: ADD_QUESTION,
      setQuiz: SET_QUIZ
    }),

    createQuiz () {
      this.create(this.quiz)
      /**
       * @todo Implement error handling for createQuiz here.
       */
    }
  }
}
</script>
