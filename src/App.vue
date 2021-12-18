<template>
<!-- <router-view/> -->
<Home/>
</template>

<script setup>
import Home from '@/components/Home.vue'
import "echarts-map-chinajs"
import * as echarts from 'echarts'

import { provide } from 'vue'

provide('ec',echarts)
</script>

<style>
  @import 'assets/css/base.css';

  body {
    /* width: 100%; */
    /* height: 100vh; */
    /* line-height: 1.15; */
    background: url("assets/imgs/bg.jpg") repeat;
    background-size: 100% 100%;
    /* background-size: cover; */
  }
  
</style>
