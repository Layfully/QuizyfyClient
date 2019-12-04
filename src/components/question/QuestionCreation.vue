<template>
  <v-card color="grey lighten-5" class="my-5">
    <v-container>
      <v-row>
        <v-card-title>Pytanie {{ questionIndex + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="removeQuestion(questionIndex); $emit('deleted')">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-card-text>
      <InputImage
        name="Obraz pytania"
        :validationRules="{ dimensions: [512, 512], image:true }"
        alertElevation="1"
        alertType="error"
        alertBorderLocation="right"
        :alertColoredBorder=true
        :alertDense=true
        :value="question.imageUrl"
        @input="uploadImage($event)"
        class="mb-7">
      </InputImage>
      <InputField
        name="Treść pytania"
        type="text"
        outlined
        dense
        :validationRules="{ require:true }"
        :value="question.text"
        @input="setQuestion({questionIndex, text: $event })"/>
        <ValidationProvider slim :ref="'question' + questionIndex" :name="'Liczba odpowiedzi do pytania ' + ( questionIndex + 1 )" rules='minValue:1' v-slot="{errors}">
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
      <ChoiceCreation
        @deleted="validateChoiceCount()"
        v-for="(choice, choiceIndex) in question.choices"
        :choiceIndex="choiceIndex"
        :questionIndex="questionIndex"
        :key="choiceIndex"/>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" depressed @click="addChoice(questionIndex); validateChoiceCount();">Dodaj odpowiedź</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import ChoiceCreation from '@/components/choice/ChoiceCreation'
import { ValidationProvider } from 'vee-validate'
import { mapActions, mapMutations } from 'vuex'
import { ADD_CHOICE, REMOVE_QUESTION, SET_QUESTION } from '@/store/mutations'

export default {
  name: 'QuestionCreation',
  components: {
    InputField,
    InputImage,
    ValidationProvider,
    ChoiceCreation
  },
  props: {
    questionIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    question () {
      return this.$store.getters['Quiz/newQuestion'](this.questionIndex)
    }
  },
  methods: {
    ...mapActions({
      upload: 'Image/upload'
    }),
    ...mapMutations('Quiz', {
      addChoice: ADD_CHOICE,
      setQuestion: SET_QUESTION,
      removeQuestion: REMOVE_QUESTION
    }),
    validateChoiceCount () {
      let ref = 'question' + this.questionIndex
      this.$refs[ref].validate(this.question.choices.length)
    },
    uploadImage (image) {
      this.upload(image).then((response) => {
        response.data.questionIndex = this.questionIndex
        this.setQuestion(response.data)
      })
    }
  }
}
</script>
