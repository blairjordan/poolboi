import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pools',
      name: 'pools',
      component: () => import('./views/Pools.vue')
    },
    {
      path: '/addpool',
      name: 'addpool',
      component: () => import('./views/AddPool.vue')
    }
  ]
})
