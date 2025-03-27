<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCssModule } from 'vue'
import { User, Edit, Setting, Message, Collection, Document } from '@element-plus/icons-vue'
import { getUserInfo, updateUserInfo } from '@/api/user'

interface UserInfo {
  username: string
  avatar: string
  studentId: string
  college: string
  major: string
  phone: string
  email: string
  borrowedCount: number
  reservedCount: number
  overdueCount: number
}

const style = useCssModule()
const router = useRouter()
const activeTab = ref('profile')

const userInfo = ref<UserInfo>({
  username: '',
  avatar: '',
  studentId: '',
  college: '',
  major: '',
  phone: '',
  email: '',
  borrowedCount: 0,
  reservedCount: 0,
  overdueCount: 0
})

const isEditing = ref(false)
const editForm = ref({
  phone: '',
  email: ''
})

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo()
    userInfo.value = res.data
    editForm.value = {
      phone: res.data.phone,
      email: res.data.email
    }
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
}

// 保存编辑信息
const handleSave = async () => {
  try {
    await updateUserInfo(editForm.value)
    await fetchUserInfo()
    isEditing.value = false
  } catch (error) {
    console.error('更新用户信息失败', error)
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div :class="style.profileContainer">
    <!-- 个人信息卡片 -->
    <el-card :class="style.userCard">
      <div :class="style.userHeader">
        <el-avatar :size="80" :src="userInfo.avatar" :class="style.avatar" />
        <div :class="style.userMeta">
          <h2>{{ userInfo.username }}</h2>
          <p>{{ userInfo.college }} · {{ userInfo.major }}</p>
          <p>学号: {{ userInfo.studentId }}</p>
        </div>
        <el-button :icon="Edit" circle @click="isEditing = !isEditing" />
      </div>

      <!-- 编辑表单 -->
      <el-form v-if="isEditing" :class="style.editForm">
        <el-form-item label="手机号">
          <el-input v-model="editForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <div :class="style.formActions">
          <el-button @click="isEditing = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-form>

      <!-- 统计信息 -->
      <div :class="style.stats">
        <div :class="style.statItem">
          <span :class="style.statNumber">{{ userInfo.borrowedCount }}</span>
          <span :class="style.statLabel">借阅中</span>
        </div>
        <div :class="style.statItem">
          <span :class="style.statNumber">{{ userInfo.reservedCount }}</span>
          <span :class="style.statLabel">预约中</span>
        </div>
        <div :class="style.statItem">
          <span :class="style.statNumber">{{ userInfo.overdueCount }}</span>
          <span :class="style.statLabel">已逾期</span>
        </div>
      </div>
    </el-card>

    <!-- 内容区域 -->
    <div :class="style.contentArea">
      <el-tabs v-model="activeTab" :class="style.tabs">
        <el-tab-pane label="个人资料" name="profile">
          <div :class="style.infoSection">
            <h3>基本信息</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
              <el-descriptions-item label="学号">{{ userInfo.studentId }}</el-descriptions-item>
              <el-descriptions-item label="学院">{{ userInfo.college }}</el-descriptions-item>
              <el-descriptions-item label="专业">{{ userInfo.major }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ userInfo.phone || '未设置' }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ userInfo.email || '未设置' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>

        <el-tab-pane label="我的借阅" name="borrow">
          <div :class="style.emptyState">
            <el-icon :size="60" :class="style.emptyIcon"><Collection /></el-icon>
            <p>暂无借阅记录</p>
            <el-button type="primary" @click="router.push('/book')">去借书</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="我的预约" name="reservation">
          <div :class="style.emptyState">
            <el-icon :size="60" :class="style.emptyIcon"><Document /></el-icon>
            <p>暂无预约记录</p>
            <el-button type="primary" @click="router.push('/seat')">预约座位</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './profile.module';
</style>