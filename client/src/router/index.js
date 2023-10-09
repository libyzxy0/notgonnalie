import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Main.vue'),
      meta: {
        title: 'Not Gonna Lie'
      }
    },
    {
      path: '/:id',
      name: 'message',
      component: () => import('../pages/Message.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? to.meta.title
    : `Send anonymous message to ${to.params?.id}!`
  next()
})

export default router
