<template>
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
                v-model="passwordResetPayload.data.password"/>
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
        <RecaptchaInfo/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block :disabled="!validated || invalid" color="primary" @click="changeUserPassword(passwordResetPayload)">Zmień hasło</v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
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
  props: {
    id: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      passwordResetPayload: {
        id: '',
        data: {
          password: '',
          token: ''
        }
      },
      displayPassword: false,
      confirmedPassword: ''
    }
  },
  mounted () {
    this.passwordResetPayload.data.token = this.token
    this.passwordResetPayload.id = this.id
  },
  methods: {
    ...mapActions({
      changePassword: 'User/changePassword'
    }),
    changeUserPassword (passwordResetPayload) {
      this.changePassword(passwordResetPayload)
        .then(() => this.$router.push({ name: 'LoginForm' }))
        .catch((error) => console.log(error))
    }
  }
}
</script>
