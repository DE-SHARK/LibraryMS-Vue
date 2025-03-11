import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/SignIn.vue'

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
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: () => import('../views/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/reading-space',
      name: 'readingSpace',
      component: () => import('../views/Home.vue') // 暂时使用Home组件作为占位符
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/Home.vue') // 暂时使用Home组件作为占位符
    }
  ]
})

export default router
