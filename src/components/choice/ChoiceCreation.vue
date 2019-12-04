<template>
  <v-card class="my-2">
    <v-container>
      <v-row>
        <v-card-title class="title">Odpowiedź {{ choiceIndex + 1 }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="ma-4 mb-2" fab dark outlined small color="error" @click="removeChoice({questionIndex, choiceIndex}); $emit('deleted')">
          <v-icon dark>mdi-delete</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-card-text>
      <InputField
        :name="'Treść odpowiedzi ' + (choiceIndex + 1)"
        type="text"
        outlined
        dense
        :validationRules="{ require:true }"
        :value="choice.text"
        @input="setChoice({questionIndex, choiceIndex, text: $event })"/>
      <v-switch
        :value="choice.isCorrect"
        @change="setChoice({questionIndex, choiceIndex, isCorrect: $event })"
        :label="switchLabel"></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
import InputField from '@/components/InputField'
import { mapMutations } from 'vuex'
import { SET_CHOICE, REMOVE_CHOICE } from '@/store/mutations'

export default {
  name: 'ChoiceCreation',
  components: {
    InputField
  },
  props: {
    questionIndex: {
      type: Number,
      required: true
    },
    choiceIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    choice () {
      return this.$store.getters['Quiz/newChoice'](this.questionIndex, this.choiceIndex)
    },
    switchLabel () {
      return this.choice.isCorrect ? 'Odpowiedź poprawna' : 'Odpowiedź niepoprawna'
    }
  },
  methods: {
    ...mapMutations('Quiz', {
      setChoice: SET_CHOICE,
      removeChoice: REMOVE_CHOICE
    })
  }
}
</script>
