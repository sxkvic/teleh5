<template>
  <div class="login-page-wrapper">
    <!-- 主要内容区域 -->
    <div class="login-container">
      <!-- 头部标题区域 -->
      <div class="header-section">
        <h1 class="main-title">云网宽带</h1>
        <p class="subtitle">便捷安装 · 专业服务 · 全程保障</p>
      </div>

      <!-- 登录卡片 -->
      <div class="login-card">
        <div class="login-core">
          <van-button
            round
            block
            class="btn-wechat-login"
            @click="onWeChatLogin"
            :loading="loading"
            loading-text="授权中..."
          >
            <i class="fab fa-weixin"></i>
            微信一键登录
          </van-button>
          
          <div class="agreement-section">
            <van-checkbox v-model="agreed" shape="square" icon-size="14px" checked-color="#07c160">
              <span class="agreement-text">
                我已阅读并同意
                <a href="#">用户服务协议</a>
              </span>
            </van-checkbox>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部帮助链接 -->
    <div class="footer-links">
      <a href="#">遇到问题？联系客服</a>
    </div>
  </div>
</template>

<script>
// 脚本部分保持不变，以确保功能可运行
export default {
  name: "LoginPage",
  data() {
    return {
      agreed: false,
      loading: false,
    };
  },
  methods: {
    onWeChatLogin() {
      if (!this.agreed) {
        this.$toast("请先阅读并同意用户服务协议");
        return;
      }
      
      console.log("Starting WeChat Login...");
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$toast.success("授权成功！即将跳转...");
        setTimeout(() => {
          this.$router.push('/role-selection');
        }, 800);
      }, 1500);
    },
  },
};
</script>

<style scoped>
/* 引入外部字体 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap");

/* 页面整体布局 */
.login-page-wrapper {
  font-family: "Noto Sans SC", sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #8b5cf6 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 添加装饰性背景元素 */
.login-page-wrapper::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-20px, -20px) rotate(1deg); }
  66% { transform: translate(20px, -10px) rotate(-1deg); }
}

/* 主容器 */
.login-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* 头部标题区域 */
.header-section {
  text-align: center;
  margin-bottom: 48px;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 登录卡片 */
.login-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}

/* 登录核心区域 */
.login-core {
  width: 100%;
}

/* 微信登录按钮 */
.btn-wechat-login {
  height: 56px;
  border: none;
  background: linear-gradient(135deg, #07c160 0%, #00d976 100%);
  font-size: 17px;
  font-weight: 600;
  color: white;
  box-shadow: 0 8px 16px rgba(7, 193, 96, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
}

.btn-wechat-login .fab {
  margin-right: 12px;
  font-size: 20px;
}

.btn-wechat-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(7, 193, 96, 0.4);
}

.btn-wechat-login:active:not(:disabled) {
  transform: translateY(0);
}

/* 协议勾选区域 */
.agreement-section {
  margin-top: 32px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.agreement-text {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
}

:deep(.van-checkbox__label) {
  margin-left: 8px;
}

.agreement-text a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.agreement-text a:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* 底部链接 */
.footer-links {
  position: absolute;
  bottom: 32px;
  text-align: center;
  z-index: 2;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.footer-links a:hover {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-height: 700px) {
  .login-page-wrapper {
    justify-content: flex-start;
    padding-top: 60px;
  }
  
  .header-section {
    margin-bottom: 32px;
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .login-card {
    padding: 32px 24px;
  }
}

@media (max-width: 375px) {
  .login-container {
    max-width: 100%;
  }
  
  .login-card {
    padding: 32px 20px;
  }
  
  .main-title {
    font-size: 26px;
  }
}
</style>

