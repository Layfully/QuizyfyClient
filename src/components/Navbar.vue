<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="primary"
    sticky
    style="positon:absolute; width:100%;"
    >
    <b-navbar-brand :to="{ name: 'Home' }">Account-Owner Home</b-navbar-brand>
    <b-navbar-nav class='mx-auto'>
      <b-nav-item active :to="{ name: 'Home' }">Strona główna</b-nav-item>
      <b-nav-item active :to="{ name: 'QuizList', params: { pageNumber:1 }}">Katalog quizów</b-nav-item>
      <b-nav-item active :to="{ name: 'QuizCreate' }">Kreator quizów</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" v-if="!loggedin">
      <b-nav-item active class="nav-item" :to="{ name: 'UserLogin' }"><font-awesome-icon icon="lock"/>Login </b-nav-item>
      <b-nav-item active class="nav-item" :to="{ name: 'UserRegistration' }"><font-awesome-icon icon="user-plus"/>Rejestracja</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" v-else>
      <b-nav-item active class="nav-item" :to="{ name: 'UserProfile' }"><font-awesome-icon icon="user"/>{{ user.username }}</b-nav-item>
      <b-nav-item active class="nav-item" @click="logout"><font-awesome-icon icon="lock"/>Wyloguj się</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    ...mapActions('Authentication', [
      'logout'
    ])
  },
  computed: {
    ...mapGetters('Authentication', [
      'loggedin',
      'user'
    ])
  }
}
</script>

<style scoped>
*{
  font-size: 1.05rem;
  box-sizing: border-box;
}

.ml-auto{
  margin: 0 !important;
}

.nav-item:hover::after{
  transform: scaleX(1);
  border:white 1px solid;
}

.nav-item::after{
  content: '';
  border:white 1px solid;
  display: block;
  transform: scaleX(0);
  transition:all .2s ease !important;
}

svg{
  margin-right:5px;
}

</style>
