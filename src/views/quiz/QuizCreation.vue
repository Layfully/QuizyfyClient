<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, validated, errors }">
      <v-card>
        <v-card-title class="text-center d-block">Kreator quizów</v-card-title>
        <v-card-text>
          <v-form>
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
              @input="setQuiz({description: $event})"
              label="Opis quizu"
              rows="1"/>
            <ValidationProvider slim ref="validator" name="Liczba pytań" rules='minValue:1' v-slot="{errors}">
              <v-fade-transition>
                <v-alert
                  v-show="errors.length >= 1"
                  :dense="true"
                  :colored-border="true"
                  elevation="1"
                  border="right"
                  type="error"
                  dismissible
                  >
                  {{errors[0]}}
                </v-alert>
              </v-fade-transition>
            </ValidationProvider>
            <QuestionCreation
              @deleted="validateQuestionCount()"
              @changeChoiceCount="validateObserver()"
              v-for="(question, index) in quiz.questions"
              :questionIndex="index"
              :key="index"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn @click="addQuestion(); validateQuestionCount();" color="primary" >Dodaj pytanie</v-btn>
            <v-btn @click="createQuiz" :disabled="invalid || !validated" color="success">Utwórz quiz</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
  </ValidationObserver>
</template>
<script>
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import QuestionCreation from '@/components/question/QuestionCreation'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { ADD_QUESTION, SET_QUIZ } from '@/store/mutations'

export default {
  name: 'QuizCreation',
  components: {
    ValidationObserver,
    ValidationProvider,
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
      setQuiz: SET_QUIZ
    }),
    validateQuestionCount () {
      this.$refs.validator.validate(this.quiz.questions.length)
    },
    validateObserver () {
      this.$refs.observer.validate().then((result) => {
        console.log('Observer')
        console.log(result)
      })
    },
    createQuiz () {
      this.create(this.quiz)
      /**
       * @todo Implement error handling for createQuiz here.
       *
       */
    },
    uploadImage (image) {
      this.upload(image).then((response) => {
        this.setQuiz(response.data)
      })
    }
  }
}
</script>
