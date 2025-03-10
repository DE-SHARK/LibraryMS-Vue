<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="图书馆管理系统" class="logo" />
        <h1 class="site-title">智慧图书馆</h1>
      </div>
      <nav class="nav-menu">
        <router-link to="/home" class="nav-item active">首页</router-link>
        <router-link to="/books" class="nav-item">图书检索</router-link>
        <router-link to="/borrow" class="nav-item">借阅管理</router-link>
        <router-link to="/reading-space" class="nav-item">阅读空间</router-link>
        <router-link to="/events" class="nav-item">活动公告</router-link>
      </nav>
      <div class="user-actions">
        <div class="user-info">
          <img src="../assets/avatar.svg" alt="用户头像" class="avatar" />
          <span class="username">游客</span>
        </div>
        <button class="logout-btn">退出</button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 轮播图区域 -->
      <section class="hero-section">
        <div class="carousel">
          <div class="carousel-item active">
<!--            <img src="../../assets/banner1.jpg" alt="图书馆新馆开放" />-->
            <div class="carousel-caption">
              <h2>欢迎来到智慧图书馆</h2>
              <p>知识的海洋，智慧的殿堂</p>
            </div>
          </div>
        </div>
        <div class="carousel-indicators">
          <span class="indicator active"></span>
          <span class="indicator"></span>
          <span class="indicator"></span>
        </div>
      </section>

      <!-- 快速服务区域 -->
      <section class="quick-services">
        <h2 class="section-title">快速服务</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon book-search"></div>
            <h3>图书检索</h3>
            <p>快速查找您需要的图书资源</p>
            <button class="service-btn">立即使用</button>
          </div>
          <div class="service-card">
            <div class="service-icon book-borrow"></div>
            <h3>借阅管理</h3>
            <p>查看当前借阅和历史记录</p>
            <button class="service-btn">立即使用</button>
          </div>
          <div class="service-card">
            <div class="service-icon reading-room"></div>
            <h3>阅览室预约</h3>
            <p>预约安静舒适的阅读空间</p>
            <button class="service-btn">立即使用</button>
          </div>
          <div class="service-card">
            <div class="service-icon digital-resource"></div>
            <h3>电子资源</h3>
            <p>浏览丰富的电子书和期刊</p>
            <button class="service-btn">立即使用</button>
          </div>
        </div>
      </section>

      <!-- 新书推荐区域 -->
      <section class="new-books">
        <h2 class="section-title">新书推荐</h2>
        <div class="books-carousel">
          <div class="book-card">
            <div class="book-cover">
<!--              <img src="@/assets/book1.jpg" alt="书籍封面" />-->
            </div>
            <div class="book-info">
              <h3 class="book-title">人工智能导论</h3>
              <p class="book-author">作者: 李明</p>
              <p class="book-category">分类: 计算机科学</p>
              <div class="book-rating">
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star"></span>
                <span class="rating-value">4.0</span>
              </div>
              <button class="borrow-btn">借阅</button>
            </div>
          </div>
          <div class="book-card">
            <div class="book-cover">
<!--              <img src="@/assets/book2.jpg" alt="书籍封面" />-->
            </div>
            <div class="book-info">
              <h3 class="book-title">数据结构与算法分析</h3>
              <p class="book-author">作者: 张伟</p>
              <p class="book-category">分类: 计算机科学</p>
              <div class="book-rating">
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="rating-value">5.0</span>
              </div>
              <button class="borrow-btn">借阅</button>
            </div>
          </div>
          <div class="book-card">
            <div class="book-cover">
