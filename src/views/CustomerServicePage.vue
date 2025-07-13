<template>
    <div class="service-center-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="客服中心"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 2. 顶部欢迎卡片 -->
        <div class="hero-card">
          <img src="https://images.unsplash.com/photo-1557838923-2985c318be48?w=200&q=80" alt="Customer Service" class="avatar">
          <h2 class="welcome-title">您好，有什么可以帮您？</h2>
          <p class="service-time">我们的服务时间为：工作日 9:00 - 21:00</p>
          <div class="status-tag">
            <span class="status-dot"></span>
            当前服务通畅
          </div>
        </div>
  
        <!-- 3. 功能入口 -->
        <div class="action-cards">
          <!-- 在线客服 -->
          <div class="action-card online-chat-card" @click="startChat">
            <i class="fas fa-comments icon"></i>
            <div class="text-content">
              <h3 class="title">在线客服</h3>
              <p class="subtitle">输入您的问题，我们将尽快为您解答</p>
            </div>
          </div>
          <!-- 客服热线 -->
          <a href="tel:10086-8-1" class="action-card hotline-card">
            <i class="fas fa-phone-alt icon"></i>
            <div class="text-content">
              <h3 class="title">客服热线</h3>
              <p class="subtitle">拨打 10086-8-1 (宽带专线)</p>
            </div>
          </a>
        </div>
  
        <!-- 4. 常见问题 -->
        <div class="faq-section">
          <h3 class="section-title">常见问题</h3>
          <van-collapse v-model="activeFaq" :border="false" class="faq-collapse">
            <van-collapse-item
              v-for="faq in faqList"
              :key="faq.title"
              :title="faq.title"
              :name="faq.title"
            >
              <div class="faq-content" v-html="faq.content"></div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { showToast } from 'vant';
  
  // State
  const activeFaq = ref([]);
  const faqList = ref([
    {
      title: '宽带无法上网怎么办？',
      content: '1. 请检查您的光猫（Modem）和路由器电源是否接通，指示灯是否正常。<br>2. 尝试重启光猫和路由器（断电30秒后重新通电）。<br>3. 检查网线是否松动或损坏。<br>4. 如以上操作无效，请联系在线客服进行线路检测。'
    },
    {
      title: '如何修改我的WiFi密码？',
      content: '您可以通过本小程序内的“智能家居”或“路由器管理”功能进行修改。如果您的设备不支持此功能，请在电脑或手机浏览器地址栏输入路由器的管理地址（通常为192.168.1.1或192.168.0.1），登录后进入无线设置进行修改。'
    },
    {
      title: '如何申请电子发票？',
      content: '请返回首页，点击“开票”功能，选择您需要开具发票的账单，填写抬头信息后即可申请。电子发票将发送到您预留的电子邮箱。'
    }
  ]);
  
  // Event Handlers
  const onClickLeft = () => history.back();
  
  const startChat = () => {
    showToast('正在连接在线客服...');
    // Navigate to chat page logic here
    // router.push('/chat');
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .service-center-page {
    background-color: #f4f7f9;
    min-height: 100vh;
  }
  :deep(.van-nav-bar__title) {
    font-weight: 600;
    font-size: 17px;
  }
  .main-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  /* --- 欢迎卡片 --- */
  .hero-card {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    margin: 0 auto;
    object-fit: cover;
  }
  .welcome-title {
    margin-top: 16px;
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
  }
  .service-time {
    margin-top: 4px;
    font-size: 13px;
    color: #6b7280;
  }
  .status-tag {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    background-color: #dcfce7;
    color: #166534;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 999px;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #22c55e;
    border-radius: 50%;
    margin-right: 6px;
  }
  
  /* --- 功能卡片 --- */
  .action-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .action-card {
    display: flex;
    align-items: center;
    padding: 24px;
    border-radius: 16px;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  .action-card:hover {
      transform: translateY(-4px);
  }
  .action-card .icon {
    font-size: 32px;
    margin-right: 20px;
  }
  .action-card .text-content .title {
    font-size: 18px;
    font-weight: bold;
  }
  .action-card .text-content .subtitle {
    font-size: 13px;
    margin-top: 4px;
  }
  
  .online-chat-card {
    background: linear-gradient(90deg, #2563eb, #1cb0f6);
    color: white;
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25);
  }
  .online-chat-card:hover {
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3);
  }
  .online-chat-card .subtitle {
    color: rgba(255,255,255,0.9);
  }
  
  .hotline-card {
    background-color: white;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .hotline-card:hover {
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  }
  .hotline-card .icon {
    color: #2563eb;
  }
  .hotline-card .title {
    color: #1f2937;
  }
  .hotline-card .subtitle {
    color: #6b7280;
  }
  
  /* --- 常见问题 --- */
  .faq-section .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 12px;
  }
  .faq-collapse {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  :deep(.van-collapse-item) {
    border-radius: 12px;
    overflow: hidden; /* Important for border-radius */
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  :deep(.van-cell) {
    padding: 16px;
    font-size: 15px;
    color: #1f2937;
    font-weight: 500;
  }
  :deep(.van-cell::after) {
    border-bottom: none; /* Remove default border */
  }
  :deep(.van-collapse-item__content) {
    padding: 0 16px 16px 16px;
  }
  .faq-content {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.7;
  }
  </style>