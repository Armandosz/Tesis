import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex';
import axios from 'axios'
//import 'index.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.use(Vuex);
/* eslint-disable no-new */
// eslint-disable-next-line no-unused-vars
new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
  

const prod = process.env.NODE_ENV === 'production'
const shouldSW = 'serviceWorker' in navigator && prod
if (shouldSW) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log("Service Worker Registered!")
  })
}