<!--              <img src="@/assets/book3.jpg" alt="书籍封面" />-->
            </div>
            <div class="book-info">
              <h3 class="book-title">现代文学赏析</h3>
              <p class="book-author">作者: 王芳</p>
              <p class="book-category">分类: 文学</p>
              <div class="book-rating">
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star filled"></span>
                <span class="star"></span>
                <span class="rating-value">4.2</span>
              </div>
              <button class="borrow-btn">借阅</button>
            </div>
          </div>
        </div>
        <div class="carousel-controls">
          <button class="control-btn prev">上一页</button>
          <button class="control-btn next">下一页</button>
        </div>
      </section>

      <!-- 活动公告区域 -->
      <section class="events-announcements">
        <h2 class="section-title">活动公告</h2>
        <div class="events-grid">
          <div class="event-card">
            <div class="event-date">
              <span class="month">六月</span>
              <span class="day">15</span>
            </div>
            <div class="event-details">
              <h3 class="event-title">读书分享会</h3>
              <p class="event-location">地点: 图书馆多功能厅</p>
              <p class="event-time">时间: 14:00-16:00</p>
              <p class="event-description">与知名作家面对面交流，分享阅读心得</p>
              <button class="event-btn">报名参加</button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-date">
              <span class="month">六月</span>
              <span class="day">20</span>
            </div>
            <div class="event-details">
              <h3 class="event-title">科技创新讲座</h3>
              <p class="event-location">地点: 图书馆报告厅</p>
              <p class="event-time">时间: 19:00-21:00</p>
              <p class="event-description">探讨前沿科技发展趋势与应用</p>
              <button class="event-btn">报名参加</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 图书馆统计数据 -->
      <section class="library-stats">
        <div class="stat-item">
          <div class="stat-value">50,000+</div>
          <div class="stat-label">馆藏图书</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10,000+</div>
          <div class="stat-label">电子资源</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">5,000+</div>
          <div class="stat-label">注册读者</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">200+</div>
          <div class="stat-label">每日借阅</div>
        </div>
      </section>
    </main>

    <!-- 页脚区域 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>关于我们</h3>
          <p>智慧图书馆致力于为读者提供优质的阅读环境和丰富的知识资源</p>
        </div>
        <div class="footer-section">
          <h3>开放时间</h3>
          <p>周一至周五: 8:00 - 22:00</p>
          <p>周六至周日: 9:00 - 21:00</p>
        </div>
        <div class="footer-section">
          <h3>联系方式</h3>
          <p>地址: 某某市某某区某某路123号</p>
          <p>电话: 123-4567-8910</p>
          <p>邮箱: library@example.com</p>
        </div>
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-icons">
            <a href="#" class="social-icon wechat"></a>
            <a href="#" class="social-icon weibo"></a>
            <a href="#" class="social-icon douyin"></a>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 智慧图书馆管理系统 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑
</script>

<style scoped>
/* 全局样式 */
.home-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  color: #333;
}

/* 顶部导航栏样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.site-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3a5ccc;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.nav-item:hover, .nav-item.active {
  color: #3a5ccc;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3a5ccc;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 0.9rem;
  font-weight: 500;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #3a5ccc;
  color: #3a5ccc;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background-color: #3a5ccc;
  color: #fff;
}

/* 主要内容区域样式 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 轮播图区域样式 */
.hero-section {
  position: relative;
  margin-bottom: 3rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.carousel {
  width: 100%;
  height: 400px;
  position: relative;
}

.carousel-item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
}

.carousel-caption h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.carousel-caption p {
  font-size: 1.2rem;
  margin: 0;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: #fff;
}

/* 快速服务区域样式 */
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background-color: #3a5ccc;
  border-radius: 2px;
}

.quick-services {
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.service-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background-color: #eef2ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.service-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.service-btn {
  background-color: #3a5ccc;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.service-btn:hover {
  background-color: #2a4bb9;
}

/* 新书推荐区域样式 */
.new-books {
  margin-bottom: 3rem;
}

.books-carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: none; /* Firefox */
}

.books-carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.book-card {
  flex: 0 0 300px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  height: 200px;
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.book-card:hover .book-cover img {
  transform: scale(1.05);
}

.book-info {
  padding: 1.2rem;
}

.book-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.book-author, .book-category {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.book-rating {
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1rem;
}

.star {
  width: 16px;
  height: 16px;
  background-color: #ddd;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  margin-right: 2px;
}

.star.filled {
  background-color: #ffb800;
}

.rating-value {
  margin-left: 5px;
  font-size: 0.9rem;
  color: #666;
}

.borrow-btn {
  width: 100%;
  background-color: #3a5ccc;
  color: #fff;
  border: none;
  padding: 0.6rem 0;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.borrow-btn:hover {
  background-color: #2a4bb9;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.control-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #555;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background-color: #3a5ccc;
  border-color: #3a5ccc;
  color: #fff;
}

/* 活动公告区域样式 */
.events-announcements {
  margin-bottom: 3rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.event-card {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  background-color: #3a5ccc;
  color: #fff;
  padding: 1rem 0;
}

.month {
  font-size: 0.9rem;
  text-transform: uppercase;
}

.day {
  font-size: 1.8rem;
  font-weight: 700;
}

.event-details {
  flex: 1;
  padding: 1.2rem;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.event-location, .event-time {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.event-description {
  font-size: 0.9rem;
  color: #555;
  margin: 0.5rem 0 1rem;
}

.event-btn {
  background-color: #3a5ccc;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.event-btn:hover {
  background-color: #2a4bb9;
}

/* 图书馆统计数据样式 */
.library-stats {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a5ccc;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #555;
}

/* 页脚区域样式 */
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 3rem 2rem 1.5rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #3a5ccc;
}

.footer-section p {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #3a5ccc;
}

.copyright {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright p {
  font-size: 0.9rem;
  color: #aaa;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .logo-container {
    margin-bottom: 1rem;
  }
  
  .nav-menu {
    margin-bottom: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .carousel {
    height: 300px;
  }
  
  .carousel-caption h2 {
    font-size: 1.8rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .library-stats {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .stat-item {
    width: 45%;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .carousel {
    height: 200px;
  }
  
  .carousel-caption h2 {
    font-size: 1.5rem;
  }
  
  .carousel-caption p {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style> 
