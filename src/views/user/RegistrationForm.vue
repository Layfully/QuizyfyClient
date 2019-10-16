<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <ValidationObserver v-slot="{ invalid, validated }">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Rejestracja</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="userRegister">
                <InputField
                  name="Login"
                  type="text"
                  icon="mdi-account"
                  :validationRules="{ require:true, between: { min: 5, max: 256 } }"
                  v-model="user.username"/>
                <InputField
                  name="Email"
                  type="email"
                  icon="mdi-email"
                  :validationRules="{ require:true, email:true }"
                  v-model="user.email"/>
                <v-row>
                  <v-col >
                    <PasswordField
                      name="Hasło"
                      :type="displayPassword ? 'text' : 'password'"
                      icon="mdi-lock"
                      :validationRules="{ require:true, between: [8, 1024 ], passwordMatch: 'Potwierdzenie Hasła' }"
                      v-model="user.password"/>
                  </v-col>
                  <v-col>
                    <InputField
                      name="Potwierdzenie Hasła"
                      :type="displayPassword ? 'text' : 'password'"
                      :appendIcon="displayPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :validationRules="{ require:true }"
                      @click-append="displayPassword = !displayPassword"
                      v-model="confirmedPassword"/>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block :disabled="!validated || invalid" color="primary" @click="userRegister(user)">Zarejestruj się</v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import UserService from '@/api-services/user.service'
import { ValidationObserver } from 'vee-validate'
import InputField from '@/components/InputField'
import PasswordField from '@/components/PasswordField'

export default {
  name: 'RegistrationForm',
  components: {
    ValidationObserver,
    InputField,
    PasswordField
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      },
      displayPassword: false,
      confirmedPassword: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'User/login'
    }),
    userRegister (user) {
      this.$recaptcha('register').then((token) => {
        UserService.register(user, token)
          .then((data) => this.login(user))
          .then(() => this.$router.push({ path: '/' }))
          .catch((error) => console.log(error))
      }).catch((error) => console.log(error))
    }
  }
}
</script>

<style>

</style>
