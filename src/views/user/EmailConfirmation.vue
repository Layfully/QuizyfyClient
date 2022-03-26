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
      <v-btn block color="primary" @click="userConfirmEmail">Potwierdź</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'EmaillConfirmation',
  props: {
    id: {
      type: String,
      required: true
    },
    verificationToken: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      confirmEmail: 'User/confirmEmail'
    }),
    userConfirmEmail () {
      this.confirmEmail(this.$props)
        .then(() => this.$router.push({ name: 'LoginForm' }))
        .catch((error) => console.log(error))
    }
  }
}
</script>
