<template>
  <div :class="$style.authContainer">
    <div :class="$style.formWrapper">
      <!-- 标题 -->
      <div :class="$style.logoContainer">
        <h1 :class="$style.logoText">广东药科大学</h1>
        <span :class="$style.logoSubtitle">图书馆</span>
      </div>

      <!-- 注册表单 -->
      <div :class="$style.formTitle">用户注册</div>

      <div :class="$style.authTip">请填写以下信息完成注册</div>

      <el-form ref="registerForm" :model="formData" :rules="rules" :class="$style.authForm">
        <el-form-item prop="username">
          <el-input
              v-model="formData.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
              v-model="formData.email"
              type="email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
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

        <el-form-item prop="confirmPassword">
          <el-input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="请确认密码"
              prefix-icon="el-icon-lock"
              show-password
          ></el-input>
        </el-form-item>

        <div :class="$style.agreement">
          <el-checkbox v-model="agreement">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></el-checkbox>
        </div>

        <el-button
            type="primary"
            :class="$style.authButton"
            :disabled="!agreement"
            @click="handleRegister"
        >注册</el-button>

        <div :class="$style.actions">
          <span>已有账号？</span>
          <router-link to="/login" :class="$style.loginLink">立即登录</router-link>
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
  email: string;
  password: string;
  confirmPassword: string;
}

// 表单数据定义
const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3到20个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        if (value !== formData.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const router = useRouter();
const registerForm = ref();
const agreement = ref(false);

// 提交注册
const handleRegister = async () => {
  if (!agreement.value) {
    ElMessage.warning('请先阅读并同意用户协议与隐私政策');
    return;
  }

  try {
    await registerForm.value.validate();

    // 发送注册请求
    const response = await axios.post('http://localhost:8080/api/auth/register', {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password
    });

    if (response.status === 200 && response.data.data) {
      ElMessage.success(response.data.message || '注册成功');
      // 注册成功后跳转到登录页面
      await router.push('/login');
    } else {
      ElMessage.error(response.data.message || '注册失败，请稍后重试');
    }
  } catch (error) {
    console.error('注册错误:', error);
    if (axios.isAxiosError(error) && error.response) {
      ElMessage.error(error.response.data.message || '注册失败，请稍后重试');
    } else {
      ElMessage.error('注册失败，请稍后重试');
    }
  }
};
</script>

<style lang="scss" module>
@import '../assets/scss/modules/sign-up.module.scss';
</style>