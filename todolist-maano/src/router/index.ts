import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import toDoList from '@/views/to-do-list.vue'
import { RouterNames } from '@/types/RouterNames'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouterNames.HOME,
      component: home,
    },
    {
      path: '/todolist',
      name: RouterNames.TODOLIST,
      component: toDoList,
    },
  ],
})

export default router
