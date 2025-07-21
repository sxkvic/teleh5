<template>
  <div class="bind-device-page">
    <!-- 1. 顶部波浪背景 -->
    <div class="header-bg">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="header-content">
        <h1 class="title">绑定您的设备</h1>
        <p class="subtitle">扫描或手动输入设备绑定码</p>
      </div>
    </div>

    <!-- 2. 内容区域 -->
    <div class="content-wrapper">
      <!-- 二维码引导 -->
      <div class="qr-guide">
        <div class="qr-code-wrapper">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=ExampleDeviceID12345" alt="QR Code" class="qr-code-img">
        </div>
        <p class="guide-text">请找到您设备背面的二维码标签，并将其置于扫描框内。</p>
      </div>

      <!-- 扫码按钮 -->
      <van-button block class="action-button scan-button" @click="onScan">
        <i class="fas fa-qrcode button-icon"></i>
        扫码绑定
      </van-button>

      <!-- 分割线 -->
      <van-divider>或手动输入</van-divider>

      <!-- 手动输入表单 -->
      <van-form @submit="onManualSubmit" class="manual-form">
        <div class="input-wrapper">
          <i class="fas fa-keyboard input-icon"></i>
          <input
            type="text"
            v-model="deviceCode"
            class="custom-input"
            placeholder="请输入16位设备绑定码"
            maxlength="16"
            required
          />
        </div>
        <van-button block native-type="submit" class="action-button confirm-button" :loading="isLoading">
          <i class="fas fa-check-circle button-icon"></i>
          确认绑定
        </van-button>
      </van-form>
    </div>
    
    <!-- 帮助链接 -->
    <div class="footer-wrapper">
        <a href="#" class="help-link">
            <i class="fas fa-question-circle help-icon"></i>
            找不到绑定码？
        </a>
    </div>
  </div>
</template>

<script>
// 脚本部分保持不变，以确保功能可运行
import { Toast } from 'vant';
export default {
  name: 'BindDeviceCodePage',
  data() {
    return {
      deviceCode: '',
      isLoading: false
    };
  },
  methods: {
    onScan() {
      Toast('启动摄像头扫描... (模拟)');
      setTimeout(() => {
        Toast.success('扫码绑定成功！');
        setTimeout(() => {
          this.$router.push('/home');
        }, 800);
      }, 2000);
    },
    onManualSubmit() {
      if (this.deviceCode.length < 16) {
        Toast('请输入16位设备绑定码');
        return;
      }
      this.isLoading = true;
      console.log('Binding with code:', this.deviceCode);
      setTimeout(() => {
        this.isLoading = false;
        Toast.success('设备绑定成功！');
        this.deviceCode = '';
        setTimeout(() => {
          this.$router.push('/home');
        }, 800);
      }, 1500);
    }
  }
};
</script>
  
<style scoped>
/* --- 全局页面样式 (全屏化) --- */
.bind-device-page {
  background: linear-gradient(135deg, #2563eb 0%, #16a0f6 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
}

/* --- 顶部波浪背景 --- */
.header-bg {
  height: 200px; /* 增加高度 */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
}
.header-content { position: relative; z-index: 2; }
.title { font-size: 28px; font-weight: bold; }
.subtitle { margin-top: 8px; opacity: 0.9; font-size: 14px; }

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 80px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,0.15)"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" /></svg>');
  background-size: 1000px 80px;
  animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
}
.wave:nth-child(2) { animation-delay: -5s; animation-duration: 20s; opacity: 0.5; }
@keyframes wave { 0% { transform: translateX(0); } 100% { transform: translateX(-1000px); } }
  
/* --- 内容区域 --- */
.content-wrapper {
  flex: 1; /* 占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  padding: 0 24px;
}
.qr-guide { text-align: center; margin-bottom: 24px; }
.qr-code-wrapper {
    background: white;
    padding: 10px;
    border-radius: 16px;
    display: inline-block;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.qr-code-img { width: 140px; height: 140px; display: block; border-radius: 8px; }
.guide-text { margin-top: 16px; font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.6; }

/* --- 按钮和表单 --- */
.action-button {
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  color: #1d63ff; /* 按钮文字颜色 */
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.button-icon { margin-right: 8px; font-size: 18px; }
.scan-button { margin-bottom: 24px; }
.confirm-button { margin-top: 16px; }
.manual-form { width: 100%; }

/* --- 玻璃拟态输入框 --- */
.input-wrapper { position: relative; }
.input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 16px; color: rgba(0,0,0,0.4); }
.custom-input {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  background-color: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 12px;
  padding-left: 48px;
  padding-right: 16px;
  font-size: 16px;
  color: #1f2937;
  transition: all 0.2s;
  outline: none;
}
.custom-input:focus { border-color: white; background-color: rgba(255,255,255,0.3); }
.custom-input::placeholder { color: rgba(0,0,0,0.4); }

/* --- 分割线 --- */
:deep(.van-divider) { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.3); }
  
/* --- 帮助链接 --- */
.footer-wrapper { padding: 24px; text-align: center; flex-shrink: 0; }
.help-link { color: rgba(255,255,255,0.9); text-decoration: none; display: inline-flex; align-items: center; font-size: 14px; }
.help-icon { margin-right: 6px; }
</style>