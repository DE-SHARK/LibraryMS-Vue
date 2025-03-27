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
    college: string
    major: string
    studentId: string
    grade: string
    admissionYear: number
    className: string
    degreeType: string
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
    return apiClient.get('/user/me')
        .then((response: AxiosResponse<ApiResponse<UserDetailInfo>>) => response.data)
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