<template>
    <v-app-bar app>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="toggleDrawer">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="navbar--logo--interactive">
          <v-img contain class="hidden-sm-and-down" max-height="60" max-width="60" src="@/assets/logo.jpg"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn color="error" v-for="item in activeMenuItems" :key="item.title" :to='item.path' class="mx-2">
          <component :is='item.icon' class="title mt-n1 mr-1"></component>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>
</template>
<script>
import Face from 'vue-material-design-icons/Face.vue'
import LockOpen from 'vue-material-design-icons/LockOpen.vue'
import Logout from 'vue-material-design-icons/Logout.vue'
import BookMultiple from 'vue-material-design-icons/BookMultiple.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheNavbar',
  components: {
    Face,
    LockOpen,
    Logout,
    BookMultiple
  },
  methods: {
    ...mapActions('User', ['logout']),
    toggleDrawer () {
      this.$eventBus.$emit('toggleSidebar')
    }
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
