import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: '/',
    //   component: () => import('../app.vue')
    // },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/svgEdit',
      name: 'svgEdit',
      component: () => import('../views/svgEdit.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: () => import('../Error.vue'),
      meta: { title: '404' },
    },
  ]
})

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  console.log(to);
  // return false
})

export default router
