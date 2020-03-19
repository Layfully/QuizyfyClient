<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Logowanie</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="userLogin">
          <InputField
            name="Login"
            type="text"
            icon="mdi-account"
            :validationRules="{ require:true }"
            v-model="credentials.username"/>
          <InputField
            name="Hasło"
            :type="displayPassword ? 'text' : 'password'"
            icon="mdi-lock"
            :appendIcon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :validationRules="{ require:true }"
            @click-append="displayPassword = !displayPassword"
            v-model="credentials.password"/>
        </v-form>
        <RecaptchaInfo/>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!validated || invalid" block color="primary" @click="userLogin(credentials)">Zaloguj się</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn text block color="primary" :to="{ name: 'PasswordRecovery' }">Zapomniałeś hasła?</v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>
<script>
import { mapActions } from 'vuex'
import InputField from '@/components/InputField'
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'LoginForm',
  components: {
    InputField,
    ValidationObserver
  },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      displayPassword: false
    }
  },
  methods: {
    ...mapActions({
      login: 'User/login'
    }),

    userLogin (credentials) {
      this.$recaptcha('login').then((recaptchaToken) => {
        this.login(credentials, recaptchaToken)
          .then(() => this.$router.push('/'))
          .catch(error => console.log(error))
      }).catch((error) => console.log(error))
    }
  }
}
</script>
