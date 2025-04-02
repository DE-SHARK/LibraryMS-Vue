<template>
  <div :class="style.searchResultsContainer">
    <!-- 顶部导航栏 -->
    <app-header></app-header>

    <!-- 主要内容区域 -->
    <main :class="style.mainContent">
      <!-- 搜索区域 -->
      <div :class="style.searchSection">
        <div :class="style.searchBox">
          <h2>图书搜索</h2>
          <div :class="style.searchInput">
            <el-input
              v-model="searchKeyword"
              placeholder="输入书名、作者或关键词"
              :prefix-icon="Search"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #append>
                <el-select v-model="searchType" placeholder="类型" style="width: 100px">
                  <el-option label="书名" value="title" />
                  <el-option label="作者" value="author" />
                  <el-option label="主题" value="subject" />
                </el-select>
              </template>
            </el-input>
            <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          </div>
        </div>
      </div>

      <!-- 搜索结果区域 -->
      <div :class="style.resultsSection">
        <div :class="style.resultsHeader">
          <h2 :class="style.sectionTitle">搜索结果</h2>
          <div :class="style.resultsInfo">
            <span>关键词: <strong>{{ route.query.keyword }}</strong></span>
            <span>类型: <strong>{{ searchTypeText }}</strong></span>
            <span>共找到 <strong>{{ totalItems }}</strong> 条结果</span>
          </div>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" :class="style.loadingContainer">
          <el-skeleton :rows="10" animated />
        </div>

        <!-- 无搜索结果 -->
        <el-empty v-else-if="books.length === 0" description="暂无搜索结果" :class="style.emptyResults">
          <template #image>
            <el-icon :size="60"><DocumentDelete /></el-icon>
          </template>
          <el-button type="primary" @click="router.push('/home')">返回首页</el-button>
        </el-empty>

        <!-- 搜索结果列表 -->
        <div v-else :class="style.bookList">
          <el-card v-for="book in books" :key="book.isbn" :class="style.bookItem">
            <div :class="style.bookContent">
              <div :class="style.bookCover">
                <img 
                  :src="book.coverImage || '/src/assets/book-placeholder.svg'" 
                  :alt="book.title" 
                  :class="style.coverImage"
                />
              </div>
              <div :class="style.bookDetails">
                <h3 :class="style.bookTitle">{{ book.title }}</h3>
                <p :class="style.bookAuthor">作者: {{ book.author }}</p>
                <p v-if="book.publisher" :class="style.bookPublisher">出版社: {{ book.publisher }}</p>
                <p v-if="book.publishYear" :class="style.bookYear">出版年份: {{ book.publishYear }}</p>
                <p :class="style.bookIsbn">ISBN: {{ book.isbn }}</p>
                <p v-if="book.description" :class="style.bookDescription">{{ book.description }}</p>
                <div :class="style.bookActions">
                  <el-tag v-if="book.availableCopies > 0" type="success">可用库存: {{ book.availableCopies }}本</el-tag>
                  <el-tag v-else type="info">暂无可借</el-tag>
                  <div :class="style.actionButtons">
                    <el-button type="primary" size="small" :disabled="book.availableCopies <= 0">借阅</el-button>
                    <el-button type="info" size="small" @click="goToBookDetail(book.isbn)">详情</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 分页 -->
        <div v-if="books.length > 0" :class="style.pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <app-footer></app-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Search, ArrowDown, DocumentDelete } from '@element-plus/icons-vue';
import { useCssModule } from 'vue';
import { ElNotification, ElMessage } from 'element-plus';

import { searchBooks, type Book, type BookSearchParams } from '@/api/books';
import AppFooter from "@/components/common/app-footer.vue";
import AppHeader from "@/components/common/app-header.vue";

// 定义组件名称
defineComponent({
  name: 'SearchResults'
});

// 获取 CSS Modules 样式
const style = useCssModule();

// 路由
const router = useRouter();
const route = useRoute();

// 搜索相关
const searchKeyword = ref(route.query.keyword as string || '');
const searchType = ref(route.query.type as string || 'title');
const searchTypeText = computed(() => {
  switch (searchType.value) {
    case 'title': return '书名';
    case 'author': return '作者';
    case 'subject': return '主题';
    default: return '书名';
  }
});

// 搜索结果相关
const books = ref<Book[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const pageSize = ref(20);
const totalItems = ref(0);
const totalPages = ref(0);

// 搜索图书
const fetchBooks = async () => {
  if (!searchKeyword.value) return;
  
  loading.value = true;
  
  try {
    const params: BookSearchParams = {
      keyword: searchKeyword.value,
      page: currentPage.value,
      size: pageSize.value,
      searchType: searchType.value as 'title' | 'author' | 'subject'
    };
    
    const response = await searchBooks(params);
    
    if (response?.data?.records) {
      books.value = response.data.records;
      totalItems.value = response.data.total;
      totalPages.value = response.data.pages;
      currentPage.value = response.data.current;
    } else {
      books.value = [];
      totalItems.value = 0;
      ElMessage.warning('未找到相关图书');
    }
  } catch (error) {
    console.error('搜索图书失败:', error);
    ElMessage.error('搜索图书失败，请稍后重试');
    books.value = [];
    totalItems.value = 0;
  } finally {
    loading.value = false;
  }
};

// 处理搜索
const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词');
    return;
  }

  // 重置分页
  currentPage.value = 1;

  // 更新路由参数，保持URL与搜索状态同步
  router.push({
    path: '/book/search-results',
    query: {
      keyword: searchKeyword.value,
      type: searchType.value
    }
  });

  // 执行搜索
  fetchBooks();
};

// 处理每页显示数量变化
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  fetchBooks();
};

// 处理页码变化
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchBooks();
};

// 跳转到图书详情页
const goToBookDetail = (isbn: string) => {
  router.push(`/book/${isbn}`);
};

// 监听路由参数变化
watch(
    () => route.query,
    (newQuery) => {
      if (newQuery.keyword !== undefined) {
        searchKeyword.value = newQuery.keyword as string;
      }
      if (newQuery.type !== undefined) {
        searchType.value = newQuery.type as string;
      }
      fetchBooks();
    },
    { immediate: false, deep: true }
);

// 组件挂载时执行
onMounted(() => {
  // 如果URL中有搜索参数，则执行搜索
  if (searchKeyword.value) {
    fetchBooks();
  } else {
    loading.value = false;
  }
});

</script>

<style lang="scss" module>
@use './search-results.module.scss';
</style>