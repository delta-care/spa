const Empresa = () => import('./../views/Empresa.vue')

export default [
  {
    path: '/empresa',
    component: Empresa,
    meta: { requiresLogin: true }
  }
]