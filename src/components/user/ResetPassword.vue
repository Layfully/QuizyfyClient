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
                    <ValidationProvider name="Hasło" :rules="{ require:true, between: [8, 1024], passwordMatch: 'Potwierdzenie Hasła' }" v-slot="{errors, valid}" :bails="false">
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
              <v-btn :disabled="!validated || invalid" color="primary" @click="resetPassword(user)">Zmień hasło</v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { between, required } from 'vee-validate/dist/rules'
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

export default {
  name: 'ResetPassword',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      user: {
        password: '',
        token: ''
      },
      showPassword: false,
      showStrengthMeter: false,
      confirmedPassword: '',
      focused: {
        password: false,
        passwordConfirmation: false
      },
      valid: {
        password: false,
        passwordConfirmation: false
      }
    }
  },
  mounted () {
    this.user.token = this.$route.params.token
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
      changePassword: 'User/changePassword'
    }),
    resetPassword (user) {
      this.changePassword(this.$route.params.id, user)
        .then(() => this.$router.push({ path: '/' }))
        .catch((error) => console.log(error))
    },
    checkIfFocused (errors, focus) {
      return focus ? null : errors
    }
  }
}
</script>

<style>

</style>
