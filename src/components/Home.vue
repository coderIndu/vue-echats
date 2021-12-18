<template>
  <div class="container">
  <!-- <router-view/> -->
    <Header>
      <template v-slot:title>疫情情况展板</template>
    </Header>
    <Main class="main"/>
  </div>
</template>

<script setup>
import Main from 'components/common/HomeItem/HomeMain.vue'
import Header from "components/common/HomeItem/HomeHeader.vue";

</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 100vh;
  }
</style>