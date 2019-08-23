<template>
  <b-container style="flex:1; height:calc(100vh - 60px);">
      <h1>{{ user.username }}</h1>
      <h2>Imię: {{ user.firstName }}</h2>
      <h2>Nazwisko: {{ user.lastName }}</h2>
      <h2>Rola: {{ user.role }}</h2>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
    ...mapGetters('Authentication', [
      'user'
    ])
  }
}
</script>

<style>

</style>
