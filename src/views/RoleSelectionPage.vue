<template>
  <div class="selection-page-wrapper">
    <!-- 1. 顶部 Logo 和标题 -->
    <div class="header-section">
        <div class="logo">
            <i class="fas fa-wifi"></i>
        </div>
        <h1 class="main-title">移动宽带安装</h1>
    </div>

    <!-- 2. 核心内容区 (垂直居中) -->
    <div class="main-content">
        <!-- 滑动切换器 (玻璃拟态) -->
        <div class="role-tabs" :class="activeRole">
            <div class="tab-item" @click="activeRole = 'user'">我是用户</div>
            <div class="tab-item" @click="activeRole = 'worker'">我是安装师傅</div>
            <div class="tab-glider"></div>
        </div>

        <!-- 动态内容区域 -->
        <div class="role-content-wrapper">
            <transition name="fade" mode="out-in">
                <div class="role-content" :key="activeRole">
                    <h3 class="role-title">{{ currentRole.title }}</h3>
                    <p class="role-description">{{ currentRole.description }}</p>
                </div>
            </transition>
        </div>

        <!-- 动态按钮 -->
        <button class="btn-select" @click="selectRole(activeRole)" :disabled="loading">
          进入系统
        </button>
    </div>
    
    <!-- 3. 底部协议 -->
    <div class="footer-section">
      <p class="agreement-text">
        登录即代表您同意<a href="#" class="agreement-link">用户协议</a>及<a href="#" class="agreement-link">隐私政策</a>
      </p>
    </div>
  </div>
</template>

<script>
// 完整保留您提供的、可正常运行的脚本，并稍作修改
export default {
  name: "RoleSelectionPage",
  data() {
    return {
      loading: false,
      activeRole: 'user', // 'user' or 'worker'
      roles: {
        user: {
          title: '欢迎用户',
          description: '办理业务、查询账单、联系客服'
        },
        worker: {
          title: '欢迎安装师傅',
          description: '工单管理、日程安排、材料申请'
        }
      }
    };
  },
  computed: {
      currentRole() {
          return this.roles[this.activeRole];
      }
  },
  methods: {
    selectRole(role) {
      if (this.loading) return;
      
      const button = document.querySelector('.btn-select');
      const originalText = button.innerHTML;

      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在进入...';
      this.loading = true;
      
      setTimeout(() => {
        button.innerHTML = originalText;
        this.loading = false;
        
        if(role === 'user') {
          this.$toast.success('选择用户身份成功！');
          setTimeout(() => {
            this.$router.push('/bind-device-code');
          }, 800);
        } else {
          this.$toast.success('进入安装师傅系统成功！');
          setTimeout(() => {
            this.$router.push('/master-home');
          }, 800);
        }
      }, 1500);
    },
  },
};
</script>

<style scoped>
/* 引入外部字体 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap");

/* 页面整体背景和布局 (全屏化) */
.selection-page-wrapper {
  font-family: "Noto Sans SC", sans-serif;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0; left: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
}

/* 顶部 Logo 和标题 */
.header-section {
    text-align: center;
    padding-top: 20px;
    flex-shrink: 0; /* 防止被压缩 */
}
.logo {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
  font-size: 28px;
}
.main-title {
  font-size: 24px;
  font-weight: bold;
}

/* 核心内容区 */
.main-content {
    flex: 1; /* 占据剩余所有空间 */
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center;
    width: 100%;
}

/* 滑动切换器 (玻璃拟态) */
.role-tabs {
  display: flex;
  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 5px;
  position: relative;
  width: 100%;
  max-width: 380px;
  margin-bottom: 40px;
}
.tab-item {
  flex: 1;
  padding: 12px;
  text-align: center;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.4s ease;
}
/* 确保非激活状态的样式 */
.role-tabs .tab-item {
  color: rgba(255,255,255,0.8);
  font-weight: 500;
}

/* 激活状态样式 - 用户选中时 */
.role-tabs.user .tab-item:nth-child(1) {
  color: #1a365d !important;
  font-weight: 600 !important;
}

/* 激活状态样式 - 师傅选中时 */
.role-tabs.worker .tab-item:nth-child(2) {
  color: #1a365d !important;
  font-weight: 600 !important;
}
.tab-glider {
  position: absolute;
  top: 5px;
  left: 5px;
  height: calc(100% - 10px);
  width: calc(50% - 5px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.role-tabs.worker .tab-glider {
  transform: translateX(100%);
}

/* 角色内容 */
.role-content-wrapper {
    height: 120px; /* 固定高度防止切换时抖动 */
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.role-content { text-align: center; width: 100%; }
.role-title { font-size: 28px; font-weight: bold; margin-bottom: 12px; }
.role-description { color: rgba(255,255,255,0.8); line-height: 1.6; }

/* 动画效果 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 按钮和协议 */
.btn-select {
  display: block; width: 100%; max-width: 380px; padding: 15px; border-radius: 12px;
  font-size: 16px; font-weight: 600; text-align: center;
  transition: all 0.3s ease;
  border: none; cursor: pointer;
  background-color: white;
  color: #1d63ff; /* 按钮文字颜色 */
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.btn-select:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); }
.btn-select:disabled { opacity: 0.7; cursor: not-allowed; }

.footer-section {
    flex-shrink: 0; /* 防止被压缩 */
    padding-bottom: 20px;
}
.agreement-text { text-align: center; color: rgba(255,255,255,0.7); font-size: 13px; }
.agreement-link { color: white; text-decoration: none; font-weight: 500; }
</style>