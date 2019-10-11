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
              <v-form @submit.prevent="sendEmailWithLinkReset">
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn block :disabled="!validated || invalid" color="primary" @click="sendEmailWithLinkReset(user.email)">Wyślij mail z linkiem do resetu hasła</v-btn>
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
import { email } from 'vee-validate/dist/rules'

extend('email', {
  validate: email.validate,
  message: 'Podany adres email jest niepoprawny.'
})

export default {
  name: 'UserForgotPassword',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      user: {
        email: ''
      },
      focused: {
        email: false
      },
      valid: {
        email: false
      }
    }
  },
  methods: {
    ...mapActions({
      generatePasswordResetToken: 'Authentication/generatePasswordResetToken'
    }),
    sendEmailWithLinkReset (email) {
      this.generatePasswordResetToken(email)
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
