import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
//导入全局样式表
import './assets/css/global.css'
import dataV from '@jiaminghi/data-view'
import echarts from 'echarts'
import Charts from '@jiaminghi/charts'

Vue.prototype.$echarts = echarts
Vue.prototype.$charts = Charts
Vue.use(dataV)
Vue.prototype.$http = axios
    //配置请求的根路径
axios.defaults.baseURL = '/api'
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')