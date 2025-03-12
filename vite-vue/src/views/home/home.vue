<template>
  <div :class="style.homeContainer">
    <!-- 顶部导航栏 -->
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
          <el-menu-item index="1">首页</el-menu-item>
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
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>我的借阅</el-dropdown-item>
              <el-dropdown-item>我的预约</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main :class="style.mainContent">
      <!-- 搜索区域 -->
      <div :class="style.searchSection">
        <div :class="style.searchBox">
          <h2>探索知识的海洋</h2>
          <p>在这里，你可以搜索到丰富的图书资源</p>
          <div :class="style.searchInput">
            <el-input
              v-model="searchKeyword"
              placeholder="输入书名、作者或关键词"
              :prefix-icon="Search"
              clearable
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

      <!-- 功能区域 -->
      <div :class="style.featuresSection">
        <h2 :class="style.sectionTitle">图书馆服务</h2>
        <div :class="style.featureCards">
          <el-card v-for="(feature, index) in features" :key="index" :class="style.featureCard">
            <div :class="style.featureIcon">
              <el-icon :size="40"><component :is="feature.icon" /></el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <el-button text type="primary">{{ feature.buttonText }}</el-button>
          </el-card>
        </div>
      </div>

      <!-- 新书推荐 -->
      <div :class="style.newBooksSection">
        <h2 :class="style.sectionTitle">新书推荐</h2>
        <el-carousel :interval="4000" type="card" height="320px">
          <el-carousel-item v-for="(book, index) in newBooks" :key="index">
            <el-card :body-style="{ padding: '0px' }" :class="style.bookCard">
              <img :src="book.cover" :class="style.bookCover" />
              <div :class="style.bookInfo">
                <h3>{{ book.title }}</h3>
                <p>作者: {{ book.author }}</p>
                <p>出版社: {{ book.publisher }}</p>
                <el-rate v-model="book.rating" disabled text-color="#ff9900" />
                <el-button type="primary" size="small">借阅</el-button>
              </div>
            </el-card>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 通知公告 -->
      <div :class="style.noticeSection">
        <h2 :class="style.sectionTitle">通知公告</h2>
        <div :class="style.noticeCards">
          <el-card v-for="(notice, index) in notices" :key="index" :class="style.noticeCard">
            <div :class="style.noticeHeader">
              <span :class="style.noticeTag">{{ notice.type }}</span>
              <span :class="style.noticeDate">{{ notice.date }}</span>
            </div>
            <h3 :class="style.noticeTitle">{{ notice.title }}</h3>
            <p :class="style.noticeContent">{{ notice.content }}</p>
            <el-button text type="primary">查看详情</el-button>
          </el-card>
        </div>
      </div>

      <!-- 图书馆概况 -->
      <div :class="style.libraryInfoSection">
        <h2 :class="style.sectionTitle">图书馆概况</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <div :class="style.libraryStats">
              <div :class="style.statItem">
                <h3>500,000+</h3>
                <p>馆藏图书</p>
              </div>
              <div :class="style.statItem">
                <h3>50,000+</h3>
                <p>电子期刊</p>
              </div>
              <div :class="style.statItem">
                <h3>1,000+</h3>
                <p>阅览座位</p>
              </div>
              <div :class="style.statItem">
                <h3>24小时</h3>
                <p>自习室</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div :class="style.libraryDesc">
              <p>广东药科大学图书馆创建于1958年，是学校文献信息资源中心、学术交流中心和校园文化中心。图书馆拥有丰富的馆藏资源，现代化的设施设备，专业的馆员团队，为全校师生提供优质的文献信息服务和学习研究环境。</p>
              <p>图书馆秉承"读者第一，服务至上"的理念，不断创新服务模式，提升服务质量，为学校的教学科研和人才培养提供有力支持。</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </main>

    <!-- 页脚 -->
    <footer :class="style.footer">
      <div :class="style.footerContent">
        <div :class="style.footerSection">
          <h3>联系我们</h3>
          <p>地址：广东省广州市番禺区大学城外环东路280号</p>
          <p>电话：020-12345678</p>
          <p>邮箱：library@gdpu.edu.cn</p>
        </div>
        <div :class="style.footerSection">
          <h3>开放时间</h3>
          <p>周一至周五：8:00 - 22:00</p>
          <p>周六至周日：9:00 - 21:00</p>
          <p>节假日：9:00 - 17:00</p>
        </div>
        <div :class="style.footerSection">
          <h3>快速链接</h3>
          <p><a href="#">学校主页</a></p>
          <p><a href="#">图书捐赠</a></p>
          <p><a href="#">常见问题</a></p>
        </div>
      </div>
      <div :class="style.copyright">
        <p>© 2023 广东药科大学图书馆 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Search, ArrowDown, Reading, Calendar, Document, Collection } from '@element-plus/icons-vue';
