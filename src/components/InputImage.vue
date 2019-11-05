<template>
  <ValidationProvider
    :name="name"
    :rules="validationRules"
    v-slot="{validate}"
    :bails="false"
    class="d-block">
      <div @click="launchFilePicker()">
        <v-layout justify-center>
          <v-flex md5>
            <v-card>
              <div>
                <v-img v-ripple v-if="!imageUrl" class="grey lighten-3" style="height:150px;">
                  <v-layout justify-center align-center style="height:150px; cursor:pointer">
                    <Camera class="title mt-n1 mr-1"></Camera>
                    <span>Dodaj zdjęcie</span>
                  </v-layout>
                </v-img>
                <v-img v-ripple v-else :src="imageUrl">
                </v-img>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    <input
      type="file"
      ref="image"
      name="image"
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
              :border="alertBorderLocation"
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
import Camera from 'vue-material-design-icons/Camera'

export default {
  name: 'InputImage',
  components: {
    ValidationProvider,
    Camera
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
    alertBorderLocation: {
      type: String
    },
    alertColoredBorder: {
      type: Boolean
    }
  },
  data () {
    return {
      validationErrors: [],
      imageUrl: null
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
        this.imageUrl = URL.createObjectURL(imageFile)
        formData.append(fieldName, imageFile)
        this.$emit('input', { formData })
      } else {
        this.$emit('input')
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
