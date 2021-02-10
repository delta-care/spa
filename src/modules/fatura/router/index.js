const Fatura = () => import('./../views/Fatura.vue')

export default [
  {
    path: '/fatura',
    component: Fatura,
    meta: { requiresLogin: true }
  }
]