<template>
  <v-app light>
    <Navbar :appTitle="appTitle" :menu-items="menuItems" />
    <MobileNavbar :menu-items="menuItems" />
    <v-content>
      <vue-page-transition style="height:100%" >
        <router-view/>
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import MobileNavbar from '@/components/MobileNavbar.vue'

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
