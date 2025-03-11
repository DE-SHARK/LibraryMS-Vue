/// <reference types="vite/client" />

// 添加模块声明
declare module '@/api/auth' {
  export function login(params: { username: string; password: string }): Promise<any>;
  export function register(params: { username: string; email: string; password: string }): Promise<any>;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
