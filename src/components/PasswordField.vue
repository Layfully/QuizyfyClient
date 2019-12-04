<template>
  <ValidationProvider slim :name="name" :rules="validationRules" v-slot="{errors, valid}" :bails="false">
      <v-text-field
      :error-messages="checkIfFocused(errors, isFocused)"
      :error-count="errors.length"
      :success="valid"
      :id="name"
      :label="name"
      :name="name"
      :type="type"
      :prepend-icon="icon"
      :value="value"
      :loading="displayStrengthMeter"
      @focus="isFocused = true; displayStrengthMeter = true"
      @blur="isFocused = false; displayStrengthMeter = false"
      @input="$emit('input', $event)">
        <template v-slot:progress >
          <v-progress-linear
            :value="passwordStrength"
            :color="passwordStrengthMeterColor"
            absolute
            height="7"
          ></v-progress-linear>
        </template>
      </v-text-field>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import zxcvbn from 'zxcvbn'

export default {
  name: 'PasswordField',
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
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      isFocused: false,
      displayStrengthMeter: false
    }
  },
  methods: {
    checkIfFocused (errors, focus) {
      return focus ? null : errors
    }
  },
  computed: {
    passwordStrength () {
      return zxcvbn(this.value).score * 25
    },
    passwordStrengthMeterColor () {
      return ['primary', 'secondary', 'error', 'warning', 'success'][this.passwordStrength / 25]
    }
  }
}
</script>
