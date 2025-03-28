import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import tokenService from '../utils/token-service'

// 定义接口返回数据类型
interface ApiResponse<T> {
  message?: string
  error?: string
  data?: T
  timestamp?: string
}

// 登录接口返回数据类型
interface AuthToken {
  accessToken: string
}

// 登录参数类型
interface LoginParams {
  username: string
  password: string
}

// 注册参数类型
interface RegisterParams {
  username: string
  email: string
  password: string
}

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://192.168.5.58:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 允许跨域请求携带cookie
})

// 导出apiClient以供其他模块使用
export { apiClient };

// 请求拦截器 - 添加认证令牌
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = tokenService.getToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 标记是否正在刷新令牌
let isRefreshing = false
// 等待令牌刷新的请求队列
let refreshSubscribers: ((token: string) => void)[] = []

// 将请求添加到队列
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

// 执行队列中的请求
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token))
  refreshSubscribers = []
}

// 响应拦截器 - 处理令牌过期
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    
    // 如果是401错误且不是刷新令牌请求本身
    if (error.response?.status === 401 && 
        originalRequest && 
        originalRequest.url !== '/auth/refresh') {
      
      if (!isRefreshing) {
        isRefreshing = true
        
        try {
          // 尝试刷新令牌
          const response = await apiClient.post<ApiResponse<AuthToken>>(
              '/auth/refresh',
              {},
              { withCredentials: true }
          )
          
          const { accessToken } = response.data.data!
          
          // 保存新令牌
          tokenService.saveToken(accessToken)
          console.info("令牌刷新成功")
          // 通知所有等待的请求
          onTokenRefreshed(accessToken)
          
          // 重试原始请求
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
          }
          
          return apiClient(originalRequest)
        } catch (refreshError) {
          // 刷新令牌失败，需要重新登录
          tokenService.clearToken()
          // 添加错误提示
          ElMessage.error('会话已过期，请重新登录')
          // 重定向到登录页
          window.location.href = '/auth/sign-in'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      } else {
        // 如果已经在刷新令牌，将请求加入队列
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`
            }
            resolve(apiClient(originalRequest))
          })
        })
      }
    }
    
    return Promise.reject(error)
  }
)

/**
 * 用户登录
 * @param params 登录参数
 * @returns Promise<ApiResponse<AuthToken>>
 */
export const login = (params: LoginParams): Promise<ApiResponse<AuthToken>> => {
  return apiClient.post('/auth/login', params)
    .then((response: AxiosResponse<ApiResponse<AuthToken>>) => {
      // 保存访问令牌
      if (response.data.data?.accessToken) {
        tokenService.saveToken(response.data.data.accessToken)
      }
      return response.data
    })
}

/**
 * 用户注册
 * @param params 注册参数
 * @returns Promise<ApiResponse<void>>
 */
export const register = (params: RegisterParams): Promise<ApiResponse<void>> => {
  return apiClient.post('/auth/register', params)
    .then((response: AxiosResponse<ApiResponse<void>>) => response.data)
}

/**
 * 用户登出
 * @returns Promise<ApiResponse<void>>
 */
export const logout = (): Promise<ApiResponse<void>> => {
  // 清除令牌和用户信息
  tokenService.clearToken()
  localStorage.removeItem('userInfo')

  // 直接返回成功的响应对象
  return Promise.resolve({
    success: true,
    data: undefined,
    message: '登出成功'
  })
}

/**
 * 手动刷新令牌
 * @returns Promise<ApiResponse<AuthToken>>
 */
export const refreshToken = (): Promise<ApiResponse<AuthToken>> => {
  return apiClient.post('/auth/refresh')
    .then((response: AxiosResponse<ApiResponse<AuthToken>>) => {
      if (response.data.data?.accessToken) {
        tokenService.saveToken(response.data.data.accessToken)
      }
      return response.data
    })
}

export { tokenService }

// 用户信息接口
interface UserInfo {
  username: string;
  email?: string;
  avatar?: string;
  // 可以根据需要添加更多字段
}

/**
 * 获取当前登录用户信息
 * @returns Promise<ApiResponse<UserInfo>>
 */
export const getCurrentUser = (): Promise<ApiResponse<UserInfo>> => {
  // 先尝试从本地存储获取用户信息
  const cachedUserInfo = localStorage.getItem('userInfo')
  
  if (cachedUserInfo) {
    // 如果本地有缓存的用户信息，直接返回
    return Promise.resolve({
      data: JSON.parse(cachedUserInfo),
      message: '从缓存获取用户信息成功'
    })
  }
  
  // 如果本地没有缓存，尝试从token中解析
  const token = tokenService.getToken()
  
  if (token) {
    try {
      // 解析JWT令牌（令牌格式：header.payload.signature）
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(window.atob(base64))
      
      // 从payload中提取用户信息
      const userInfo: UserInfo = {
        username: payload.username || payload.sub || '用户',
        email: payload.email,
        avatar: payload.avatar || '/src/assets/avatar.svg'
      }
      
      // 将解析出的用户信息存入本地存储
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      
      return Promise.resolve({
        data: userInfo,
        message: '从令牌解析用户信息成功'
      })
    } catch (error) {
      console.error('解析令牌失败:', error)
    }
  }
  
  // 如果本地存储和令牌都无法获取用户信息，则调用API
  return apiClient.get('/auth/current-user')
    .then((response: AxiosResponse<ApiResponse<UserInfo>>) => {
      // 将API返回的用户信息存入本地存储
      if (response.data.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.data))
      }
      return response.data
    })
}