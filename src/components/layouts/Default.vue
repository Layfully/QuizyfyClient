<template>
  <v-container fill-height>
    <v-switch v-model="$vuetify.theme.dark"></v-switch> <!-- REMEMBER TO MOVE THIS SWITCH SOMEWHERE ELSE THIS IS FOR DEV PURPOSE-->
    <v-row justify="center" dense>
      <v-col :cols="12" :sm="8" :md="6">
        <slot/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Default'
}
</script>
