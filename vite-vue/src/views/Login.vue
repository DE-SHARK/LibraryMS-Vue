<template>
  <div class="login-container">
    <div class="form-container">
      <div class="form-header">
        <div :class="['tab', { active: activeTab === 'login' }]" @click="activeTab = 'login'">登录</div>
        <div :class="['tab', { active: activeTab === 'register' }]" @click="activeTab = 'register'">注册</div>
      </div>
      
      <!-- 登录表单 -->
      <div v-if="activeTab === 'login'" class="form-content">
        <h2>欢迎回来</h2>
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            @focus="focusField = 'username'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'username' }"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码"
            @focus="focusField = 'password'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'password' }"
          />
        </div>
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="loginForm.remember" />
            <label for="remember">记住我</label>
          </div>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>
        <button class="submit-btn" @click="handleLogin">登录</button>
      </div>
      
      <!-- 注册表单 -->
      <div v-if="activeTab === 'register'" class="form-content">
        <h2>创建账号</h2>
        <div class="form-group">
          <label for="reg-username">用户名</label>
          <input 
            type="text" 
            id="reg-username" 
            v-model="registerForm.username" 
            placeholder="请输入用户名"
            @focus="focusField = 'reg-username'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'reg-username' }"
          />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            type="email" 
            id="email" 
            v-model="registerForm.email" 
            placeholder="请输入邮箱"
            @focus="focusField = 'email'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'email' }"
          />
        </div>
        <div class="form-group">
          <label for="reg-password">密码</label>
          <input 
            type="password" 
            id="reg-password" 
            v-model="registerForm.password" 
            placeholder="请输入密码"
            @focus="focusField = 'reg-password'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'reg-password' }"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="registerForm.confirmPassword" 
            placeholder="请再次输入密码"
            @focus="focusField = 'confirm-password'"
            @blur="focusField = ''"
            :class="{ 'input-focus': focusField === 'confirm-password' }"
          />
        </div>
        <button class="submit-btn" @click="handleRegister">注册</button>
      </div>
      
      <!-- 社交媒体登录 -->
      <div class="social-login">
        <p>或者使用以下方式登录</p>
        <div class="social-icons">
          <div class="social-icon wechat">
            <i class="icon-wechat"></i>
          </div>
          <div class="social-icon qq">
            <i class="icon-qq"></i>
          </div>
          <div class="social-icon weibo">
            <i class="icon-weibo"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 当前激活的标签页
const activeTab = ref('login');
// 当前聚焦的输入框
const focusField = ref('');

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
});

// 注册表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 登录处理函数
const handleLogin = () => {
  console.log('登录表单提交', loginForm);
  // 这里添加登录逻辑
};

// 注册处理函数
const handleRegister = () => {
  console.log('注册表单提交', registerForm);
  // 这里添加注册逻辑
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
}

.form-container {
  width: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding-bottom: 20px;
}

.form-header {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.tab.active {
  color: #4a6cf7;
  border-bottom: 2px solid #4a6cf7;
}

.form-content {
  padding: 30px;
}

h2 {
  margin-top: 0;
  margin-bottom: 25px;
  color: #333;
  font-weight: 500;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
.input-focus {
  border-color: #4a6cf7;
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input {
  margin-right: 5px;
}

.forgot-password {
  color: #4a6cf7;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #3a5bd9;
}

.social-login {
  text-align: center;
  padding: 0 30px;
}

.social-login p {
  color: #999;
  margin-bottom: 15px;
  position: relative;
}

.social-login p::before,
.social-login p::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #eee;
}

.social-login p::before {
  left: 0;
}

.social-login p::after {
  right: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
}

.wechat {
  background-color: #07c160;
  color: white;
}

.qq {
  background-color: #12b7f5;
  color: white;
}

.weibo {
  background-color: #e6162d;
  color: white;
}

/* 简单的图标样式，实际项目中可以使用字体图标库 */
.icon-wechat:before {
  content: "W";
}

.icon-qq:before {
  content: "Q";
}

.icon-weibo:before {
  content: "微";
}

/* 响应式设计 */
@media (max-width: 480px) {
  .form-container {
    width: 90%;
    max-width: 400px;
  }
}
</style>
