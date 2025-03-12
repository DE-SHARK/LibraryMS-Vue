import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 定义接口返回数据类型
interface ApiResponse<T> {
  message?: string
  error?: string
  data?: T
  timestamp?: string
}

// 登录接口返回数据类型
interface LoginResponse {
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
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 用户登录
 * @param params 登录参数
 * @returns Promise<ApiResponse<LoginResponse>>
 */
export const login = (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  return apiClient.post('/auth/login', params)
    .then((response: AxiosResponse<ApiResponse<LoginResponse>>) => response.data)
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