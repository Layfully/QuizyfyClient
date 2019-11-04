<template>
  <v-app light>
    <Navbar/>
    <MobileNavbar/>
    <v-content>
      <vue-page-transition class="fill-height" >
      <component :is="layout">
        <vue-page-transition class="fill-height" style="width:100%">
          <router-view/>
        </vue-page-transition>
      </component>
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script>
import Default from '@/components/layouts/Default.vue'
import Large from '@/components/layouts/Large.vue'
import FullWidth from '@/components/layouts/FullWidth.vue'
import Navbar from '@/components/Navbar.vue'
import MobileNavbar from '@/components/MobileNavbar.vue'

import { between, required, email, dimensions, image } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

var validateImageDimensions = function (value, { width, height }) {
  return new Promise(function (resolve) {
    var image = new Image()
    image.onerror = function () { return resolve(false) }
    image.onload = function () { return resolve(image.width >= width && image.height >= height) }
    image.src = URL.createObjectURL(value[0])
  })
}

var validateImage = function (files) {
  var regex = /\.(heic|heif|tiff|webp|ico|jpg|svg|jpeg|png|bmp|gif)$/i
  if (Array.isArray(files)) {
    return files.every(function (file) { return regex.test(file.name) })
  }
  return regex.test(files.name)
}

extend('passwordMatch', {
  validate: (value, { other }) => value === other,
  message: 'Hasła nie są identyczne.',
  params: [{ name: 'other', isTarget: true }]
})

extend('dimensions', {
  validate: validateImageDimensions,
  message: 'Obraz musi mieć szerokość co najmniej {width}px i wysokość co najmniej {height}px.',
  params: dimensions.params
})

extend('between', {
  validate: (value, { min, max }) => (value.length > min && value.length < max),
  message: '{_field_} musi składać się z więcej niż {min} znaków.',
  params: between.params
})

extend('require', {
  validate: required.validate,
  computesRequired: required.computesRequired,
  message: 'Pole {_field_} jest wymagane.'
})

extend('email', {
  validate: email.validate,
  message: 'Podany adres email jest niepoprawny.'
})

extend('image', {
  validate: validateImage,
  message: 'Ten plik nie jest obrazem',
  params: image.params
})

export default {
  name: 'App',
  components: {
    Default,
    Large,
    FullWidth,
    Navbar,
    MobileNavbar
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || process.env.VUE_APP_DEFAULT_LAYOUT)
    }
  }
}
</script>

<style>
  .navbar--logo--interactive {
    cursor: pointer;
  }
</style>
