<template>
  <div class="main">
<!--    左边-->
    <div class="column">
      <div class="panel bar">
        <div class="content"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <div class="content"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel pie">
        <div class="content"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
<!--   中间-->
    <div class="column">
<!--      no 模块-->
      <div class="no">
        <div class="no-hd">
          <ul>
            <li>{{state.total_confirm}}</li>
            <li>{{state.total_heal}}</li>
          </ul>
        </div>
        <div class="no-bd">
          <ul>
            <li>累计确诊</li>
            <li>累计治愈</li>
          </ul>
        </div>
      </div>
<!--      地图模块-->
      <div class="map">
        <!--背景图片-->
        <div class="china"></div>
        <div class="map1"></div>
        <div class="map2"></div>
        <div class="map3"></div>
        <div class="chat"></div>
      </div>
    </div>
<!--   右边-->
    <div class="column">
      <div class="panel bar">
        <div class="content_right"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel line">
        <div class="content_right"></div>
        <div class="panel-footer"></div>
      </div>
      <div class="panel pie">
        <div class="content_right"></div>
        <div class="panel-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getData, lineData, histogramData, pieData, centerData, pie_rightData,histogram_rData, mapData,
  line_rData} from '@/apis/data.js';
import { inject, onMounted ,reactive} from "vue";
import  {histogram, line, pie, pie_right,histogram_r, map,line_r} from "@/apis/histogram";


let total_confirm = 0 // 累计确诊
let total_heal = 0 // 死亡人数
// console.log(total_confirm)
const state = reactive({
  total_confirm,
  total_heal
})

let echarts = inject('ec')
onMounted(() => {
  getData().then(({data}) => {
    // lineData： 折线统计图的数据配置
    let [day_confirm, dayList_date] = lineData(data);
    let line_config = {
      title: "近五日确诊数",
      day_confirm: day_confirm,
      dayList_date: dayList_date,
    }
    console.log(line_config);
    // histogramData: 柱状图数据配置
    let chinaInfo = histogramData(data)
    // console.log(chinaInfo)
    let histogram_config = {
      title: "每日新增感染人数省份排行",
      city: chinaInfo[0],
      confirm: chinaInfo[1]
    }

    // 饼图数据
    let pie_data = pieData(data)
    let pie_config = {
      title: "全国疫情总计",
      data: pie_data
    }

    // 中间头部数据
    let center_data = centerData(data)
    state.total_confirm = center_data.confirm
    state.total_heal = center_data.heal

    // 中间地图部分数据
    let map_data = mapData(data)
    // console.log(map_data)
    // 右边饼图数据
    let pie_rData = pie_rightData(data)
    let pie_rConfig = {
      title: "全球确诊数前十",
      data: pie_rData
    }
    // console.log(pie_rData)
    // 右边柱状图数据
    let his_rData =  histogram_rData(data)
    his_rData.title = "全球新增确诊排行"
    // console.log(his_rData.names.values)
    // 右边折线图数据
    let line_r_Data = line_rData(data)
    let r_data_config = {
      title: "近期每日新增情况",
      data: line_r_Data
    }
    console.log(line_r_Data)


    // 绘制图表
    let content = document.querySelectorAll(".content")
    // 左边第一个
    line(content[2], line_config)
    // 左边第二个
    histogram(content[1], histogram_config)
    // 左边第三个
    pie(content[0], pie_config)

    // 中间地图
    let map_container = document.querySelector(".china")
    map(map_container, map_data)

    //  右边第一个
    let content_right = document.querySelectorAll(".content_right")
    // 第一个
    pie_right(content_right[0], pie_rConfig)
    // 第二个
    histogram_r(content_right[1], his_rData)
    // 第三个
    line_r(content_right[2],r_data_config)
  })
})


</script>

<style scoped lang="less">
@import ~"assets/css/homeitem.less";
</style>