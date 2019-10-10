<template>
  <v-app light>
    <TheNavbar :appTitle="appTitle" :menu-items="menuItems" />
    <TheSidebar :menu-items="menuItems" />
    <v-content>
      <vue-page-transition style="height:100%" >
        <router-view/>
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  components: {
    TheNavbar,
    TheSidebar
  },
  data () {
    return {
      appTitle: 'Quizyfy',
      menuItems: [
        { title: 'Rejestracja', path: { name: 'UserRegistration' }, icon: 'Face', requireAuth: false },
        { title: 'Logowanie', path: { name: 'UserLogin' }, icon: 'LockOpen', requireAuth: false },
        { title: 'Wyloguj się', path: { name: 'Home' }, icon: 'Logout', requireAuth: true },
        { title: 'Katalog Quizów', path: { name: 'QuizList', params: { pageNumber: 1 } }, icon: 'BookMultiple', requireAuth: false }
      ]
    }
  }
}
</script>
