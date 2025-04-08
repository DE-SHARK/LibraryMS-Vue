import type { AxiosResponse } from 'axios'
import { apiClient } from '@/api/auth'

// 定义接口返回数据类型
interface ApiResponse<T> {
  message?: string
  error?: string
  data?: T
  timestamp?: string
}

// 定义评论数据类型
export interface Comment {
  id: number
  bookIsbn: string
  userId: number
  userName: string
  content: string
  createdAt: string
}

// 定义评论列表返回类型
export interface CommentListResult {
  total: number
  comments: Comment[]
}

// 定义评论提交参数类型
export interface AddCommentParams {
  bookIsbn: string
  content: string
}

/**
 * 获取图书评论列表
 * @param isbn 图书ISBN
 * @param page 页码，默认1
 * @param size 每页数量，默认10
 * @returns Promise<ApiResponse<CommentListResult>>
 */
export const getBookComments = (
  isbn: string,
  page: number = 1,
  size: number = 10
): Promise<ApiResponse<CommentListResult>> => {
  return apiClient.get(`/books/${isbn}/comments`, {
    params: { page, size }
  })
    .then((response: AxiosResponse<ApiResponse<CommentListResult>>) => response.data)
}

/**
 * 添加图书评论
 * @param params 评论参数
 * @returns Promise<ApiResponse<Comment>>
 */
export const addBookComment = (params: AddCommentParams): Promise<ApiResponse<Comment>> => {
  return apiClient.post(`/books/${params.bookIsbn}/comments`, {
    content: params.content
  })
    .then((response: AxiosResponse<ApiResponse<Comment>>) => response.data)
}