<template>
  <v-navigation-drawer app v-model="drawer" temporary fixed>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="item in activeMenuItems" :key="item.title">
          <v-list-item-title>
            <v-btn color="error" block :to="item.path">
              <component :is="item.icon" style="align-self:flex-start"></component>
              {{ item.title }}
            </v-btn>
          </v-list-item-title>
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
  props: {
    menuItems: {
      type: Array,
      required: true
    }
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
    ...mapGetters('User', [
      'loggedin']
    ),
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
