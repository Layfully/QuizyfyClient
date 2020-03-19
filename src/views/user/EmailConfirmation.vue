<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Potwierdź email!</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <RecaptchaInfo/>
    </v-card-text>
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
  methods: {
    ...mapActions({
      confirmEmail: 'User/confirmEmail'
    }),

    confirmUserEmail () {
      this.confirmEmail({ 'id': this.$route.params.id, 'verificationToken': this.$route.params.token })
        .catch(error => console.log(error))
    }
  }
}
</script>
