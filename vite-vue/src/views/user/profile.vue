<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCssModule } from 'vue'
import { User, Edit, Setting, Message, Collection, Document, Lock, Bell, Star } from '@element-plus/icons-vue'
import { getUserInfo, updateUserInfo } from '@/api/user'
import type { UserDetailInfo } from '@/api/user'

interface UserInfo extends UserDetailInfo {
  avatar: string
  phone?: string
  borrowedCount: number
  reservedCount: number
  overdueCount: number
}

const style = useCssModule()
const router = useRouter()
const activeTab = ref('profile')

// 用户信息
const userInfo = ref<UserInfo>({
  username: '',
  email: '',
  college: '',
  major: '',
  studentId: '',
  grade: '',
  admissionYear: 0,
  className: '',
  degreeType: '',
  avatar: '/src/assets/avatar.svg',
  phone: '',
  borrowedCount: 0,
  reservedCount: 0,
  overdueCount: 0
})

// 编辑表单
const isEditing = ref(false)
const editForm = reactive({
  phone: '',
  email: ''
})

// 消息通知设置
const notificationSettings = reactive({
  emailNotification: true,
  smsNotification: true,
  borrowReminder: true,
  returnReminder: true,
  activityNotification: false
})

// 安全设置
const securityForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    console.group('获取用户信息流程')
    console.log('开始获取用户信息...')
    
    const res = await getUserInfo()
    console.log('原始API响应:', JSON.parse(JSON.stringify(res)))
    
    if (res.data) {
      console.log('解析到的用户数据:', JSON.parse(JSON.stringify(res.data)))
      
      // 处理异常数据
      const sanitizedData = {
        ...res.data,
        college: res.data.college && !res.data.college.includes('ACTIVE') ? res.data.college : '未知学院',
        major: res.data.major && !res.data.major.match(/\d{4}-\d{2}-\d{2}/) ? res.data.major : '未知专业',
        studentId: res.data.studentId || '未分配',
        grade: res.data.grade || '未知年级',
        admissionYear: res.data.admissionYear || new Date().getFullYear(),
        className: res.data.className || '未知班级',
        degreeType: res.data.degreeType || '未知学历'
      }
      
      console.log('处理后的用户数据:', sanitizedData)
      
      // 合并数据
      userInfo.value = {
        ...userInfo.value,
        ...sanitizedData,
        borrowedCount: 2,
        reservedCount: 1,
        overdueCount: 0
      }
      
      console.log('最终用户信息对象:', JSON.parse(JSON.stringify(userInfo.value)))
      
      // 更新编辑表单
      editForm.phone = userInfo.value.phone || ''
      editForm.email = userInfo.value.email || ''
    } else {
      console.warn('API返回数据为空')
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    ElMessage.error('获取用户信息失败，请稍后重试')
  } finally {
    console.groupEnd()
  }
}

// 保存编辑信息
const handleSave = async () => {
  try {
    await updateUserInfo({
      phone: editForm.phone,
      email: editForm.email
    })
    await fetchUserInfo()
    isEditing.value = false
    ElMessage.success('个人信息更新成功')
  } catch (error) {
    console.error('更新用户信息失败', error)
    ElMessage.error('更新用户信息失败，请稍后重试')
  }
}

// 保存通知设置
const saveNotificationSettings = () => {
  // 模拟API调用
  setTimeout(() => {
    ElMessage.success('通知设置已更新')
  }, 500)
}

// 修改密码
const changePassword = () => {
  // 表单验证
  if (!securityForm.oldPassword || !securityForm.newPassword || !securityForm.confirmPassword) {
    ElMessage.warning('请填写完整的密码信息')
    return
  }
  
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }
  
  // 模拟API调用
  setTimeout(() => {
    ElMessage.success('密码修改成功')
    // 重置表单
    securityForm.oldPassword = ''
    securityForm.newPassword = ''
    securityForm.confirmPassword = ''
  }, 800)
}

// 借阅记录数据
const borrowRecords = ref([
  {
    id: '1',
    bookName: '计算机网络：自顶向下方法',
    borrowDate: '2023-10-15',
    returnDate: '2023-11-15',
    status: '借阅中'
  },
  {
    id: '2',
    bookName: '深入理解计算机系统',
    borrowDate: '2023-09-20',
    returnDate: '2023-10-20',
    status: '借阅中'
  }
])

// 预约记录数据
const reservationRecords = ref([
  {
    id: '1',
    type: '自习座位',
    location: '图书馆三楼 A区-125',
    date: '2023-10-18',
    time: '14:00-18:00',
    status: '已预约'
  }
])

// 收藏记录
const favoriteBooks = ref([])

onMounted(() => {
  fetchUserInfo()
})
</script>

