import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/SignIn.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: () => import('../views/auth/SignIn.vue')
    },    {
      path: '/sign_up',
      name: 'signUp',
      component: () => import('../views/auth/SignUp.vue')
    }
  ]
})

export default router
