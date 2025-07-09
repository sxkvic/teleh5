<template>
  <div class="selection-page-wrapper">
    <div class="selection-card">
      <!-- 顶部背景区域 -->
      <div class="header-bg">
        <div class="wave"></div>
        <div class="wave"></div>
        
        <div class="header-content">
          <h1 class="selection-title">移动宽带安装</h1>
          <p class="selection-subtitle">便捷安装 · 专业服务 · 全程保障</p>
        </div>
      </div>
      
      <!-- 身份选择区域 -->
      <div class="selection-container">
        <h2 class="container-title">请选择您的身份</h2>
        
        <!-- 用户身份卡片 -->
        <div class="role-card user" @click="selectRole('user')">
          <div class="card-decoration"></div>
          <div class="role-icon user">
            <i class="fas fa-user"></i>
          </div>
          <h3 class="role-title">用户</h3>
          <p class="role-description">办理业务、查询账单、联系客服</p>
          
          <div class="role-features">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-wifi"></i>
              </div>
              <div class="feature-text">宽带套餐订购与查询</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-file-invoice"></i>
              </div>
              <div class="feature-text">账单查询与电子发票</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-headset"></i>
              </div>
              <div class="feature-text">在线客服与技术支持</div>
            </div>
          </div>
          
          <button class="btn-select user" :disabled="loading">
            <i class="fas fa-sign-in-alt"></i> 进入用户系统
          </button>
        </div>
        
        <!-- 安装师傅卡片 -->
        <div class="role-card worker" @click="selectRole('worker')">
          <div class="card-decoration"></div>
          <div class="role-icon worker">
            <i class="fas fa-tools"></i>
          </div>
          <h3 class="role-title">安装师傅</h3>
          <p class="role-description">工单管理、日程安排、材料申请</p>
          
          <div class="role-features">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <div class="feature-text">工单管理与任务分配</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-map-marked-alt"></i>
              </div>
              <div class="feature-text">导航服务与路线规划</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="feature-text">绩效统计与收入查询</div>
            </div>
          </div>
          
          <button class="btn-select worker" :disabled="loading">
            <i class="fas fa-sign-in-alt"></i> 进入师傅系统
          </button>
        </div>
        
        <p class="agreement-text">
          登录即代表您同意<a href="#" class="agreement-link">用户协议</a>和<a href="#" class="agreement-link">隐私政策</a>
        </p>
      </div>
      
      <div class="footer-links">
        <a href="#">帮助中心</a>
        <a href="#">关于我们</a>
        <a href="#">联系客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleSelectionPage",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    selectRole(role) {
      if (this.loading) return;
      
      // 添加动画效果
      const card = document.querySelector(`.role-card.${role}`);
      card.style.transform = 'scale(0.98)';
      card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      
      // 显示加载状态
      const button = card.querySelector('.btn-select');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在进入...';
      this.loading = true;
      
      // 模拟加载过程
      setTimeout(() => {
        // 恢复按钮状态
        button.innerHTML = originalText;
        this.loading = false;
        
        // 根据角色跳转
        if(role === 'user') {
          this.$toast.success('进入用户系统成功！');
          // this.$router.push('/user-dashboard');
        } else {
          this.$toast.success('进入安装师傅系统成功！');
          // this.$router.push('/worker-dashboard');
        }
        
        // 恢复卡片状态
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
      }, 1500);
    },
  },
  mounted() {
    // 添加卡片悬停效果
    document.querySelectorAll('.role-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('loading')) {
          this.style.transform = 'translateY(-5px)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('loading')) {
          this.style.transform = 'translateY(0)';
        }
      });
    });
  }
};
</script>

<style scoped>
/* 引入外部字体 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap");

/* 确保当前组件可以滚动 */
.selection-page-wrapper {
  -webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
}

/* 页面整体背景和布局 */
.selection-page-wrapper {
  font-family: "Noto Sans SC", sans-serif;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* 核心卡片样式 */
.selection-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 顶部背景 */
.header-bg {
  height: 180px;
  background: linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 25px;
  color: white;
}

.selection-title {
  font-size: 30px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

.selection-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 300px;
  margin: 0 auto;
}

/* 波浪动画 */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,0.2)"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" /></svg>');
  background-size: 1200px 60px;
  animation: wave 12s linear infinite;
}

.wave:nth-child(2) {
  animation-delay: -5s;
  opacity: 0.5;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-200px); }
}

/* 选择容器 */
.selection-container {
  padding: 30px;
}

.container-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 30px;
}

/* 角色卡片样式 */
.role-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.role-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
}

.role-card.user:hover {
  border-color: #2563eb;
}

.role-card.worker:hover {
  border-color: #8b5cf6;
}

.role-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
  position: relative;
  z-index: 2;
}

.role-icon.user {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
}

.role-icon.worker {
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  color: #8b5cf6;
  box-shadow: 0 5px 15px rgba(139, 92, 246, 0.2);
}

.role-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  color: #1f2937;
}

.role-description {
  text-align: center;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* 功能特性列表 */
.role-features {
  background: #f9fafb;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.feature-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  font-size: 12px;
}

.user .feature-icon {
  background: #dbeafe;
  color: #2563eb;
}

.worker .feature-icon {
  background: #ede9fe;
  color: #8b5cf6;
}

.feature-text {
  color: #4b5563;
  font-size: 14px;
}

/* 选择按钮 */
.btn-select {
  display: block;
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  border: none;
  cursor: pointer;
}

.btn-select.user {
  background: linear-gradient(to right, #2563eb, #0ea5e9);
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
}

.btn-select.worker {
  background: linear-gradient(to right, #8b5cf6, #7c3aed);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-select:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(37, 99, 235, 0.4);
}

.btn-select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 卡片装饰 */
.card-decoration {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
}

.user .card-decoration {
  background: #2563eb;
}

.worker .card-decoration {
  background: #8b5cf6;
}

/* 协议文本 */
.agreement-text {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 30px;
}

.agreement-link {
  color: #2563eb;
  text-decoration: none;
}

.agreement-link:hover {
  text-decoration: underline;
}

/* 底部链接 */
.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  font-size: 14px;
}

.footer-links a {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #2563eb;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .selection-page-wrapper {
    padding: 10px;
  }

  .selection-card {
    max-width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .selection-container {
    padding: 20px;
  }

  .role-card {
    padding: 20px;
  }

  .selection-title {
    font-size: 24px;
  }

  .role-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
}
</style>
