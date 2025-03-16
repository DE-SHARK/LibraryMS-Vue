import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { apiClient } from './auth'

// 定义图书接口数据类型
export interface Book {
  isbn: string
  title: string
  author: string
  publisher: string | null
  publishYear: number
  description: string | null
  coverImage: string | null
  availableCopies: number
}

// 定义搜索结果接口
export interface BookSearchResult {
  data: Book[]
  currentPage: number
  totalPages: number
  totalItems: number
}

// 定义API响应接口
export interface ApiResponse<T> {
  message?: string
  error?: string
  data?: T
  timestamp?: string
}

// 定义搜索参数接口
export interface BookSearchParams {
  keyword: string
  page?: number
  size?: number
  searchType?: 'title' | 'author' | 'subject'
}

/**
 * 搜索图书
 * @param params 搜索参数
 * @returns Promise<ApiResponse<BookSearchResult>>
 */
export const searchBooks = (params: BookSearchParams): Promise<ApiResponse<BookSearchResult>> => {
  // 构建查询参数
  const queryParams = {
    keyword: params.keyword,
    page: params.page || 1,
    size: params.size || 20
  }
  
  // 如果有搜索类型，添加到查询参数
  if (params.searchType) {
    Object.assign(queryParams, { type: params.searchType })
  }
  
  return apiClient.get('/books', { params: queryParams })
    .then((response: AxiosResponse<ApiResponse<BookSearchResult>>) => response.data)
}

/**
 * 获取图书详情
 * @param isbn 图书ISBN
 * @returns Promise<ApiResponse<Book>>
 */
export const getBookDetail = (isbn: string): Promise<ApiResponse<Book>> => {
  return apiClient.get(`/books/${isbn}`)
    .then((response: AxiosResponse<ApiResponse<Book>>) => response.data)
}