<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Reset hasła</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="sendEmailWithLinkReset">
            <InputField
              name="Email"
              type="email"
              icon="mdi-email"
              :validationRules="{ require:true, email:true }"
              v-model="user.email"/>
        </v-form>
        <RecaptchaInfo/>
      </v-card-text>
      <v-card-actions>
        <v-btn block :disabled="!validated || invalid" color="primary" @click="sendEmailWithLinkReset(user.email)">Wyślij mail z linkiem do resetu hasła</v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import InputField from '@/components/InputField'

export default {
  name: 'PasswordRecovery',
  components: {
    ValidationObserver,
    InputField
  },
  data () {
    return {
      user: {
        email: ''
      }
    }
  },
  methods: {
    ...mapActions({
      generatePasswordResetToken: 'User/generatePasswordResetToken'
    }),
    sendMail (email) {
      this.generatePasswordResetToken(email)
        .then(() => this.$router.push({ path: '/' }))
        .catch((error) => console.log(error))
    }
  }
}
</script>
