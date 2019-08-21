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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
