<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Logowanie</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="userLogin">
              <v-text-field
                label="Login"
                name="login"
                type="text"
                prepend-icon="mdi-account"
                v-model="credentials.username"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Hasło"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="credentials.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="userLogin(credentials)">Zaloguj się</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn text block color="primary" :to="{ name: 'PasswordRecovery' }">Zapomniałeś hasła?</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'User/login'
    }),

    userLogin (credentials) {
      this.$recaptcha('login').then((token) => {
        this.login(credentials, token)
          .then(() => this.$router.push('/'))
          .catch(error => console.log(error))
      }).catch((error) => console.log(error))
    }
  }
}
</script>
