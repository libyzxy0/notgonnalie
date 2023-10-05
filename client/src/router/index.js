import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Main.vue')
    }, 
    {
      path: '/:id',
      name: 'message',
      component: () => import('../pages/Message.vue')
    }, 
  ]
})

export default router