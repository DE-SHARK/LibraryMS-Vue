<template>
  <div class="lms-auth-container">
    <div class = lms-auth-form-wrapper>

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


const router = useRouter();
const signinForm = ref();  // 用于表单验证

// 提交登录
const handleSignIn = async () => {

};

</script>

<style scoped>

</style>
