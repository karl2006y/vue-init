import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
//import 表單驗證 Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//import bootstrap
import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file

//import VueStar
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)
// <vue-star animate="animated bounceIn" color="#F05654">
//   <i slot="icon" class="fa fa-heart"></i>
// </vue-star>

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
