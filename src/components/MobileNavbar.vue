<template>
    <v-bottom-navigation app grow shift :input-value="$vuetify.breakpoint.smAndDown">
      <v-btn v-for="item in activeMenuItems" :key="item.title" :to="item.path">
        <v-icon>{{item.icon}}</v-icon>
        <span>{{item.title}}</span>
      </v-btn>
  </v-bottom-navigation>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheSidebar',
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