import { useCssModule } from 'vue';
import { ElNotification } from 'element-plus';

// 定义组件名称
defineComponent({
  name: 'Home'
});

// 获取 CSS Modules 样式
const style = useCssModule();

// 路由
const router = useRouter();

// 用户信息
const userName = ref('张同学');
const userAvatar = ref('/src/assets/avatar.svg');

// 搜索相关
const searchKeyword = ref('');
const searchType = ref('title');

// 功能卡片数据
const features = ref([
  {
    icon: Reading,
    title: '图书借阅',
    description: '便捷的图书借阅服务，支持线上预约和续借',
    buttonText: '立即借阅'
  },
  {
    icon: Calendar,
    title: '座位预约',
    description: '自习室座位在线预约，避免排队等待',
    buttonText: '预约座位'
  },
  {
    icon: Document,
    title: '电子资源',
    description: '丰富的电子书籍、期刊和数据库资源',
    buttonText: '浏览资源'
  },
  {
    icon: Collection,
    title: '馆际互借',
    description: '与其他高校图书馆资源共享，拓展学习资源',
    buttonText: '了解详情'
  }
]);

// 新书推荐数据
const newBooks = ref([
  {
    cover: 'https://img3.doubanio.com/view/subject/s/public/s33956867.jpg',
    title: '人工智能：现代方法（第4版）',
    author: 'Stuart Russell / Peter Norvig',
    publisher: '电子工业出版社',
    rating: 4.5
  },
  {
    cover: 'https://img2.doubanio.com/view/subject/s/public/s34227190.jpg',
    title: '药理学（第9版）',
    author: '朱依谆 / 殷明',
    publisher: '人民卫生出版社',
    rating: 4.8
  },
  {
    cover: 'https://img1.doubanio.com/view/subject/s/public/s34099286.jpg',
    title: '中国药典（2020年版）',
    author: '国家药典委员会',
    publisher: '中国医药科技出版社',
    rating: 5
  },
  {
    cover: 'https://img2.doubanio.com/view/subject/s/public/s34233151.jpg',
    title: '药物分析（第9版）',
    author: '杭太俊 / 季申',
    publisher: '人民卫生出版社',
    rating: 4.6
  }
]);

// 通知公告数据
const notices = ref([
  {
    type: '通知',
    date: '2023-06-15',
    title: '关于2023年暑假期间图书馆开放时间调整的通知',
    content: '根据学校安排，2023年暑假期间（7月10日至8月31日）图书馆开放时间调整为9:00-17:00，请广大师生合理安排时间。'
  },
  {
    type: '活动',
    date: '2023-06-10',
    title: '"阅读的力量"——2023年度读书分享会',
    content: '图书馆将于6月20日举办年度读书分享会，欢迎广大师生参加，分享阅读心得，交流学习体验。'
  },
  {
    type: '公告',
    date: '2023-06-05',
    title: '图书馆新增数据库资源使用指南',
    content: '图书馆近期新增了多个专业数据库资源，包括药学、医学等领域的核心期刊和研究资料，欢迎师生使用。'
  }
]);

// 生命周期钩子
onMounted(() => {
  // 显示欢迎通知
  ElNotification({
    title: '欢迎访问广东药科大学图书馆',
    message: '今日推荐：《人工智能：现代方法》，欢迎前往三楼计算机科学区借阅',
    type: 'success',
    duration: 5000,
    position: 'top-right'
  });
});

// 方法
const handleSearch = () => {
  console.log('搜索关键词:', searchKeyword.value, '类型:', searchType.value);
  // 实际项目中这里会调用API进行搜索
  if (searchKeyword.value) {
    ElNotification({
      title: '搜索提示',
      message: `正在搜索${searchType.value === 'title' ? '书名' : searchType.value === 'author' ? '作者' : '主题'}：${searchKeyword.value}`,
      type: 'info',
      duration: 3000
    });
  }
};

// 导入登出函数
import { logout } from '../../api/auth';

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

</script>

<style lang="scss" module>
@use '@/views/home/home.module.scss';
</style>