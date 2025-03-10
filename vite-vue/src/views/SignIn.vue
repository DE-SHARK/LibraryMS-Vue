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
            <input v-model="username" type="text" placeholder="请输入用户名" />
          </div>
        </div>
        
        <div class="input-group">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
            <i class="icon-eye"></i>
          </div>
        </div>
        
        <div class="agreement">
          <input v-model="rememberMe" type="checkbox" id="agree" />
          <label for="agree">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></label>
        </div>
        
        <button class="login-btn" :disabled="isLoading" @click="handleLogin">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
        
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
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码');
    return;
  }

  try {
    isLoading.value = true;
    console.log('正在发送登录请求...');
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: username.value,
      password: password.value
    });

    console.log('登录响应:', response);
    
    if (response.status === 200) {
      const token = response.data.data.accessToken;
      console.log('获取到的Token:', token);
      
      // 保存token到localStorage
      localStorage.setItem('accessToken', token);
      ElMessage.success('登录成功');
      
      // 添加1秒延迟以便用户看到成功提示
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    }
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
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

.form-content {
  padding: 10px 0;
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
