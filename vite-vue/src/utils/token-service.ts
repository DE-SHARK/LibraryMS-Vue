// token-service.ts - JWT令牌管理服务

/**
 * 令牌信息接口
 */
interface TokenInfo {
  accessToken: string;
  expiresAt: number; // 过期时间戳
}

/**
 * 令牌服务 - 管理JWT访问令牌
 */
class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private tokenInfo: TokenInfo | null = null;

  constructor() {
    // 初始化时从localStorage加载令牌
    this.loadToken();
  }

  /**
   * 保存访问令牌
   * @param accessToken JWT访问令牌
   * @param expiresIn 过期时间(秒)
   */
  saveToken(accessToken: string, expiresIn: number = 3600): void {
    const expiresAt = Date.now() + expiresIn * 1000;
    this.tokenInfo = { accessToken, expiresAt };
    
    // 保存到localStorage
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this.tokenInfo));
  }

  /**
   * 获取访问令牌
   * @returns 访问令牌或null
   */
  getToken(): string | null {
    if (!this.tokenInfo) {
      return null;
    }
    return this.tokenInfo.accessToken;
  }

  /**
   * 清除令牌
   */
  clearToken(): void {
    this.tokenInfo = null;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * 检查令牌是否过期
   * @returns 是否过期
   */
  isTokenExpired(): boolean {
    if (!this.tokenInfo) {
      return true;
    }
    // 提前30秒判断过期，避免边界情况
    return Date.now() > this.tokenInfo.expiresAt - 30000;
  }

  /**
   * 从localStorage加载令牌
   */
  private loadToken(): void {
    const tokenStr = localStorage.getItem(this.TOKEN_KEY);
    if (tokenStr) {
      try {
        this.tokenInfo = JSON.parse(tokenStr);
      } catch (e) {
        console.error('解析令牌失败:', e);
        this.clearToken();
      }
    }
  }
}

// 创建单例实例
const tokenService = new TokenService();
export default tokenService;