<template>
  <section class="page-content">
    <section class="background">

    </section>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homeText{
    font-size: 35px;
    color: red;
    text-align: center;
    position: relative;
    top:30px;
    text-shadow: 2px 2px 2px gray;
}

.background{
  background:url(https://peopleschoicecu.coop/wp-content/uploads/2018/02/site-background.jpg) fixed center center;;
  height: calc(100vh - 60px);
}
</style>
