<template>
    <div class="home-page">
      <!-- 1. 顶部欢迎区域 -->
      <header class="header-section">
        <div class="user-info">
          <p class="welcome-text">欢迎回来,</p>
          <h1 class="user-name">王女士</h1>
        </div>
        <div class="notification-icon">
          <van-icon name="bell" size="22" color="#333" />
          <div class="notification-dot"></div>
        </div>
      </header>
  
      <div class="content-body">
        <!-- 2. 轮播图广告 -->
        <section class="swipe-section">
          <van-swipe class="promo-swipe" :autoplay="5000" indicator-color="white">
            <van-swipe-item v-for="(slide, index) in slides" :key="index">
              <img :src="slide.image" :alt="slide.title" class="swipe-image" />
              <div class="swipe-caption">
                <h2 class="swipe-title">{{ slide.title }}</h2>
                <p class="swipe-subtitle">{{ slide.subtitle }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </section>
  
        <!-- 3. 常用服务 -->
        <section class="common-services-section">
          <h3 class="section-title">常用服务</h3>
          <div class="services-grid">
            <div
              v-for="service in commonServices"
              :key="service.title"
              class="service-card"
              :style="{ backgroundColor: service.bgColor }"
              @click="navigateToPage(service.route)"
            >
              <div class="icon-wrapper" :style="{ backgroundColor: service.iconBgColor }">
                <van-icon :name="service.icon" color="white" size="20" />
              </div>
              <div class="text-wrapper">
                <p class="service-title">{{ service.title }}</p>
                <p class="service-subtitle">{{ service.subtitle }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 4. 全部功能 -->
        <section class="all-features-section">
          <h3 class="section-title">全部功能</h3>
          <van-grid :border="false" :column-num="4" :gutter="12">
            <van-grid-item
              v-for="feature in allFeatures"
              :key="feature.text"
              @click="navigateToPage(feature.route)"
            >
               <template #icon>
                  <van-icon :name="feature.icon" :color="feature.color" size="26" />
               </template>
               <template #text>
                  <span class="feature-text">{{ feature.text }}</span>
               </template>
            </van-grid-item>
          </van-grid>
        </section>
      </div>
  
      <!-- 5. 底部导航栏 -->
      <van-tabbar v-model="activeTab" active-color="#1d63ff" inactive-color="#707070" @change="onTabChange">
        <van-tabbar-item>
          <span>首页</span>
          <template #icon="props">
            <van-icon :name="props.active ? 'wap-home' : 'wap-home-o'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>我的</span>
          <template #icon="props">
            <van-icon :name="props.active ? 'manager' : 'manager-o'" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </template>
  
  <script>
  import { Toast } from 'vant';

  export default {
    name: 'HomePage',
    data() {
      return {
        activeTab: 0,
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80',
            title: '家庭影院级体验',
            subtitle: '超高清视频流畅播放，无卡顿',
          },
          {
            image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80',
            title: '极速光纤，一键到家',
            subtitle: '全新千兆套餐，畅享数字生活',
          },
        ],
        commonServices: [
          {
            title: '套餐订购',
            subtitle: '升级您的网络',
            icon: 'shopping-cart-o',
            bgColor: '#f0f6ff',
            iconBgColor: '#409eff',
            route: '/package-order'
          },
          {
            title: '我的账单',
            subtitle: '查看消费明细',
            icon: 'bill-o',
            bgColor: '#f0f9f3',
            iconBgColor: '#52c41a',
            route: '/my-bill'
          },
          {
            title: '在线客服',
            subtitle: '7x24小时支持',
            icon: 'service-o',
            bgColor: '#f6f2ff',
            iconBgColor: '#722ed1',
            route: '/customer-service'
          },
          {
            title: '业务退订',
            subtitle: '退订业务',
            icon: 'replay',
            bgColor: '#fffbe6',
            iconBgColor: '#faad14',
            route: '/business-cancellation'
          },
        ],
        // --- ICON CORRECTION IS HERE ---
        allFeatures: [
          { icon: 'search', text: '产品查询', color: '#409eff', route: '/product-query' },
          { icon: 'gold-coin-o', text: '预充值', color: '#52c41a', route: '/pre-recharge' },
          { icon: 'exchange', text: '变更过户', color: '#722ed1', route: '/change-transfer' },
          { icon: 'calendar-o', text: '自助续费', color: '#f5222d', route: '/self-renewal' },
          { icon: 'todo-list-o', text: '业务申请', color: '#3071a9', route: '/business-application' },
          { icon: 'description', text: '电子协议', color: '#13c2c2', route: '/electronic-agreement' },
          { icon: 'orders-o', text: '开票', color: '#fa8c16', route: '/invoice' },
          { icon: 'warning-o', text: '举报投诉', color: '#8c8c8c', route: '/complaint' }, // Corrected icon
          { icon: 'star-o', text: '服务评价', color: '#faad14', route: '/service-evaluation' },
          { icon: 'paid', text: '代缴代扣', color: '#eb2f96', route: '/payment-collection' },
        ]
      };
    },
    methods: {
      // 导航方法
      navigateToPage(route) {
        if (route) {
          this.$router.push(route);
        } else {
          Toast('功能开发中，敬请期待');
        }
      },

      // 底部导航栏切换
      onTabChange(index) {
        if (index === 0) {
          // 首页，已经在首页了，不需要跳转
          return;
        } else if (index === 1) {
          // 我的页面，暂时显示提示
          Toast('我的页面开发中，敬请期待');
          // 重置为首页
          setTimeout(() => {
            this.activeTab = 0;
          }, 100);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 整体页面样式 */
  .home-page {
    background-color: #f7f8fa;
    min-height: 100vh;
    padding-bottom: 60px; /* 为底部导航栏留出空间 */
  }
  
  /* 主体内容区 */
  .content-body {
    padding: 0 16px;
  }
  
  /* 顶部欢迎区域 */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 12px 16px;
    background-color: #f7f8fa;
  }
  
  .welcome-text {
    font-size: 14px;
    color: #64748b;
    margin: 0 0 2px 0;
  }
  
  .user-name {
    font-size: 22px;
    color: #1e293b;
    font-weight: bold;
    margin: 0;
  }
  
  .notification-icon {
    position: relative;
    cursor: pointer;
  }
  
  .notification-dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #ee0a24;
    border-radius: 50%;
    border: 1px solid white;
  }
  
  
  /* 轮播图 */
  .swipe-section {
    margin-bottom: 24px;
  }
  .promo-swipe {
    height: 140px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .swipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swipe-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    color: white;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
  }
  
  .swipe-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 4px 0;
  }
  
  .swipe-subtitle {
    font-size: 13px;
    opacity: 0.9;
    margin: 0;
  }
  
  /* 通用区块标题 */
  .section-title {
    font-size: 17px;
    font-weight: 500;
    color: #323233;
    margin: 0 0 16px 0;
  }
  
  /* 常用服务 */
  .common-services-section {
    margin-bottom: 24px;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .service-card {
    display: flex;
    align-items: center;
    padding: 16px 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .service-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .service-card:active {
    transform: translateY(0);
  }
  
  .icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    flex-shrink: 0; /* 防止图标被压缩 */
  }
  
  .text-wrapper {
    display: flex;
    flex-direction: column;
  }
  
  .service-title {
    font-size: 15px;
    font-weight: 500;
    color: #323233;
    margin: 0;
  }
  
  .service-subtitle {
    font-size: 12px;
    color: #64748b;
    margin: 2px 0 0 0;
  }
  
  /* 全部功能 */
  .all-features-section .van-grid-item :deep(.van-grid-item__content) {
    background-color: transparent;
    padding: 8px 0;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
  }

  .all-features-section .van-grid-item:hover :deep(.van-grid-item__content) {
    background-color: rgba(0, 0, 0, 0.02);
    transform: translateY(-2px);
  }

  .all-features-section .van-grid-item:active :deep(.van-grid-item__content) {
    transform: translateY(0);
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .feature-text {
    font-size: 13px;
    color: #323233;
    margin-top: 8px;
  }
  
  /* 底部导航栏 */
  .van-tabbar {
    height: 60px;
    box-shadow: 0 -2px 10px rgba(100, 100, 100, 0.05);
  }
  .van-tabbar-item {
    font-size: 12px;
  }
  </style>```