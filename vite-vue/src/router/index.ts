import { createRouter, createWebHistory } from 'vue-router'
import { tokenService } from '../api/auth'

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
      component: () => import('../views/auth/sign-in.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/auth/sign-up',
      name: 'SignUp',
      component: () => import('../views/auth/sign-up.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/book/search-results',
      name: 'SearchResults',
      component: () => import('../views/book/search-results.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/book/:isbn',
      name: 'BookDetail',
      component: () => import('../views/book/book-detail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:activeTab?',
      name: 'UserProfile',
      component: () => import('@/views/user/profile.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // 如果路由需要认证
  if (requiresAuth) {
    // 检查是否有令牌且未过期
    if (tokenService.getToken() && !tokenService.isTokenExpired()) {
      next() // 允许访问
    } else {
      // 重定向到登录页
      next({ name: 'SignIn' })
    }
  } else {
    // 不需要认证的路由直接放行
    next()
  }
})

export default router