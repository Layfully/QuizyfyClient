<template>
  <v-app>
    <Navbar v-if="$vuetify.breakpoint.mdAndUp"/>
    <v-content id="content">
      <vue-page-transition class="fill-height" >
      <component :is="layout">
        <vue-page-transition class="fill-height" style="width:100%">
          <router-view/>
        </vue-page-transition>
      </component>
      </vue-page-transition>
    </v-content>
    <Notification/>
    <MobileNavbar v-if="$vuetify.breakpoint.smAndDown" />
  </v-app>
</template>

<script>
import Default from '@/components/layouts/Default.vue'
import Large from '@/components/layouts/Large.vue'
import FullWidth from '@/components/layouts/FullWidth.vue'
import Navbar from '@/components/Navbar.vue'
import MobileNavbar from '@/components/MobileNavbar.vue'
import Notification from '@/components/Notification.vue'

// eslint-disable-next-line
import { between, required, email, dimensions, image, min, min_value } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'
import { validateImages, validateImageDimensions } from './plugins/validation.js'

extend('passwordMatch', {
  validate: (value, { other }) => value === other,
  message: 'Hasła nie są identyczne.',
  params: [{ name: 'other', isTarget: true }]
})

extend('minValue', {
  validate: min_value.validate,
  message: '{_field_} musi być większa lub równa {min}',
  params: min_value.params
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
  validate: validateImages,
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
    MobileNavbar,
    Notification
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
