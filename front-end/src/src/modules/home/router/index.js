const Home = () => import('./../views/Home.vue')

export default [
  {
    path: '/home',
    component: Home,
    meta: { requiresLogin: true }
  }
]