<template>
  <div class="LibraryMS-container">
    <div class="signup-box">
      <div class="header">
        <div class="logo">LibraryMS <span class="platform-tag">开放平台</span></div>
      </div>

      <el-form ref="signupForm" :model="formData" :rules="rules" class="signup-content">
        <div class="title-text">只需一个 LibraryMS 账号，即可访问 LibraryMS 的所有服务。</div>
        <div class="subtitle-text">请输入用户名和邮箱进行注册</div>

        <el-form-item prop="username">
          <div class="input-wrapper">
            <i class="icon-user"></i>
            <el-input v-model="formData.username" placeholder="请输入用户名" clearable />
          </div>
        </el-form-item>

        <el-form-item prop="email">
          <div class="input-wrapper">
            <i class="icon-email"></i>
            <el-input v-model="formData.email" placeholder="请输入邮箱地址" type="email" clearable />
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <el-input v-model="formData.password" placeholder="请输入密码" type="password" show-password />
          </div>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <div class="input-wrapper">
            <i class="icon-lock"></i>
            <el-input v-model="formData.confirmPassword" placeholder="请再次输入密码" type="password" show-password />
          </div>
        </el-form-item>

        <div class="agreement">
          <el-checkbox v-model="isAgreed" id="agree" />
          <label for="agree">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></label>
        </div>

        <el-button
            :loading="isLoading"
            class="signup-btn"
            @click="handleSignUp"
        >
          注册
        </el-button>

        <div class="bottom-links">
          <a href="#" class="forgot-pwd">忘记密码</a>
          <a href="/sign_in" class="login-link">返回登录</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';

// 添加类型定义
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 表单数据定义
const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const router = useRouter();
const signupForm = ref();  // 用于表单验证
const isAgreed = ref(false);
const isLoading = ref(false);

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6到20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

// 提交注册
const handleSignUp = async () => {
  try {
    // 验证表单
    await signupForm.value.validate();
    
    if (!isAgreed.value) {
      ElMessage.warning('请先同意用户协议和隐私政策');
      return;
    }

    isLoading.value = true;

    const { confirmPassword, ...registerData } = formData.value;

    const response = await axios.post('http://localhost:8080/api/auth/register', registerData);

    if (response.data) {
      ElMessage.success('注册成功');
      router.push('/sign_in');
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      ElMessage.error('用户名或邮箱已存在');
    } else {
      ElMessage.error('注册失败，请稍后重试');
    }
  } finally {
    isLoading.value = false;
  }
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

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  height: 44px;
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

.icon-user, .icon-email, .icon-lock {
  width: 20px;
  color: #999;
  margin-right: 8px;
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
