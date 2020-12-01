import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRouter from '@/modules/login/router'

Vue.use(VueRouter)

const routes = [
    ...AuthRouter,
    { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
