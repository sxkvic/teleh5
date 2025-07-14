<template>
    <div class="my-account-page">
      <!-- 1. 顶部个人信息背景 -->
      <div class="header-bg">
        <!-- 优化：整个 profile 区域可点击，并带有下拉箭头提示 -->
        <div class="user-profile clickable" @click="showRoleSheet = true">
          <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80" alt="User Avatar" class="avatar">
          <div class="user-info">
            <h1 class="user-name">
              王女士
              <i class="fas fa-chevron-down role-chevron"></i>
            </h1>
            <p class="role-tag">{{ activeRole === 'user' ? '个人中心' : '师傅中心' }}</p>
          </div>
        </div>
        <van-tag type="warning" size="medium" class="membership-tag">五星用户</van-tag>
      </div>
  
      <!-- 2. 核心数据悬浮卡片 -->
      <div class="key-stats-card">
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="stat in keyStats" :key="stat.label">
            <p class="stat-value">{{ stat.value }} <span class="stat-unit">{{ stat.unit }}</span></p>
            <p class="stat-label">{{ stat.label }}</p>
          </van-grid-item>
        </van-grid>
      </div>
  
      <main class="main-content">
        <!-- 3. 我的服务 -->
        <div class="section-card">
          <h3 class="section-title">我的服务</h3>
          <van-grid :column-num="4" :border="false" :gutter="10" class="service-grid">
            <van-grid-item v-for="service in mainServices" :key="service.text">
              <div class="service-icon-wrapper" :style="{ background: service.color }">
                <i :class="service.icon"></i>
              </div>
              <span class="service-text">{{ service.text }}</span>
            </van-grid-item>
          </van-grid>
        </div>
        
        <!-- 4. 更多功能列表 -->
        <div class="section-card">
          <h3 class="section-title">更多功能</h3>
          <van-cell-group :border="false">
            <van-cell v-for="link in settingsLinks" :key="link.text" :title="link.text" is-link>
              <template #icon>
                <i :class="link.icon" class="cell-icon"></i>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
  
        <div class="logout-button-wrapper">
          <van-button block class="logout-button" @click="logout">退出登录</van-button>
        </div>
      </main>

      <!-- 身份切换动作面板 -->
      <van-action-sheet
        :show="showRoleSheet"
        @update:show="showRoleSheet = $event"
        :actions="roleActions"
        cancel-text="取消"
        description="请选择您要进入的系统"
        close-on-click-action
        @select="onRoleSelect"
      />

      <!-- 底部导航栏 -->
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
    name: 'MyPage',
    data() {
      return {
        // State
        activeRole: 'user', // 'user' or 'worker'
        showRoleSheet: false,
        activeTab: 1, // 当前在我的页面，所以是1

        // Mock Data
        keyStats: [
          { value: '128.50', unit: '元', label: '话费余额' },
          { value: '80.5', unit: 'GB', label: '剩余流量' },
          { value: '350', unit: '分钟', label: '剩余语音' },
        ],
        mainServices: [
          { icon: 'fas fa-wallet', text: '充值缴费', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { icon: 'fas fa-box-open', text: '套餐余量', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
          { icon: 'fas fa-receipt', text: '电子发票', color: 'linear-gradient(135deg, #16a085 0%, #f4d03f 100%)' },
          { icon: 'fas fa-list-alt', text: '我的订单', color: 'linear-gradient(135deg, #d38312 0%, #a83279 100%)' },
        ],
        settingsLinks: [
          { icon: 'fas fa-map-marker-alt', text: '地址管理' },
          { icon: 'fas fa-id-card', text: '实名认证' },
          { icon: 'fas fa-cog', text: '设置' },
        ]
      };
    },
    computed: {
      // Computed property to dynamically update action sheet styles
      roleActions() {
        return [
          {
            name: '个人中心',
            value: 'user',
            className: this.activeRole === 'user' ? 'action-active' : ''
          },
          {
            name: '师傅中心',
            value: 'worker',
            className: this.activeRole === 'worker' ? 'action-active' : ''
          },
        ];
      }
    },
    methods: {
      // Methods
      onRoleSelect(action) {
        if (this.activeRole !== action.value) {
          this.activeRole = action.value;
          Toast(`已切换到${action.name}`);
        }
      },
      logout() {
        Toast('您已成功退出');
        // this.$router.push('/login');
      },

      // 底部导航栏切换
      onTabChange(index) {
        if (index === 0) {
          // 跳转到首页
          this.$router.push('/home');
        } else if (index === 1) {
          // 我的页面，已经在我的页面了，不需要跳转
          return;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .my-account-page { background-color: #f4f7f9; min-height: 100vh; padding-bottom: 80px; }
  
  /* --- 顶部背景 --- */
  .header-bg {
    background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
    height: 200px;
    padding: 24px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: white;
  }
  .user-profile { display: flex; align-items: center; gap: 16px; }
  .user-profile.clickable { cursor: pointer; }
  .avatar { width: 64px; height: 64px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); }
  .user-name { font-size: 22px; font-weight: bold; display: flex; align-items: center; gap: 8px; }
  .role-chevron { font-size: 14px; opacity: 0.7; }
  .role-tag {
    font-size: 13px;
    opacity: 0.9;
    margin-top: 6px;
    background: rgba(255,255,255,0.15);
    padding: 2px 8px;
    border-radius: 99px;
    display: inline-block;
  }
  .membership-tag { background: linear-gradient(to right, #f97316, #fb923c); border: none; }
  
  /* --- 核心数据卡片 --- */
  .key-stats-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    margin: -80px 16px 0;
    position: relative;
    z-index: 2;
    padding: 16px 0;
  }
  .stat-value { font-size: 20px; font-weight: bold; color: #1f2937; }
  .stat-unit { font-size: 12px; font-weight: normal; }
  .stat-label { font-size: 13px; color: #6b7280; margin-top: 8px; }
  
  /* --- 主内容区 --- */
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
  .section-card { background-color: white; border-radius: 16px; padding: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
  .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
  
  /* --- 我的服务网格 --- */
  .service-grid.van-grid { margin-left: -5px; margin-right: -5px; }
  :deep(.van-grid-item__content) { background-color: transparent; padding: 8px !important; }
  .service-icon-wrapper { width: 48px; height: 48px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 22px; margin-bottom: 8px; }
  .service-text { font-size: 12px; color: #374151; }
  
  /* --- 更多功能列表 --- */
  :deep(.van-cell-group) { margin: -10px; }
  :deep(.van-cell) { padding-top: 14px; padding-bottom: 14px; }
  .cell-icon { font-size: 18px; color: #1d63ff; margin-right: 12px; width: 20px; text-align: center; }
  
  /* --- 退出按钮 --- */
  .logout-button-wrapper { margin-top: 8px; }
  .logout-button { border: none; background-color: white; color: #ef4444; font-weight: 500; border-radius: 12px; }
  
  /* --- 动作面板高亮样式 --- */
  :deep(.van-action-sheet__item.action-active) {
    color: #1d63ff;
    font-weight: 600;
  }
  :deep(.van-action-sheet__item.action-active::after) {
    content: '\f00c'; /* Font Awesome "check" icon unicode */
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  /* --- 底部导航栏 --- */
  .van-tabbar {
    height: 60px;
    box-shadow: 0 -2px 10px rgba(100, 100, 100, 0.05);
  }
  .van-tabbar-item {
    font-size: 12px;
  }
  </style>