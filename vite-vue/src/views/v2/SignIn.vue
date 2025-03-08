<template>
  <div class="LibraryMS-container">
    <div class="login-box">
      <div class="header">
        <div class="logo">LibraryMS <span class="platform-tag">开放平台</span></div>
      </div>
      
      <div class="form-content">
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-user"></i>
            <input type="text" placeholder="请输入用户名" />
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <input type="password" placeholder="请输入密码" />
            <i class="icon-eye"></i>
          </div>
        </div>
        
        <div class="agreement">
          <input type="checkbox" id="agree" />
          <label for="agree">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></label>
        </div>
        
        <button class="login-btn">登录</button>
        
        <div class="bottom-links">
          <a href="#" class="forgot-pwd">忘记密码</a>
          <a href="/sign_up" class="register-now">立即注册</a>
        </div>
        
        <div class="divider">
          <span>或</span>
        </div>
        
        <div class="wechat-login">
          <i class="icon-wechat"></i>
          <span>使用微信扫码登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignUp = () => {
  router.push('/sign_up');
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

.login-box {
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

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 0;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  color: #999;
}

.tab.active {
  color: #000;
  font-weight: 500;
}

.tab.active:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.form-content {
  padding: 10px 0;
}

.tip-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
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

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  font-size: 14px;
}

.icon-user, .icon-lock, .icon-eye {
  width: 20px;
  color: #999;
  margin-right: 8px;
}

.icon-user:before {
  content: "👤";
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

.login-btn {
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
  margin-bottom: 20px;
}

.bottom-links a {
  color: #666;
  text-decoration: none;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #999;
}

.divider:before, .divider:after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #eee;
}

.divider span {
  padding: 0 16px;
  font-size: 14px;
}

.wechat-login {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #07c160;
  font-size: 14px;
  cursor: pointer;
}

.icon-wechat {
  margin-right: 8px;
  font-size: 20px;
}
</style>
