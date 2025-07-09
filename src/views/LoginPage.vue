<template>
  <div class="login-page-wrapper">
    <div class="login-card">
      <!-- 顶部背景区域 -->
      <div class="header-bg">
        <div class="wave"></div>
        <div class="wave"></div>

        <div class="header-content">
          <h1 class="title">移动宽带安装</h1>
          <p class="subtitle">便捷安装 · 专业服务 · 全程保障</p>
        </div>

        <div class="language-switcher">
          简体中文 <i class="ml-2 fas fa-chevron-down"></i>
        </div>
      </div>

      <!-- 登录表单区域 -->
      <div class="form-container">
        <h2 class="form-title">账号登录</h2>

        <van-form @submit="onSubmit">
          <!-- 手机号输入框 -->
          <van-field
            v-model="form.phone"
            name="手机号"
            placeholder="请输入手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          >
            <template #left-icon>
              <i class="form-icon fas fa-user"></i>
            </template>
          </van-field>

          <!-- 密码输入框 -->
          <van-field
            v-model="form.password"
            type="password"
            name="密码"
            placeholder="请输入登录密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <template #left-icon>
              <i class="form-icon fas fa-lock"></i>
            </template>
          </van-field>

          <div class="remember-forgot">
            <van-checkbox v-model="form.rememberMe" shape="square">
              <span class="remember-me-text">记住我</span>
            </van-checkbox>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>

          <div style="margin: 25px 0">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              class="btn-login"
              :loading="loading"
              loading-text="登录中..."
            >
              登 录
            </van-button>
          </div>
        </van-form>

        <van-divider
          :style="{
            color: '#9ca3af',
            borderColor: '#e5e7eb',
            padding: '0 15px',
          }"
        >
          或使用以下方式登录
        </van-divider>

        <div class="social-login">
          <div class="social-btn wechat">
            <i class="fab fa-weixin"></i>
          </div>
          <div class="social-btn alipay">
            <i class="fab fa-alipay"></i>
          </div>
        </div>

        <div class="register-link">
          还没有账号? <a href="#" class="text-blue-600 font-medium">立即注册</a>
        </div>

        <div class="footer-links">
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
          <a href="#">帮助中心</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        rememberMe: true,
      },
      loading: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.loading = true;

      // 模拟登录请求
      setTimeout(() => {
        this.loading = false;
        this.$toast.success("登录成功！即将跳转到选择页面...");

        // 跳转到角色选择页面
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
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* 核心卡片样式 */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部背景 */
.header-bg {
  height: 180px;
  background: linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%);
  position: relative;
  overflow: hidden;
  color: white;
  flex-shrink: 0;
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 25px;
}
.header-content .title {
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
}
.header-content .subtitle {
  margin-top: 0.5rem; /* 8px */
  opacity: 0.9;
}

/* 波浪动画 */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* SVG inlined to avoid external requests */
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,0.2)"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" /></svg>');
  background-size: 1200px 60px;
  animation: wave 12s linear infinite;
}
.wave:nth-child(2) {
  animation-delay: -5s;
  opacity: 0.5;
}
@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200px);
  }
}

/* 语言切换器 */
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;
  backdrop-filter: blur(5px);
}
.language-switcher .ml-2 {
  margin-left: 0.5rem;
}

/* 表单容器 */
.form-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: calc(100vh - 180px);
}
.form-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  text-align: center;
  color: #1f2937; /* gray-800 */
  margin-bottom: 24px;
}

/* 自定义 Vant Field 样式 */
.van-field {
  padding: 15px 0; /* 调整vant field的内边距 */
  margin-bottom: 10px; /* 调整与原设计的间距 */
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding-left: 15px; /* 给左侧图标留出空间 */
  transition: all 0.3s;
}
/* 通过 >>> 深度选择器修改 Vant 组件内部样式 */
.van-field >>> .van-field__control {
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  padding-left: 15px;
}
.van-field:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
.form-icon {
  font-size: 18px;
  color: #2563eb;
  transition: all 0.3s;
}
.van-field:focus-within .form-icon {
  transform: scale(1.1);
}

/* 记住我 & 忘记密码 */
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 25px;
  font-size: 14px;
}
.remember-me-text {
  color: #4b5563; /* gray-600 */
}
.forgot-password {
  color: #2563eb;
  text-decoration: none;
}

/* 自定义登录按钮样式 */
.btn-login.van-button {
  border: none;
  background: linear-gradient(to right, #2563eb, #0ea5e9);
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  transition: all 0.3s;
  height: 52px; /* 匹配设计稿 */
}
.btn-login.van-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(37, 99, 235, 0.4);
}

/* 社交登录按钮 */
.social-login {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 25px;
  margin-bottom: 25px;
}
.social-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}
.social-btn:hover {
  transform: translateY(-5px);
}
.social-btn.wechat {
  background: linear-gradient(to right, #09bb07, #2aae67);
}
.social-btn.alipay {
  background: linear-gradient(to right, #1677ff, #3d9bff);
}

/* 注册链接 */
.register-link {
  text-align: center;
  color: #4b5563; /* gray-600 */
  font-size: 14px;
}
.register-link a {
  color: #2574eb; /* blue-600 */
  font-weight: 500;
  text-decoration: none;
}

/* 底部链接 */
.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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
</style>
