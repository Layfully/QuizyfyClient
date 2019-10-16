<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Potwierdź email!</v-toolbar-title>
    </v-toolbar>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn block color="primary" @click="confirmUserEmail()">Potwierdź</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'EmaillConfirmation',
  created () {
    this.confirmUserEmail(this.$route.params.id, this.$route.params.token)
  },
  methods: {
    ...mapActions({
      confirmEmail: 'User/confirmEmail'
    }),

    confirmUserEmail (id, token) {
      this.confirmEmail({ 'id': id, 'token': token })
        .catch(error => console.log(error))
    }
  }
}
</script>
