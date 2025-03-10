import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/v2/SignIn.vue'

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
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/v2/Home.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/v2/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: () => import('../views/v2/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/reading-space',
      name: 'readingSpace',
      component: () => import('../views/v2/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/v2/Home.vue') // 暂时使用Home组件作为占位符
    }
  ]
})

export default router
