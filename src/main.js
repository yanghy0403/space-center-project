//引入vue
import Vue from 'vue';
import App from './App';
import router from './router';

//引入 iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI);

import 'font-awesome/css/font-awesome.css'
//引入 全局样式
import './assets/css/init.css';


//引入element ui部分内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import axios from 'axios';
import qs from 'qs';

//挂载 基础ip地址
axios.defaults.baseURL = process.env.VUE_APP_URL;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

//实例化 store
import store from './store';

// 引入jQuery
// import jquery from 'jquery';

// Vue.prototype.$jquery = jquery; 


//请求拦截每次请求都需要携带token信息
// axios.interceptors.request.use(
//   config => {

//     if (sessionStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       var token = JSON.parse(sessionStorage.getItem('token'));
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);

//   })
let whiteList = ['/','/science','/login'];
router.beforeEach((to, from, next) => {
  if ((whiteList.indexOf(to.path) > -1) || document.cookie) {
    next()
  } else {
    // window.location.href = 'http://10.0.88.161/api/login?way=ump'
    window.location.href = 'http://10.0.88.161/login'
  }
})

// 回到顶部
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// })
//引入外部数据
import per from './api/json.js';
Vue.prototype.$content = per;

// router.beforeEach(function() {
//   window.scrollTo(0, 0)
// })

// console.log(process.env);

//去掉警告 You are running Vue in development mode
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })