<template>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="navbar--logo--interactive">
          <v-img contain class="hidden-sm-and-down" max-height="60" max-width="60" src="@/assets/logo.jpg"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn color="error" v-for="item in activeMenuItems" :key="item.title" :to='item.path' v-on="item.onClick ? { click: item.onClick } : {}"  class="mx-2">
          <v-icon class="title mr-1">{{item.icon}}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheNavbar',
  methods: {
    ...mapActions('User', ['logout'])
  },
  computed: {
    ...mapGetters({
      loggedin: 'User/loggedin',
      menuItems: 'menuItems'
    }),
    activeMenuItems () {
      return this.menuItems.filter(i => i.requireAuth === this.loggedin)
    }
  }
}
</script>
