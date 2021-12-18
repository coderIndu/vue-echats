import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
// createApp.prototype.echarts = echarts

// createApp.prototype.$axios = axios

createApp(App)
// .use(ElementPlus)
.mount('#app')


