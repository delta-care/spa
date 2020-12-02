const Painel = () => import('./../views/Painel.vue')

export default [
  {
    path: '/painel',
    component: Painel,
    meta: { requiresLogin: true }
  }
]