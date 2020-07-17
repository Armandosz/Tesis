import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex';
//import 'index.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

 /* Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyB-2g0nrDcgVl_4WiUao_dMA98ctgCbuzE",
  authDomain: "cursovue-61a1a.firebaseapp.com",
  databaseURL: "https://cursovue-61a1a.firebaseio.com",
  projectId: "cursovue-61a1a",
  storageBucket: "cursovue-61a1a.appspot.com",
  messagingSenderId: "963922361760",
  appId: "1:963922361760:web:ab6a8a10acad18d05678c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); */
Vue.use(Vuex);
/* eslint-disable no-new */
// eslint-disable-next-line no-unused-vars
new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
  




