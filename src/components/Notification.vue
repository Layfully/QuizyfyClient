<template>
<div>
    <v-snackbar v-model="hasErrorNotifications" :timeout="0" vertical multi-line color="red">
      <strong v-for="(error, index) in errors" :key="`error-${index}`" class="text-center">{{error.type}} : {{ error.result.message }}</strong>
    </v-snackbar>
    <v-snackbar v-model="hasNotifications" :timeout="0" vertical multi-line color="green">
      <strong v-for="(notification, index) in notifications" :key="`notification-${index}`" class="text-center">{{ notification.message }}</strong>
    </v-snackbar>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Notification',
  computed: {
    ...mapGetters('Notification', {
      hasErrorNotifications: 'hasErrorNotifications',
      hasNotifications: 'hasNotifications'
    }),
    ...mapState('Notification', [
      'errors',
      'notifications'
    ])
  }
}
</script>

<style>
</style>
