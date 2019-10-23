<template>
  <v-card class="my-2">
    <v-container>
      <v-row>
        <v-card-title class="title">Odpowiedź {{ index + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="emitChoiceDeleteEvent()">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-card-text>
      <InputField
      :name="'Treść odpowiedzi ' + (index + 1)"
      type="text"
      outlined
      dense
      :validationRules="{ require:true }"
      v-model="choice.text"/>
      <v-switch v-model="choice.isRight" :label="switchLabel"></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
import InputField from '@/components/InputField'

export default {
  name: 'ChoiceCreation',
  components: {
    InputField
  },
  model: { prop: 'choice' },
  props: {
    index: {
      type: Number,
      required: true
    },
    choice: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitChoiceDeleteEvent () {
      this.$emit('choiceDelete', this.index)
    }
  },
  computed: {
    switchLabel () {
      return this.choice.isRight ? 'Odpowiedź poprawna' : 'Odpowiedź niepoprawna'
    }
  }
}
</script>
