<template>
  <div class="LibraryMS-container">
    <div class="signup-box">
      <div class="header">
        <div class="logo">LibraryMS <span class="platform-tag">开放平台</span></div>
      </div>
      
      <div class="signup-content">
        <div class="title-text">只需一个 LibraryMS 账号，即可访问 LibraryMS 的所有服务。</div>
        <div class="subtitle-text">请输入用户名和邮箱进行注册</div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-user"></i>
            <input type="text" placeholder="请输入用户名" />
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-email"></i>
            <input type="email" placeholder="请输入邮箱地址" />
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <input type="password" placeholder="请输入密码" />
            <i class="icon-eye"></i>
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <input type="password" placeholder="请再次输入密码" />
            <i class="icon-eye"></i>
          </div>
        </div>
        
        <div class="agreement">
          <input type="checkbox" id="agree" />
          <label for="agree">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></label>
        </div>
        
        <button class="signup-btn">注册</button>
        
        <div class="bottom-links">
          <a href="#" class="forgot-pwd">忘记密码</a>
          <a href="/sign_in" class="login-link">返回登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignIn = () => {
  router.push('/sign_in');
};
</script>

<style scoped>
.LibraryMS-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
}

.signup-box {
  width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.platform-tag {
  font-size: 14px;
  color: white;
  background-color: #000;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: normal;
}

.signup-content {
  padding: 10px 0;
}

.title-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 16px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 44px;
}

.phone-input {
  display: flex;
  align-items: center;
}

.country-code {
  display: flex;
  align-items: center;
  padding-right: 8px;
  border-right: 1px solid #eee;
  margin-right: 8px;
}

.icon-user:before {
  content: "👤";
}

.icon-email:before {
  content: "✉️";
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  font-size: 14px;
}

.icon-user, .icon-email, .icon-lock, .icon-eye, .icon-shield {
  width: 20px;
  color: #999;
  margin-right: 8px;
}

.icon-eye {
  margin-right: 0;
  margin-left: 8px;
  cursor: pointer;
}


.agreement {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.agreement input {
  margin-right: 8px;
}

.agreement a {
  color: #1890ff;
  text-decoration: none;
}

.signup-btn {
  width: 100%;
  height: 44px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
}

.bottom-links {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.bottom-links a {
  color: #666;
  text-decoration: none;
}
</style>
