<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <ValidationObserver v-slot="{ invalid, validated }">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Reset hasła</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="resetPassword">
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
              <v-btn block :disabled="!validated || invalid" color="primary" @click="resetPassword(user)">Zmień hasło</v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import InputField from '@/components/InputField'
import PasswordField from '@/components/PasswordField'

export default {
  name: 'PasswordReset',
  components: {
    ValidationObserver,
    InputField,
    PasswordField
  },
  data () {
    return {
      user: {
        password: '',
        token: ''
      },
      displayPassword: false,
      confirmedPassword: ''
    }
  },
  mounted () {
    this.user.token = this.$route.params.token
  },
  methods: {
    ...mapActions({
      changePassword: 'User/changePassword'
    }),
    resetPassword (user) {
      this.changePassword(this.$route.params.id, user)
        .then(() => this.$router.push({ path: '/' }))
        .catch((error) => console.log(error))
    }
  }
}
</script>

<style>

</style>
