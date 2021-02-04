const Produto = () => import('./../views/Produto.vue')

export default [
  {
    path: '/produto',
    component: Produto,
    meta: { requiresLogin: true }
  }
]