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

import { between, required, email } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('passwordMatch', {
  validate: (value, { other }) => value === other,
  message: 'Hasła nie są identyczne.',
  params: [{ name: 'other', isTarget: true }]
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
