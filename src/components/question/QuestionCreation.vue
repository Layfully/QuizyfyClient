<template>
  <v-card color="grey lighten-5" class="my-5">
    <v-container>
      <v-row>
        <v-card-title>Pytanie {{ index + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="emitQuestionDeleteEvent()">
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
          v-model="question.text"/>
        <ChoiceCreation
          v-for="(choice, index) in question.choices"
          :index="index"
          :key="index"
          :choice="question.choices[index]"
          @choiceDelete="deleteChoice"/>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" depressed @click="addChoice()">Dodaj odpowiedź</v-btn>
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
  model: { prop: 'question' },
  props: {
    index: {
      type: Number,
      required: true
    },
    question: {
      type: Object,
      required: true
    }
  },
  methods: {
    addChoice () {
      this.question.choices.push({ text: '', isRight: false })
    },
    deleteChoice (index) {
      this.$delete(this.question.choices, index)
    },
    emitQuestionDeleteEvent () {
      this.$emit('questionDelete', this.index)
    }
  }
}
</script>