<template>
  <div :class="style.profileContainer">
    <!-- 顶部信息卡片 -->
    <el-card :class="style.userCard" :body-style="{ padding: 0 }">
      <div :class="style.cardHeader"></div>
      
      <div :class="style.userInfo">
        <el-avatar :size="100" :src="userInfo.avatar" :class="style.avatar" />
        <div :class="style.userMeta">
          <h2>{{ userInfo.username }}</h2>
          <p>{{ userInfo.college }} · {{ userInfo.major }}</p>
          <p>学号: {{ userInfo.studentId }}</p>
        </div>
        <el-button :icon="Edit" circle @click="isEditing = !isEditing" :class="style.editButton" />
      </div>

      <!-- 编辑表单 -->
      <el-collapse-transition>
        <el-form v-if="isEditing" :class="style.editForm" label-position="top">
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
      </el-collapse-transition>

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
      <el-tabs v-model="activeTab" :class="style.tabs" tab-position="left">
        <!-- 个人资料 -->
        <el-tab-pane name="profile">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </div>
          </template>
          
          <div :class="style.infoSection">
            <h3>基本信息</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
              <el-descriptions-item label="学号">{{ userInfo.studentId }}</el-descriptions-item>
              <el-descriptions-item label="学院">{{ userInfo.college }}</el-descriptions-item>
              <el-descriptions-item label="专业">{{ userInfo.major }}</el-descriptions-item>
              <el-descriptions-item label="年级">{{ userInfo.grade }}</el-descriptions-item>
              <el-descriptions-item label="班级">{{ userInfo.className }}</el-descriptions-item>
              <el-descriptions-item label="学历">{{ userInfo.degreeType }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ userInfo.phone || '未设置' }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ userInfo.email || '未设置' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-tab-pane>

        <!-- 我的借阅 -->
        <el-tab-pane name="borrow">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><Collection /></el-icon>
              <span>我的借阅</span>
            </div>
          </template>
          
          <div v-if="borrowRecords.length > 0" :class="style.recordsSection">
            <h3>借阅记录</h3>
            <el-table :data="borrowRecords" style="width: 100%" :class="style.recordsTable">
              <el-table-column prop="bookName" label="图书名称" />
              <el-table-column prop="borrowDate" label="借阅日期" width="120" />
              <el-table-column prop="returnDate" label="应还日期" width="120" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.status === '借阅中' ? 'primary' : 'info'">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default>
                  <el-button type="primary" link>续借</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          
          <div v-else :class="style.emptyState">
            <el-icon :size="60" :class="style.emptyIcon"><Collection /></el-icon>
            <p>暂无借阅记录</p>
            <el-button type="primary" @click="router.push('/book')">去借书</el-button>
          </div>
        </el-tab-pane>

        <!-- 我的预约 -->
        <el-tab-pane name="reservation">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><Document /></el-icon>
              <span>我的预约</span>
            </div>
          </template>
          
          <div v-if="reservationRecords.length > 0" :class="style.recordsSection">
            <h3>预约记录</h3>
            <el-table :data="reservationRecords" style="width: 100%" :class="style.recordsTable">
              <el-table-column prop="type" label="预约类型" width="120" />
              <el-table-column prop="location" label="位置" />
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="time" label="时间" width="120" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.status === '已预约' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default>
                  <el-button type="danger" link>取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          
          <div v-else :class="style.emptyState">
            <el-icon :size="60" :class="style.emptyIcon"><Document /></el-icon>
            <p>暂无预约记录</p>
            <el-button type="primary" @click="router.push('/seat')">预约座位</el-button>
          </div>
        </el-tab-pane>
        
        <!-- 我的收藏 -->
        <el-tab-pane name="favorites">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><Star /></el-icon>
              <span>我的收藏</span>
            </div>
          </template>
          
          <div v-if="favoriteBooks.length > 0" :class="style.recordsSection">
            <h3>收藏图书</h3>
            <!-- 收藏图书列表 -->
          </div>
          
          <div v-else :class="style.emptyState">
            <el-icon :size="60" :class="style.emptyIcon"><Star /></el-icon>
            <p>暂无收藏图书</p>
            <el-button type="primary" @click="router.push('/book')">去浏览图书</el-button>
          </div>
        </el-tab-pane>
        
        <!-- 消息通知 -->
        <el-tab-pane name="notifications">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><Bell /></el-icon>
              <span>消息通知</span>
            </div>
          </template>
          
          <div :class="style.settingsSection">
            <h3>通知设置</h3>
            <el-form label-position="left" label-width="120px">
              <el-form-item label="邮件通知">
                <el-switch v-model="notificationSettings.emailNotification" />
              </el-form-item>
              <el-form-item label="短信通知">
                <el-switch v-model="notificationSettings.smsNotification" />
              </el-form-item>
              <el-form-item label="借阅到期提醒">
                <el-switch v-model="notificationSettings.borrowReminder" />
              </el-form-item>
              <el-form-item label="还书提醒">
                <el-switch v-model="notificationSettings.returnReminder" />
              </el-form-item>
              <el-form-item label="活动通知">
                <el-switch v-model="notificationSettings.activityNotification" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveNotificationSettings">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 安全设置 -->
        <el-tab-pane name="security">
          <template #label>
            <div :class="style.tabLabel">
              <el-icon><Lock /></el-icon>
              <span>安全设置</span>
            </div>
          </template>
          
          <div :class="style.settingsSection">
            <h3>修改密码</h3>
            <el-form label-position="left" label-width="120px">
              <el-form-item label="当前密码">
                <el-input v-model="securityForm.oldPassword" type="password" show-password placeholder="请输入当前密码" />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="securityForm.newPassword" type="password" show-password placeholder="请输入新密码" />
              </el-form-item>
              <el-form-item label="确认新密码">
                <el-input v-model="securityForm.confirmPassword" type="password" show-password placeholder="请再次输入新密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePassword">修改密码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" module>
@use './profile.module.scss';
</style>
