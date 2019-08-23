<template>
  <div class = "body">
    <navbar/>
    <b-container fluid id="app">
      <b-row>
        <b-col class="no-padding">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
.body{
  background: #f0f2f4 !important;
  font-family: "Montserrat",sans-serif;
  font-weight: normal;
}
.no-padding{
  padding: 0;
}
</style>
