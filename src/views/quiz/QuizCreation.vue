<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, validated }">
    <v-stepper v-model="stepTracker">
      <v-stepper-header>
        <v-stepper-step :complete="stepTracker > 1" editable step="1">Wprowadzanie danych o quizie</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepTracker > 2" step="2">Wprowadzanie pytań</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <ValidationObserver v-slot="{invalid, validated}">
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
                  <InputTextArea
                    name="Opis quizu"
                    type="text"
                    outlined
                    dense
                    clearable
                    auto-grow
                    counter
                    :validationRules="{ require:true }"
                    :value="quiz.description"
                    @input="setQuiz({description: $event})"
                    />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-center>
                  <v-btn @click="stepTracker=2" :disabled="invalid || !validated" color="primary">Kontynuuj</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-window v-model="questionWindowTracker">
            <ValidationProvider slim ref="validator" name="Liczba pytań" rules='minValue:1' v-slot="{errors}">
                <v-fade-transition>
                  <v-alert
                    v-show="errors.length >= 1"
                    :dense="true"
                    :colored-border="true"
                    elevation="1"
                    border="right"
                    type="error"
                    >
                    {{errors[0]}}
                  </v-alert>
                </v-fade-transition>
              <v-window-item eager v-for="(question, index) in quiz.questions" :key="index">
                <QuestionCreation
                  @deleted="validateQuestionCount();"
                  @changeChoiceCount="validateObserver()"
                  :questionIndex="index"
                  :key="index"/>
              </v-window-item>
            </ValidationProvider>
          </v-window>
          <v-card flat tile>
            <v-card-actions class="flex-column">
              <v-row class="justify-space-between flex-nowrap">
                <v-btn text @click="previousQuestion">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-item-group mandatory v-model="questionWindowTracker" class="text-center">
                  <v-item v-for="(question, index) in quiz.questions" :key="index" v-slot:default="{ active, toggle }">
                    <v-btn icon :input-value="active" @click="toggle">
                      {{ index + 1}}
                    </v-btn>
                  </v-item>
                </v-item-group>
                <v-btn text @click="nextQuestion">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
              <v-row fluid class="justify-center mt-3" style="width:100%">
                <v-btn @click="addQuestion(); validateQuestionCount(); lastQuestion();" color="primary mx-2" style="width:20%">Dodaj pytanie</v-btn>
                <v-btn @click="createQuiz" :disabled="invalid || !validated" color="success" style="width:20%">Utwórz quiz</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <RecaptchaInfo/>
      </v-stepper-items>
    </v-stepper>
  </ValidationObserver>
</template>
<script>
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import InputTextArea from '@/components/InputTextArea'
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
    InputTextArea,
    QuestionCreation
  },
  data () {
    return {
      stepTracker: 1,
      questionWindowTracker: 0
    }
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
      this.$refs.observer.validate()
    },
    nextQuestion () {
      this.questionWindowTracker = this.questionWindowTracker + 1 === this.quiz.questions.length ? 0 : this.questionWindowTracker + 1
    },
    previousQuestion () {
      this.questionWindowTracker = this.questionWindowTracker - 1 < 0 ? this.quiz.questions.length - 1 : this.questionWindowTracker - 1
    },
    lastQuestion () {
      this.questionWindowTracker = this.quiz.questions.length - 1
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
