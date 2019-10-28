<template>
  <ValidationProvider
    :name="name"
    :rules="validationRules"
    v-slot="{validate, errors}"
    :bails="false"
    class="d-block">
    <v-layout justify-center>
      <v-flex md5>
        <v-card>
          <div @click="launchFilePicker()">
            <slot name="activator"></slot>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <input
      type="file"
      ref="image"
      :name="name"
      @change="onFileChange($event.target.name, $event.target.files, validate)"
      class="d-none">
    <div class="mb-4"></div>
    <v-alert
      :dense="alertDense"
      :colored-border="alertColoredBorder"
      :elevation="alertElevation"
      :border="borderLocation"
      :type="alertType"
      v-for="error in errors" :key="error">
      {{ error }}
    </v-alert>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputImage',
  components: {
    ValidationProvider
  },
  props: {
    name: {
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
    alertType: {
      type: String
    },
    alertElevation: {
      type: String
    },
    alertDense: {
      type: Boolean
    },
    borderLocation: {
      type: String
    },
    alertColoredBorder: {
      type: Boolean
    }
  },
  methods: {
    launchFilePicker () {
      this.$refs.image.click()
    },
    async onFileChange (fieldName, file, validate) {
      let valid = (await validate(Array.from(file))).valid
      if (valid) {
        let imageFile = file[0]
        let formData = new FormData()
        let imageURL = URL.createObjectURL(imageFile)
        formData.append(fieldName, imageFile)
        this.$emit('input', { formData, imageURL })
      } else {
        this.$emit('input', {})
      }
    }
  }
}
</script>
