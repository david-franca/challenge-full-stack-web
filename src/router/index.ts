import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: () => import('../layouts/LayoutBase.vue'),
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/UserList.vue'),
        },
        {
          path: '/students',
          name: 'students',
          component: () => import('../views/StudentList.vue'),
        },
      ],
    },
  ],
})

export default router
