<template>
  <div class="splash-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- 主要内容 -->
    <div class="splash-content">
      <!-- Logo区域 -->
      <div class="logo-container">
        <div class="logo-wrapper">
          <img src="@/assets/1.png" alt="云网宽带" class="logo-image" />
          <div class="logo-glow"></div>
        </div>
      </div>

      <!-- 品牌信息 -->
      <div class="brand-info">
        <h1 class="brand-title">云网宽带</h1>
        <p class="brand-slogan">便捷安装 · 专业服务 · 全程保障</p>
      </div>

      <!-- 加载动画 -->
      <div class="loading-section">
        <div class="loading-dots">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
        <p class="loading-text">{{ loadingText }}</p>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      <p>© 2024 云网宽带 All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SplashPage",
  data() {
    return {
      loadingText: "正在启动...",
      loadingTexts: [
        "正在启动...",
        "加载资源中...",
        "初始化服务...",
        "准备就绪..."
      ],
      currentTextIndex: 0,
      textTimer: null,
      splashTimer: null
    };
  },
  mounted() {
    this.startLoadingAnimation();
    this.startSplashSequence();
  },
  beforeDestroy() {
    if (this.textTimer) {
      clearInterval(this.textTimer);
    }
    if (this.splashTimer) {
      clearTimeout(this.splashTimer);
    }
  },
  methods: {
    startLoadingAnimation() {
      // 循环切换加载文字
      this.textTimer = setInterval(() => {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.loadingTexts.length;
        this.loadingText = this.loadingTexts[this.currentTextIndex];
      }, 800);
    },
    
    startSplashSequence() {
      // 3秒后跳转到登录页面
      this.splashTimer = setTimeout(() => {
        this.navigateToLogin();
      }, 3000);
    },
    
    navigateToLogin() {
      // 清理定时器
      if (this.textTimer) {
        clearInterval(this.textTimer);
      }
      
      // 添加淡出效果后跳转
      const splashElement = document.querySelector('.splash-page');
      if (splashElement) {
        splashElement.classList.add('fade-out');
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
/* 引入字体 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap");

/* 页面整体样式 */
.splash-page {
  font-family: "Noto Sans SC", sans-serif;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9999;
  transition: opacity 0.5s ease-out;
}

.splash-page.fade-out {
  opacity: 0;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
}

/* 主要内容 */
.splash-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Logo区域 */
.logo-container {
  margin-bottom: 40px;
  position: relative;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
  animation: logoEntrance 1.5s ease-out;
}

.logo-image {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  animation: logoPulse 2s ease-in-out infinite;
}

.logo-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 34px;
  z-index: 1;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes logoEntrance {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes glow {
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0.8; transform: scale(1.1); }
}

/* 品牌信息 */
.brand-info {
  margin-bottom: 60px;
  animation: textSlideUp 1s ease-out 0.5s both;
}

.brand-title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
  letter-spacing: 2px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.brand-slogan {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes textSlideUp {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* 加载区域 */
.loading-section {
  animation: loadingFadeIn 1s ease-out 1s both;
}

.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  animation: dotBounce 1.4s ease-in-out infinite;
}

.dot-1 { animation-delay: 0s; }
.dot-2 { animation-delay: 0.2s; }
.dot-3 { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}

.loading-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

@keyframes loadingFadeIn {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* 版权信息 */
.copyright {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: copyrightFadeIn 1s ease-out 1.5s both;
}

.copyright p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.5px;
}

@keyframes copyrightFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* 响应式设计 */
@media (max-height: 700px) {
  .logo-image {
    width: 100px;
    height: 100px;
  }
  
  .brand-title {
    font-size: 28px;
  }
  
  .brand-info {
    margin-bottom: 40px;
  }
}

@media (max-width: 375px) {
  .brand-title {
    font-size: 32px;
  }
  
  .logo-image {
    width: 100px;
    height: 100px;
  }
}
</style>
