import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from '@/modules/home/router'
import EmpresaRouter from '@/modules/empresa/router'

Vue.use(VueRouter)

const routes = [
  ...HomeRouter,
  ...EmpresaRouter,
  { path: '/', redirect: '/home' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
    Vue.$keycloak.verifySession();
    next();
})

export default router
