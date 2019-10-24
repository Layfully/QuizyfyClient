<template>
  <v-navigation-drawer app v-model="drawer" temporary fixed>
    <v-list nav dense class="px-0">
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <v-layout align-center justify-center class="pb-4">
          <v-toolbar-title>
            <router-link to="/" tag="span" class="navbar--logo--interactive">
              <v-img contain max-height="80" max-width="80" src="@/assets/logo.jpg"></v-img>
            </router-link>
          </v-toolbar-title>
        </v-layout>
        <v-list-item v-for="item in activeMenuItems" :key="item.title" :to="item.path" link class="px-0">
          <v-list-item-icon class="pl-2 mt-3">
              <component :is="item.icon" class="title mt-n1 mr-1"></component>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import Face from 'vue-material-design-icons/Face.vue'
import LockOpen from 'vue-material-design-icons/LockOpen.vue'
import Logout from 'vue-material-design-icons/Logout.vue'
import BookMultiple from 'vue-material-design-icons/BookMultiple.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'TheSidebar',
  components: {
    Face,
    LockOpen,
    Logout,
    BookMultiple
  },
  created () {
    this.$eventBus.$on('toggleSidebar', () => {
      this.drawer = !this.drawer
    })
  },
  data () {
    return {
      drawer: false,
      group: null
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
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
