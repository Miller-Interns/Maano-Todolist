import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import toDoList from '@/views/to-do-list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: toDoList,
    },
  ],
})

export default router
