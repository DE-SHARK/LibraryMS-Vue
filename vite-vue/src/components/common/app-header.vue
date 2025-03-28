<template>
  <header :class="style.header">
    <div :class="style.logoArea">
      <img src="@/assets/logo.svg" alt="广东药科大学图书馆" :class="style.logo" />
      <div :class="style.logoText">
        <h1>广东药科大学图书馆</h1>
        <p>知识的殿堂，智慧的源泉</p>
      </div>
    </div>
    <div :class="style.navLinks">
      <el-menu mode="horizontal" :ellipsis="false" :class="style.menu">
        <el-menu-item index="1" @click="goToHome">首页</el-menu-item>
        <el-menu-item index="2">馆藏资源</el-menu-item>
        <el-menu-item index="3">借阅服务</el-menu-item>
        <el-menu-item index="4">座位预约</el-menu-item>
        <el-menu-item index="5">电子资源</el-menu-item>
      </el-menu>
    </div>
    <div :class="style.userArea">
      <el-dropdown>
          <span :class="style.userInfo">
            <el-avatar :size="32" :src="userAvatar" />
            <span>{{ userName }}</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
            <el-dropdown-item>我的借阅</el-dropdown-item>
            <el-dropdown-item>我的预约</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowDown } from '@element-plus/icons-vue';
import { useCssModule } from 'vue';
import { ElMessage } from 'element-plus';
import { logout, getCurrentUser } from '@/api/auth';

defineProps({
  activeIndex: {
    type: String,
    default: '1'
  }
});

const style = useCssModule();
const router = useRouter();
const userName = ref('加载中...');
const userAvatar = ref('/src/assets/avatar.svg');

// 添加跳转到个人中心的函数
const goToProfile = () => {
  router.push('/user/profile');
};
const goToHome = () => {
  router.push('/home');
};

const fetchUserInfo = async () => {
  try {
    const response = await getCurrentUser();
    if (response.data) {
      userName.value = response.data.username;
      if (response.data.avatar) {
        userAvatar.value = response.data.avatar;
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    ElMessage.error('获取用户信息失败');
  }
};

const handleLogout = async () => {
  try {
    await logout();
    ElMessage.success('已成功退出登录');
    router.push('/auth/sign-in');
  } catch (error) {
    console.error('登出错误:', error);
    ElMessage.error('登出失败，请稍后重试');
  }
};

fetchUserInfo();
</script>

<style lang="scss" module>
@use './app-header.module.scss';
</style>