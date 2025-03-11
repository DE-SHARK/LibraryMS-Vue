<template>
  <div :class="style.authContainer">
    <div :class="style.formWrapper">
      <!-- 标题 -->
      <div :class="style.logoContainer">
        <h1 :class="style.logoText">广东药科大学</h1>
        <span :class="style.logoSubtitle">图书馆</span>
      </div>

      <!-- 登录表单 -->
      <div :class="style.tabs">
        <div :class="[style.tab, style.active]">密码登录</div>
        <div :class="style.tab">验证码登录</div>
      </div>

      <div :class="style.authTip">您可在此区域使用 手机号 / 微信 / 用户名 登录</div>

      <el-form ref="signInForm" :model="formData" :rules="rules" :class="style.authForm">
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

        <div :class="style.agreement">
          <el-checkbox v-model="agreement">我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a></el-checkbox>
        </div>

        <el-button
            type="primary"
            :class="style.authButton"
            :disabled="!agreement"
            @click="handleSignIn"
        >登录</el-button>

        <div :class="style.actions">
          <span :class="style.rememberPwd">忘记密码</span>
          <span :class="style.register">立即注册</span>
        </div>

        <div :class="style.divider">
          <span>或</span>
        </div>

        <div :class="style.socialLogin">
          <el-button :class="style.wechatLogin">
            <i :class="style.wechatIcon"></i>
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

// 添加 CSS Modules 类型声明
import { useCssModule } from 'vue';
const style = useCssModule();

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
const signInForm = ref();  // 用于表单验证
const agreement = ref(false); // 用户协议勾选状态

// 提交登录
const handleSignIn = async () => {
  if (!agreement.value) {
    ElMessage.warning('请先阅读并同意用户协议与隐私政策');
    return;
  }

  try {
    await signInForm.value.validate();

    // 发送登录请求
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: formData.value.username,
      password: formData.value.password
    });

    // 修改这里的判断逻辑
    if (response.status === 200 && response.data.data?.accessToken) {
      // 登录成功，存储token
      localStorage.setItem('token', response.data.data.accessToken);
      ElMessage.success(response.data.message || '登录成功');

      // 跳转到首页
      await router.push('/home');
    } else {
      ElMessage.error(response.data.message || '登录失败，请检查用户名和密码');
    }
  } catch (error) {
    console.error('登录错误:', error);
    if (axios.isAxiosError(error) && error.response) {
      ElMessage.error(error.response.data.message || '登录失败，请稍后重试');
    } else {
      ElMessage.error('登录失败，请稍后重试');
    }
  }
};
</script>

<style lang="scss" module>
@use '../assets/scss/modules/sign-in.module.scss';
</style>