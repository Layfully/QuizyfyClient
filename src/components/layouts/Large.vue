<template>
  <v-container fluid fill-height class="pa-0">
    <v-row justify="center">
      <v-col :cols="11" :sm="9" :md="6">
        <slot/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Large'
}
</script>
