<template>
  <div :class="style.bookDetailContainer">
    <!-- 顶部导航栏 -->
    <app-header></app-header>

    <!-- 主要内容区域 -->
    <main :class="style.mainContent">
      <!-- 返回按钮区域 -->
      <div :class="style.backSection">
        <a :class="style.backButton" @click="router.back()">
          <el-icon :class="style.icon"><ArrowLeft /></el-icon>
          返回
        </a>
      </div>

      <!-- 加载中 -->
      <div v-if="loading" :class="style.loadingContainer">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- 错误提示 -->
      <div v-else-if="error" :class="style.errorContainer">
        <el-icon :class="style.errorIcon"><CircleClose /></el-icon>
        <h2 :class="style.errorTitle">获取图书信息失败</h2>
        <p :class="style.errorMessage">{{ errorMessage }}</p>
        <el-button type="primary" @click="router.push('/home')">返回首页</el-button>
      </div>

      <!-- 图书详情区域 -->
      <div v-else :class="style.bookDetailSection">
        <div :class="style.bookContent">
          <!-- 图书封面区域 -->
          <div :class="style.bookCoverSection">
            <div :class="style.coverContainer">
              <img 
                :src="book.coverImageUrl || '/src/assets/book-placeholder.svg'" 
                :alt="book.title" 
                :class="style.coverImage"
              />
            </div>
            <div :class="style.borrowSection">
              <el-button 
                :class="style.borrowButton" 
                type="primary" 
                :disabled="!book.availableCopies || book.availableCopies <= 0"
                @click="handleBorrow"
              >
                借阅此书
              </el-button>
              <span 
                :class="[style.availabilityTag, book.availableCopies > 0 ? style.available : style.unavailable]"
              >
                {{ book.availableCopies > 0 ? `可借阅 (${book.availableCopies}本可用)` : '暂无可借' }}
              </span>
            </div>
          </div>

          <!-- 图书信息区域 -->
          <div :class="style.bookInfoSection">
            <h1 :class="style.bookTitle">{{ book.title }}</h1>
            
            <div :class="style.bookMeta">
              <div :class="style.metaItem">
                <span :class="style.metaLabel">作者</span>
                <span :class="style.metaValue">{{ book.author }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.publisher">
                <span :class="style.metaLabel">出版社</span>
                <span :class="style.metaValue">{{ book.publisher }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.publishedYear || book.publishYear">
                <span :class="style.metaLabel">出版年份</span>
                <span :class="style.metaValue">{{ book.publishedYear || book.publishYear }}</span>
              </div>
              <div :class="style.metaItem">
                <span :class="style.metaLabel">ISBN-13</span>
                <span :class="style.metaValue">{{ book.isbn }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.isbn10">
                <span :class="style.metaLabel">ISBN-10</span>
                <span :class="style.metaValue">{{ book.isbn10 }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.language">
                <span :class="style.metaLabel">语言</span>
                <span :class="style.metaValue">{{ book.language === 'chinese' ? '中文' : book.language }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.pageCount">
                <span :class="style.metaLabel">页数</span>
                <span :class="style.metaValue">{{ book.pageCount }}</span>
              </div>
              <div :class="style.metaItem" v-if="book.createdAt">
                <span :class="style.metaLabel">收录时间</span>
                <span :class="style.metaValue">{{ new Date(book.createdAt).toLocaleDateString() }}</span>
              </div>
            </div>

            <h2 :class="style.sectionTitle">图书简介</h2>
            <p :class="style.bookDescription">
              {{ book.description || '暂无图书简介' }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <app-footer></app-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft, CircleClose } from '@element-plus/icons-vue';
import { useCssModule } from 'vue';
import { ElMessage } from 'element-plus';

import { getBookDetail, type Book } from '@/api/books';
import AppFooter from "@/components/common/app-footer.vue";
import AppHeader from "@/components/common/app-header.vue";

// 定义组件名称
defineComponent({
  name: 'BookDetail'
});

// 获取 CSS Modules 样式
const style = useCssModule();

// 路由
const router = useRouter();
const route = useRoute();

// 图书详情数据
const book = ref<Book>({
  isbn: '',
  title: '',
  author: '',
});

// 加载状态
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

// 获取图书详情
const fetchBookDetail = async () => {
  const isbn = route.params.isbn as string;
  
  if (!isbn) {
    error.value = true;
    errorMessage.value = 'ISBN参数缺失，无法获取图书信息';
    loading.value = false;
    return;
  }
  
  try {
    const response = await getBookDetail(isbn);
    
    if (response?.data) {
      book.value = response.data;
    } else {
      error.value = true;
      errorMessage.value = '未找到相关图书信息';
    }
  } catch (err) {
    console.error('获取图书详情失败:', err);
    error.value = true;
    errorMessage.value = '获取图书信息失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

// 处理借阅
const handleBorrow = () => {
  if (!book.value.availableCopies || book.value.availableCopies <= 0) {
    ElMessage.warning('该书暂无可借阅的副本');
    return;
  }
  
  // 这里可以添加借阅逻辑，例如跳转到借阅确认页面或调用借阅API
  ElMessage.success('借阅请求已提交，请前往个人中心查看借阅状态');
};

// 组件挂载时执行
onMounted(() => {
  fetchBookDetail();
});
</script>

<style lang="scss" module>
@use './book-detail.module.scss';
</style>