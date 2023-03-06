import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/components/Error.vue')
  },
  {
    path: '/winners',
    name: 'Winners_list',
    component: () => import('@/views/Winnerlist.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
