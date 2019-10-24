<template>
  <v-card class="my-5">
    <v-card-title>
      Pytanie {{index + 1}}
    </v-card-title>
    <v-card-text>
        <InputField
          name="Treść pytania"
          type="text"
          outlined
          dense
          :validationRules="{ require:true }"
          @change="emitQuestionChangeEvent()"
          v-model="question.text"/>
        <ChoiceCreation v-for="(choice, index) in question.choices" :index=index :key=index @choiceChange="choiceChange()"/>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="addChoice()">Dodaj odpowiedź</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import InputField from '@/components/InputField'
import ChoiceCreation from '@/components/choice/ChoiceCreation'

export default {
  name: 'QuestionCreation',
  components: {
    InputField,
    ChoiceCreation
  },
  props: { index: { required: true } },
  data () {
    return {
      question: {
        text: '',
        choices: []
      }
    }
  },
  methods: {
    addChoice () {
      this.question.choices.push({ text: '', isRight: false })
    },
    emitQuestionChangeEvent () {
      this.$emit('questionChange', this.question, this.index)
    },
    choiceChange (choice, index) {
      this.question.choices[index] = choice
    }
  }
}
</script>
