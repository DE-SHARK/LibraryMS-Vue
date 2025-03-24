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
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
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
          <span :class="style.register" @click="handleRegister">立即注册</span>
        </div>

        <div :class="style.divider">
          <span>或</span>
        </div>

        <div :class="style.socialLogin">
          <el-button :class="style.wechatLogin">
            <el-icon><ChatDotRound /></el-icon>
            使用微信扫码登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue 核心库
import { ref, defineComponent } from 'vue';
import { useCssModule } from 'vue';

// 第三方库
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock, ChatDotRound } from '@element-plus/icons-vue';

// API 导入
import { login } from '@/api/auth';

// 定义组件名称
defineComponent({
  name: 'SignIn'
});

// 获取 CSS Modules 样式
const style = useCssModule();

// 类型定义
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

    // 使用封装的 API 发送登录请求
    const response = await login({
      username: formData.value.username,
      password: formData.value.password
    });

    // 登录成功，token已在login函数中保存
    ElMessage.success(response.message || '登录成功');

    // 跳转到首页
    await router.push('/home');
  } catch (error: any) {
    console.error('登录错误:', error);
    
    // 根据错误状态码提供更具体的错误信息
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        ElMessage.error('请求参数错误，请检查输入');
      } else if (status === 401) {
        ElMessage.error('用户名或密码错误');
      } else {
        ElMessage.error(error.response.data?.message || '登录失败，请稍后重试');
      }
    } else {
      ElMessage.error('网络错误，请检查网络连接');
    }
  }
};

// 添加注册跳转方法
const handleRegister = () => {
  router.push('/auth/sign-up');
};
</script>

<style lang="scss" module>
@use '@/views/auth/sign-in.module.scss';
</style>