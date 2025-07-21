<template>
  <div class="login-page-wrapper">
    <!-- 动态背景 -->
    <div class="animated-bg"></div>

    <!-- 玻璃拟态卡片 -->
    <div class="glass-card">
      <!-- 头部 Logo 与标题 (已更新) -->
      <div class="header-section">
        <div class="logo">
          <!-- 使用您提供的 Logo 图片 -->
          <img src="../assets/1.jpg" alt="云网宽带 Logo">
        </div>
        <h1 class="main-title">云网宽带</h1>
        <p class="subtitle">便捷安装 · 专业服务 · 全程保障</p>
      </div>

      <!-- 登录核心区域 -->
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
    
    <!-- 底部链接 -->
    <div class="footer-links">
        <a href="#">遇到问题？</a>
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
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap");

/* 页面整体背景和布局 */
.login-page-wrapper {
  font-family: "Noto Sans SC", sans-serif;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0; left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 动态渐变背景 */
.animated-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 1;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
}
@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* 玻璃拟态卡片 */
.glass-card {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.25); /* 增加一点不透明度 */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 头部 Logo 和标题 */
.header-section {
  margin-bottom: 40px;
}
.logo {
  width: 120px; /* 调整宽度以适应新 Logo */
  margin: 0 auto 20px;
}
.logo img {
    width: 100%;
    height: auto;
}
.main-title {
  font-size: 26px;
  font-weight: bold;
  color: #1f2937;
}
.subtitle {
  font-size: 14px;
  color: #4b5563;
  margin-top: 8px;
}

/* 微信一键登录按钮 */
.btn-wechat-login {
  border: none;
  background: linear-gradient(to right, #09bb07, #28a745);
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 6px 20px rgba(9, 187, 7, 0.3);
  height: 52px;
  color: white;
  transition: all 0.3s ease;
}
.btn-wechat-login .fab {
  margin-right: 10px;
  font-size: 22px;
}
.btn-wechat-login:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(9, 187, 7, 0.4);
}

/* 协议勾选 */
.agreement-section {
  margin-top: 24px;
}
.agreement-text {
  font-size: 13px;
  color: #4b5563;
}
:deep(.van-checkbox__label) {
    margin-left: 6px;
}
.agreement-text a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

/* 底部链接 */
.footer-links {
  position: absolute;
  bottom: 24px;
  z-index: 2;
}
.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 13px;
}
</style>