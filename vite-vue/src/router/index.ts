import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

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
      component: () => import('../views/v2/SignIn.vue')
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: () => import('../views/v2/SignUp.vue')
    }
  ]
})

export default router
