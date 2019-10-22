<template>
  <v-app light>
    <Navbar :menu-items="menuItems" />
    <MobileNavbar :menu-items="menuItems" />
    <vue-page-transition style="height:100%" >
    <component :is="layout">
      <vue-page-transition style="height:100%" >
        <router-view/>
      </vue-page-transition>
    </component>
    </vue-page-transition>
  </v-app>
</template>

<script>
import Default from '@/components/layouts/Default.vue'
import Large from '@/components/layouts/Large.vue'
import None from '@/components/layouts/None.vue'
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
    None,
    Navbar,
    MobileNavbar
  },
  data () {
    return {
      menuItems: [
        {
          title: 'Rejestracja',
          path: { name: 'RegistrationForm' },
          icon: 'Face',
          requireAuth: false
        },
        {
          title: 'Logowanie',
          path: { name: 'LoginForm' },
          icon: 'LockOpen',
          requireAuth: false
        },
        {
          title: 'Wyloguj się',
          path: { name: 'Home' },
          icon: 'Logout',
          requireAuth: true
        },
        {
          title: 'Katalog Quizów',
          path: { name: 'QuizList', params: { pageNumber: 1 } },
          icon: 'BookMultiple',
          requireAuth: false
        }
      ]
    }
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || process.env.VUE_APP_DEFAULT_LAYOUT)
    }
  }
}
</script>

<style>
  .logo {
    cursor: pointer;
  }

  .icon {
    font-size:20px;
    margin-top:-5px;
    margin-right:5px;
  }
</style>
