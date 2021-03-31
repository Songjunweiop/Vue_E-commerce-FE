import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import './assets/css/global.css'

//导入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//导入fas图标
import '@fortawesome/fontawesome-free/js/all.js'
import '@fortawesome/fontawesome-free/css/all.css'

// 导入axios
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  function(config) {
    // 拦截每次请求,携带token
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MTcxODQzMTcsImV4cCI6MTYxNzI3MDcxN30.g7L6pDdJfgsTSFd0Lph_D59JcAl7nBiMfhh0JqbfFQA'
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
    // console.log('wrong')
  }
)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
