<template>
  <div>
    <InputField
    :name="'Treść odpowiedzi ' + (index + 1)"
    type="text"
    outlined
    dense
    :validationRules="{ require:true }"
    v-model="choice.text"/>
    <v-switch v-model="choice.isRight" :label="switchLabel" @change="emitChoiceChangeEvent"></v-switch>
  </div>
</template>

<script>
import InputField from '@/components/InputField'

export default {
  name: 'ChoiceCreation',
  components: {
    InputField
  },
  props: { index: { required: true } },
  data () {
    return {
      choice: {
        text: '',
        isRight: false
      }
    }
  },
  methods: {
    emitChoiceChangeEvent () {
      this.$emit('choiceChange', this.choice, this.index)
    }
  },
  computed: {
    switchLabel () {
      return this.choice.isRight ? 'Odpowiedź poprawna' : 'Odpowiedź niepoprawna'
    }
  }
}
</script>

<style>

</style>
