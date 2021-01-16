import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from '@/modules/home/router'
import PainelRouter from '@/modules/painel/router'
import EmpresaRouter from '@/modules/empresa/router'

Vue.use(VueRouter)

const routes = [
  ...HomeRouter,
  ...EmpresaRouter,
  ...PainelRouter,
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
