import Vue from 'vue'
import Router from 'vue-router'
import tf from './views/TestIframe/index'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./Layout/index.vue'),
      children: [
        {
          path: 'dashboard',
          name: '控制面板',
          component: () => import('./views/Dashboard/index')
        },
        {
          path: 'search',
          name: '查詢進出紀錄',
          component: () => import('./views/Search/index')
        },
        {
          path: 'permission',
          name: '權限管控',
          component: () => import('./views/Permission/index')
        },
        {
          path: 'DeviceList',
          name: '資訊列表',
          component: () => import('./views/DeviceList/index')
        },
        {
          path: 'DeviceList/:id',
          name: '資訊列表/單台顯示',
          component: () => import('./views/DeviceList/index')
        },
        {
          path: 'fix',
          name: '保養/維修回報單',
          component: () => import('./views/Fix/index')
        }
      ]
    },
    {
      path: '/login',
      name: '登入',
      component: () => import('./views/Login/index')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
