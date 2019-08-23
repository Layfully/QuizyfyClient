<template>
  <b-container style="flex:1; height:calc(100vh - 60px);">
    <div class="form-wrapper">
      <b-form @submit.prevent="userLogin">
        <b-form-group
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          label="Username"
          for="username">
          <b-col :md="5" class="center">
            <b-input
              id="username"
              v-model="credentials.username"
              maxlength="60"
              required />
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          label-size="lg"
          breakpoint="md"
          horizontal
          label="Password"
          for="password">
          <b-col :md="5" class="center">
            <b-input
              id="password"
              v-model="credentials.password"
              maxlength="60"
              required />
          </b-col>
        </b-form-group>

          <b-col
            :md="5"
            class="center flex-center"
            offset="4">
            <b-button @click="userLogin(credentials)" variant="success">Zaloguj się</b-button>
          </b-col>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserLogin',
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
      login: 'Authentication/login'
    }),
    userLogin (credentials) {
      this.login(credentials)
        .then(() => this.$router.push('/'))
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>

</style>
