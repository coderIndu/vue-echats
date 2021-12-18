<template>
  <header>
<!-- 预留插槽使用户自定义标题  -->
    <h3 class="title"><slot name="title"></slot></h3>
    <div class="time">{{state.date}}</div>
  </header>
</template>

<script>
import { reactive, onMounted} from 'vue'

export default {
  name: "HomeHeader",
  setup(){
    // 时间格式化函数
    function dateFormat() {
      let date = new Date()
      let map = {
        'y': new Date(date).getFullYear(),
        'M': new Date(date).getMonth() + 1,//month
        'd': new Date(date).getDate(),//date
        'H': new Date(date).getHours(),//hours
        'm': new Date(date).getMinutes(),//minutes
        's': new Date(date).getSeconds() //seconds
      };
      map.H < 10 ? map.H=`0${map.H}` : map.H
      map.m < 10 ? map.m=`0${map.m}` : map.m
      map.s < 10 ? map.s=`0${map.s}` : map.s
      return `${map.y}年${map.M}月${map.d}日 ${map.H}:${map.m}:${map.s}`
    }
    // 显示实时时间
    function newTimes() {
      setInterval(function (){
        state.date = dateFormat()
      },1000)
    }

    // 初始化date变量
    let date = dateFormat()

    // 响应式声明
    const state = reactive({
      date,
    })

    // 挂载后执行newTimes函数
    onMounted(newTimes)

    // 返回数据出去
    return {state}
  },

}

</script>

<style scoped  lang="less" >
//@red_color : color
  header {
    width: 100%;
    height: 5rem;
    //background-color: v-bind('red');
    background: url(~"assets/imgs/head_bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;

    .title {
      font-size: 1.875rem;
      color: #fff;
      //color: color();
      line-height: 4.6875rem;
      text-align: center;
    }
    .time {
      position: absolute;
      top: 0;
      right: 3rem;
      line-height: 4.6875rem;
      font-size: 20px;
      color: rgba(255, 255, 255, .7);
    }
  }
</style>