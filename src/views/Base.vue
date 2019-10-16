<template>
  <v-app light>
    <Navbar :appTitle="appTitle" :menu-items="menuItems" />
    <MobileNavbar :menu-items="menuItems" />
    <v-content>
      <vue-page-transition style="height:100%" >
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5>
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script>
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
  components: {
    Navbar,
    MobileNavbar
  },
  data () {
    return {
      appTitle: 'Quizyfy',
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
  }
}
</script>
