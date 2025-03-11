import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/auth/sign-in.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: SignIn
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: () => import('../views/auth/sign-in.vue')
    },    {
      path: '/sign_up',
      name: 'signUp',
      component: () => import('../views/auth/sign-up.vue')
    }
  ]
})

export default router
