<template>
  <div class="lms-auth-container">
    <div class="lms-auth-form-wrapper">
      <!-- 标题 -->
      <div class="logo-container">
        <h1 class="logo-text">广东药科大学</h1>
        <span class="logo-subtitle">图书馆</span>
      </div>

      <!-- 登录表单 -->
      <div class="tabs">
        <div class="tab active">密码登录</div>
        <div class="tab">验证码登录</div>
      </div>

      <div class="login-tip">您可在此区域使用 手机号 / 微信 / 用户名 登录</div>

      <el-form ref="signinForm" :model="formData" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input 
            v-model="formData.username" 
            placeholder="请输入手机号/用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="formData.password" 
            type="password" 
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <div class="agreement">
          <el-checkbox v-model="agreement">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></el-checkbox>
        </div>

        <el-button 
          type="primary" 
          class="login-button" 
          :disabled="!agreement"
          @click="handleSignIn"
        >登录</el-button>

        <div class="actions">
          <span class="remember-pwd">记住密码</span>
          <span class="register">立即注册</span>
        </div>

        <div class="divider">
          <span>或</span>
        </div>

        <div class="social-login">
          <el-button class="wechat-login">
            <i class="wechat-icon"></i>
            使用微信扫码登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 添加类型定义
interface FormData {
  username: string;
  password: string;
}

// 表单数据定义
const formData = ref<FormData>({
  username: '',
  password: '',
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名/邮箱/手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
};

const router = useRouter();
const signinForm = ref();  // 用于表单验证
const agreement = ref(false); // 用户协议勾选状态

// 提交登录
const handleSignIn = async () => {
  if (!agreement.value) {
    ElMessage.warning('请先阅读并同意用户协议与隐私政策');
    return;
  }

  try {
    await signinForm.value.validate();
    
    // 发送登录请求
    const response = await axios.post('localhost:8080/api/auth/login', {
      username: formData.value.username,
      password: formData.value.password
    });
    
    if (response.data.code === 200) {
      // 登录成功，存储token
      localStorage.setItem('token', response.data.token);
      ElMessage.success('登录成功');
      
      // 跳转到首页
      router.push('/dashboard');
    } else {
      ElMessage.error(response.data.message || '登录失败，请检查用户名和密码');
    }
  } catch (error) {
    console.error('登录错误:', error);
    ElMessage.error('登录失败，请稍后重试');
  }
};
</script>

<style scoped>
.lms-auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.lms-auth-form-wrapper {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.logo-container {
  text-align: center;
  margin-bottom: 30px;
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.logo-subtitle {
  display: inline-block;
  background-color: #333;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 8px;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 0;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #000;
  font-weight: bold;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.login-tip {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.login-form {
  margin-bottom: 20px;
}

.agreement {
  margin-bottom: 20px;
  font-size: 14px;
}

.agreement a {
  color: #1890ff;
  text-decoration: none;
}

.login-button {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #000;
  border-color: #000;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.remember-pwd, .register {
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
}

.divider span {
  padding: 0 10px;
  color: #999;
}

.social-login {
  margin-bottom: 20px;
}

.wechat-login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
}

.wechat-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #07C160;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
