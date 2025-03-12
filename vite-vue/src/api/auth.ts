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
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 允许跨域请求携带cookie
})

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
          const response = await axios.post<ApiResponse<AuthToken>>(
            'http://localhost:8080/api/auth/refresh', 
            {}, 
            { withCredentials: true }
          )
          
          const { accessToken } = response.data.data!
          
          // 保存新令牌
          tokenService.saveToken(accessToken)
          
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
  return apiClient.post('/auth/logout')
    .then((response: AxiosResponse<ApiResponse<void>>) => {
      // 清除令牌
      tokenService.clearToken()
      return response.data
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