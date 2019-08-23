<template>
<div>
  <b-form-group
      :key="index"
      :label-cols="2"
      label-size="lg"
      breakpoint="md"
      horizontal
      :label= "'Pytanie ' + (index + 1)"
      for="name">
      <b-col :md="5" class="center">
          <b-input id="name" v-model="question.text" maxlength="60" v-on:change="questionChange" required />
          <template v-for="(choice, index) in question.choices">
            <ChoiceCreate :index=index :key="index" @choiceChange="applyChoiceChange"/>
          </template>
      </b-col>
  </b-form-group>
  <b-col :md="5" class="center flex-center" offset="4">
    <b-button v-on:click="addChoice" variant="warning">Dodaj odpowiedź</b-button>
  </b-col>
</div>
</template>

<script>
import ChoiceCreate from '../choice/ChoiceCreate.vue'

export default {
  name: 'QuestionCreate',
  components: {
    'ChoiceCreate': ChoiceCreate
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
    questionChange () {
      this.$emit('questionChange', this.question, this.index)
    },
    applyChoiceChange (choice, index) {
      this.question.choices[index] = choice
    }
  }
}
</script>

<style>

</style>
