<template>
  <v-card color="grey lighten-5" class="my-5">
    <v-container>
      <v-row>
        <v-card-title>Pytanie {{ questionIndex + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="removeQuestion(questionIndex)">
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
        borderLocation="right"
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
      <ChoiceCreation
        v-for="(choice, choiceIndex) in question.choices"
        :choiceIndex="choiceIndex"
        :questionIndex="questionIndex"
        :key="choiceIndex"/>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" depressed @click="addChoice(questionIndex)">Dodaj odpowiedź</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import InputField from '@/components/InputField'
import InputImage from '@/components/InputImage'
import ChoiceCreation from '@/components/choice/ChoiceCreation'
import { mapActions, mapMutations } from 'vuex'
import { ADD_CHOICE, REMOVE_QUESTION, SET_QUESTION } from '@/store/mutations'

export default {
  name: 'QuestionCreation',
  components: {
    InputField,
    InputImage,
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
    uploadImage (image) {
      this.upload(image).then((response) => {
        response.data.questionIndex = this.questionIndex
        this.setQuestion(response.data)
      })
    }
  }
}
</script>
