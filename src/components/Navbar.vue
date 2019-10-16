<template>
    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="toggleDrawer">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-img contain class="mx-2" max-height="60" max-width="60" src="@/assets/logo.jpg"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-btn color="error" v-for="item in activeMenuItems" :key="item.title" :to='item.path' style="margin: 0 10px;">
          <component :is='item.icon' style='align-self:flex-start; margin-right: 3px'></component>
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
  props: {
    appTitle: {
      type: String,
      required: true
    },
    menuItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions('User', ['logout']),
    toggleDrawer () {
      this.$eventBus.$emit('toggleSidebar')
    }
  },
  computed: {
    ...mapGetters('User', ['loggedin', 'user']),
    activeMenuItems () {
      return this.menuItems.filter(i => i.requireAuth === this.loggedin)
    }
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
}
</style>
