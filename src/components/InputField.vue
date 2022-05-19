<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors, valid }"
    slim
    :name="name"
    :rules="validationRules"
    :bails="false"
  >
    <v-text-field
      :id="name"
      :error-messages="checkIfFocused(errors, isFocused)"
      :error-count="checkIfFocused(errors, isFocused).length"
      :success="Object.getOwnPropertyNames(validationRules).length !== 0 ? valid : null"
      :label="name"
      :name="name"
      :type="type"
      :prepend-icon="icon"
      :append-outer-icon="appendIcon"
      :value="value"
      :outlined="outlined"
      :dense="dense"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @click:append-outer="$emit('click-append')"
      @input="$emit('input', $event)"
    />
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "InputField",
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
    validationRules: {
      type: Object,
      required: true,
    },
    appendIcon: {
      type: String,
      default: "",
    },
    outlined: {
      type: Boolean,
    },
    dense: {
      type: Boolean,
    },
    additionalErrors: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    checkIfFocused(errors, focus) {
      return focus ? [] : errors.concat(this.additionalErrors);
    },
    reset() {
      this.$refs.provider.reset();
    },
  },
};
</script>
