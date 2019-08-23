<template>
    <div>
      <b-form-group
          :key="index"
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          :label= "'Odp '+ (index + 1)"
          for="name">
          <b-col :md="5" class="center">
              <b-input v-model="choice.text" v-on:change="choiceChange" maxlength="60" required />
              <b-form-checkbox v-on:change="choiceChange" v-model="choice.isRight">Właściwa</b-form-checkbox>
          </b-col>
      </b-form-group>
    </div>
</template>

<script>
export default {
  name: 'ChoiceCreate',
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
    choiceChange () {
      this.$emit('choiceChange', this.choice, this.index)
    }
  }
}
</script>

<style>

</style>
