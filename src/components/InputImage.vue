<template>
  <ValidationProvider
    :name="name"
    :rules="validationRules"
    v-slot="{validate}"
    :bails="false"
    class="d-block">
      <div @click="launchFilePicker()">
        <slot></slot>
      </div>
    <input
      type="file"
      ref="image"
      :name="name"
      @change="onFileChange($event.target.name, $event.target.files, validate)"
      class="d-none">
    <div class="mb-4"></div>
    <transition-group tag="div" name="fade-transition">
      <div v-for="(error, index) in validationErrors" :key="error">
          <v-fade-transition>
            <v-alert
              :dense="alertDense"
              :colored-border="alertColoredBorder"
              :elevation="alertElevation"
              :border="borderLocation"
              :type="alertType"
              dismissible
              @input="deleteError(index)"
              >
              {{error}}
            </v-alert>
          </v-fade-transition>
      </div>
    </transition-group>
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
  data () {
    return {
      validationErrors: []
    }
  },
  methods: {
    launchFilePicker () {
      this.$refs.image.click()
    },
    deleteError (index) {
      this.$delete(this.validationErrors, index)
    },
    async onFileChange (fieldName, file, validate) {
      let validation = await validate(Array.from(file))
      this.validationErrors = validation.errors
      if (validation.valid) {
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

<style scoped>
  .fade-transition-enter-active{
    transition: all .5s ease;
  }
</style>
