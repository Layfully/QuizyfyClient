<template>
  <v-card color="grey lighten-5" class="my-5">
    <v-container>
      <v-row>
        <v-card-title>Pytanie {{ questionIndex + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="deleteQuestion(questionIndex)">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-card-text>
        <InputField
          name="Treść pytania"
          type="text"
          outlined
          dense
          :validationRules="{ require:true }"
          :value="question.text"
          @input="updateQuestion({questionIndex, text: $event })"/>
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
import ChoiceCreation from '@/components/choice/ChoiceCreation'
import { mapMutations } from 'vuex'

export default {
  name: 'QuestionCreation',
  components: {
    InputField,
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
    ...mapMutations('Quiz', {
      updateQuestion: 'updateQuestion',
      deleteQuestion: 'deleteQuestion',
      addChoice: 'addChoice'
    })
  }
}
</script>
