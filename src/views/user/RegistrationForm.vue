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
                <ValidationProvider name="Login" :rules="{ require:true, between: { min: 5, max: 256 } }" v-slot="{errors, valid}" :bails="false">
                  <v-text-field
                  :error-messages="checkIfFocused(errors, focused.login)"
                  :error-count="errors.length"
                  :success="valid"
                  @focus="focused.login = true"
                  @blur="focused.login = false"
                  id="login"
                  label="Login"
                  name="login"
                  type="text"
                  prepend-icon="mdi-account"
                  v-model="user.username"></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Email" :rules="{ require:true, email:true }" v-slot="{errors, valid}" :bails="false">
                    <v-text-field
                    :error-messages="checkIfFocused(errors, focused.email)"
                    :error-count="errors.length"
                    :success="valid"
                    @focus="focused.email = true"
                    @blur="focused.email = false"
                    id="email"
                    label="Email"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="user.email"
                    required>
                    </v-text-field>
                </ValidationProvider>
                <v-row>
                  <v-col >
                    <ValidationProvider name="Hasło" :rules="{ require:true, between: [8, 1024 ], passwordMatch: 'Potwierdzenie Hasła' }" v-slot="{errors, valid}" :bails="false">
                      <v-text-field
                      :error-messages="checkIfFocused(errors, focused.password)"
                      :error-count="errors.length"
                      :success="valid"
                      @focus="focused.password = true; showStrengthMeter = true"
                      @blur="focused.password = false; showStrengthMeter = false"
                      id="password"
                      label="Hasło"
                      prepend-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="user.password"
                      :loading="showStrengthMeter"
                      required>
                          <template v-slot:progress >
                              <v-progress-linear
                                :value="passwordStrength"
                                :color="passwordStrengthMeterColor"
                                absolute
                                height="7"
                              ></v-progress-linear>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider name="Potwierdzenie Hasła" rules="require" v-slot="{errors, valid}" :bails="false">
                      <v-text-field
                      :error-messages="checkIfFocused(errors, focused.passwordConfirmation)"
                      :error-count="errors.length"
                      :success="valid"
                      :append-outer-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @focus="focused.passwordConfirmation = true"
                      @blur="focused.passwordConfirmation = false"
                      @click:append-outer="showPassword = !showPassword"
                      id="confirmedPassword"
                      label="Potwierdź hasło"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="confirmedPassword"
                      required>
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!validated || invalid" color="primary" @click="userRegister(user)">Zarejestruj się</v-btn>
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
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { between, required, email } from 'vee-validate/dist/rules'
import zxcvbn from 'zxcvbn'

extend('passwordMatch', {
  validate: (value, { other }) => value === other,
  message: 'Hasła nie są identyczne.',
  params: [{ name: 'other', isTarget: true }]
})
extend('between', {
  validate: (value, { min, max }) => (value.length > min && value.length < max),
  message: '{_field_} musi składać się z więcej niż {min} znaków.',
  params: between.params
})

extend('require', {
  validate: required.validate,
  computesRequired: required.computesRequired,
  message: 'Pole {_field_} jest wymagane.'
})

extend('email', {
  validate: email.validate,
  message: 'Podany adres email jest niepoprawny.'
})

export default {
  name: 'RegistrationForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: ''
      },
      showPassword: false,
      showStrengthMeter: false,
      confirmedPassword: '',
      focused: {
        password: false,
        passwordConfirmation: false,
        email: false,
        login: false
      },
      valid: {
        password: false,
        passwordConfirmation: false,
        email: false,
        login: false
      }
    }
  },
  computed: {
    passwordStrength () {
      return zxcvbn(this.user.password).score * 25
    },
    passwordStrengthMeterColor () {
      return ['primary', 'secondary', 'error', 'warning', 'success'][this.passwordStrength / 25]
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
    },
    checkIfFocused (errors, focus) {
      return focus ? null : errors
    }
  }
}
</script>

<style>

</style>
