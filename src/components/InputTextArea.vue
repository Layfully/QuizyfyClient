<template>
  <ValidationProvider slim :name="name" :rules="validationRules" v-slot="{errors, valid}" :bails="false">
    <v-textarea
    :error-messages="checkIfFocused(errors, isFocused)"
    :error-count="errors.length"
    :success="Object.getOwnPropertyNames(validationRules).length !== 0 ? valid : null"
    :id="name"
    :label="name"
    :name="name"
    :type="type"
    :prepend-icon="icon"
    :append-outer-icon="appendIcon"
    :value="value"
    :outlined="outlined"
    :dense="dense"
    :clearable="clearable"
    :auto-grow="autoGrow"
    :rows="rows"
    :counter="counter"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @click:append-outer="$emit('click-append')"
    @input="$emit('input', $event)"></v-textarea>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputTextArea',
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
    rows: {
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
    },
    outlined: {
      type: Boolean
    },
    dense: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    autoGrow: {
      type: Boolean
    },
    counter: {
      type: Boolean
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
