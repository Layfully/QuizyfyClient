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
      <InputImage
        name="Obraz quizu"
        :validationRules="{ dimensions: [512, 512], image:true }"
        alertElevation="1"
        alertType="error"
        borderLocation="right"
        :alertColoredBorder=true
        :alertDense=true
        v-model="question.image"
        class="mb-7">
        <v-layout justify-center>
          <v-flex md4>
            <v-card>
                <v-img v-ripple v-if="!question.image.imageURL" class="grey lighten-3" style="height:100px;">
                  <v-layout justify-center align-center style="height:100px; cursor:pointer">
                    <Camera class="icon"></Camera>
                    <span>Dodaj zdjęcie pomocnicze</span>
                  </v-layout>
                </v-img>
                <v-img v-ripple v-else :src="question.image.imageURL">
                </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </InputImage>
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
import InputImage from '@/components/InputImage'
import ChoiceCreation from '@/components/choice/ChoiceCreation'
import Camera from 'vue-material-design-icons/Camera'

export default {
  name: 'QuestionCreation',
  components: {
    InputField,
    InputImage,
    Camera,
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
