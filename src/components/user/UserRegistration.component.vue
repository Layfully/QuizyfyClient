<template>
  <b-container style="flex:1; height:calc(100vh - 60px);">
    <div class="form-wrapper">
      <b-form @submit.prevent="userRegister">
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
              v-model="user.username"
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
              v-model="user.password"
              maxlength="60"
              required />
          </b-col>
        </b-form-group>

          <b-col
            :md="5"
            class="center flex-center"
            offset="4">
            <b-button @click="userRegister(user)" variant="success">Zarejestruj się</b-button>
          </b-col>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import UserService from '@/api-services/user.service'

export default {

  name: 'UserRegistration',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'Authentication/login'
    }),
    userRegister (user) {
      UserService.register(user)
        .then((data) => this.login(user))
        .then(() => this.$router.push({ path: '/' }))
        .catch((error) => console.log(error))
    }
  }
}
</script>

<style>

</style>
