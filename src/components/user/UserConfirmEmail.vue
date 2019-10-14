<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Potwierdź email!</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="confirmUserEmail()">Potwierdź</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserConfirmEmail',
  created () {
    this.confirmUserEmail(this.$route.params.id, this.$route.params.token)
  },
  methods: {
    ...mapActions({
      confirmEmail: 'Authentication/confirmEmail'
    }),

    confirmUserEmail (id, token) {
      this.confirmEmail({ 'id': id, 'token': token })
        .catch(error => console.log(error))
    }
  }
}
</script>
