import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/auth/sign-in' // 重定向到登录页面
    },
    {
      path: '/auth/sign-in',
      name: 'SignIn',
      component: () => import('../views/auth/sign-in.vue')
    },
    {
      path: '/auth/sign-up',
      name: 'SignUp',
      component: () => import('../views/auth/sign-up.vue')
    }
  ]
})

export default router
