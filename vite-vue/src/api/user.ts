import { apiClient } from '@/api/auth'
import type { AxiosResponse } from 'axios'

// 定义接口返回数据类型
interface ApiResponse<T> {
    message?: string
    error?: string
    data?: T
    timestamp?: string
}

// 用户详细信息接口
export interface UserDetailInfo {
    username: string
    email: string
    college?: string | null
    major?: string | null
    studentId?: string | null
    grade?: string | null
    admissionYear?: number | null
    className?: string | null
    degreeType?: string | null
    phone?: string | null
}

// 更新用户信息参数类型
interface UpdateUserParams {
    phone?: string
    email?: string
}

/**
 * 获取用户详细信息
 * @returns Promise<ApiResponse<UserDetailInfo>>
 */
export const getUserInfo = (): Promise<ApiResponse<UserDetailInfo>> => {
    console.log('正在调用 getUserInfo API...')
    return apiClient.get('/user/me')
        .then((response: AxiosResponse<ApiResponse<UserDetailInfo>>) => {
            console.log('getUserInfo API 响应成功:', response.data)
            return response.data
        })
        .catch(error => {
            console.error('getUserInfo API 调用失败:', error)
            console.log('错误详情:', error.response?.data || error.message)
            throw error
        })
}

/**
 * 更新用户信息
 * @param params 更新参数
 * @returns Promise<ApiResponse<UserDetailInfo>>
 */
export const updateUserInfo = (params: UpdateUserParams): Promise<ApiResponse<UserDetailInfo>> => {
    return apiClient.patch('/user/info', params)
        .then((response: AxiosResponse<ApiResponse<UserDetailInfo>>) => response.data)
}
