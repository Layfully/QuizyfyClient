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
          alertBorderLocation="right"
          :alertColoredBorder="true"
          :alertDense="true"
          :value="quiz.imageUrl"
          @input="uploadImage($event)"
          class="my-12">
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
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { ADD_QUESTION, SET_QUIZ } from '@/store/mutations'

export default {
  name: 'QuizCreation',
  components: {
    InputField,
    InputImage,
    QuestionCreation
  },
  computed: {
    ...mapGetters('Quiz', {
      quiz: 'newQuiz'
    })
  },
  methods: {
    ...mapActions({
      create: 'Quiz/create',
      upload: 'Image/upload'
    }),
    ...mapMutations('Quiz', {
      addQuestion: ADD_QUESTION,
      setQuizImage: SET_QUIZ
    }),
    createQuiz () {
      this.create(this.quiz)
      /**
       * @todo Implement error handling for createQuiz here.
       *
       */
    },
    uploadImage (image) {
      this.upload(image).then((response) => {
        this.setQuizImage(response.data)
      })
    }
  }
}
</script>
