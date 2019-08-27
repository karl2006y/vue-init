import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
//import 表單驗證 Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
//https://github.com/vuelidate/vuelidate

//import bootstrap
import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file

//import VueStar
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)
// <vue-star animate="animated bounceIn" color="#F05654">
//   <i slot="icon" class="fa fa-heart"></i>
// </vue-star>

//import axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//防止未授權登入
// router.beforeEach((to, from, next) => {
//   if (to.name == '登入') {
//     next()
//   } else {
//     axios
//       .get('https://www.ibunny.com.tw/Identity/Account/Login')
//       .then(response => {
//         if (response.data.indexOf('Hello') == -1) {
//           // 授權失敗跳轉至登入頁面
//           // alert('授權失敗')
//           next({ name: '登入', query: { next: encodeURI(to.name) } })
//         } else {
//           // 授權確認
//           // alert('授權確認')
//           if (to.name == 'home') {
//             // alert('跳轉控制面板')
//             next({ name: '控制面板' })
//           } else {
//             // alert('放行')
//             next()
//           }
//         }
//       })
//   }
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
