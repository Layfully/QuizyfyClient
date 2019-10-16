<template>
    <ValidationProvider :name="name" :rules="validationRules" v-slot="{errors, valid}" :bails="false">
        <v-text-field
        :error-messages="checkIfFocused(errors, isFocused)"
        :error-count="errors.length"
        :success="valid"
        :id="name"
        :label="name"
        :name="name"
        :type="type"
        :prepend-icon="icon"
        :append-outer-icon="appendIcon"
        :value="value"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @click:append-outer="$emit('click-append')"
        @input="$emit('input', $event)"></v-text-field>
    </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputField',
  components: {
    ValidationProvider
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    value: {
      required: true
    },
    validationRules: {
      type: Object,
      required: true
    },
    appendIcon: {
      type: String
    }
  },
  data () {
    return {
      isFocused: false
    }
  },
  methods: {
    checkIfFocused (errors, focus) {
      return focus ? null : errors
    }
  }
}
</script>
