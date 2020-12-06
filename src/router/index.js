import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginRouter from '@/modules/login/router'
import HomeRouter from '@/modules/home/router'
import EmpresaRouter from '@/modules/empresa/router'
import LoginService from '@/modules/login/services'

Vue.use(VueRouter)

const routes = [
  ...LoginRouter,
  ...HomeRouter,
  ...EmpresaRouter,
  { path: '/', redirect: '/entrar' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresLogin)) {
    const token = window.localStorage.getItem('token')
    const loginRoute = {
      path: '/entrar',
      query: { redirect: to.fullPath }
    }
    if (token) {
      LoginService.obterUsuarioPorToken(token)
        .then((response) => {
          if (response.data.length == 1) {
            return next()
          } else {
            return next(loginRoute)
          }
        })
        .catch(function (err) {
          console.log('Auto Login Error: ', err)
          return next(loginRoute)
        });
    } else {
      return next(loginRoute)
    }
  }
  next()
})

export default router
