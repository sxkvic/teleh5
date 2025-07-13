<template>
    <div class="bind-device-page">
      <div class="main-card">
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
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=ExampleDeviceID12345" alt="QR Code" class="qr-code-img">
            <p class="guide-text">请找到您设备(如光猫或路由器)背面的二维码标签，并将其置于扫描框内。</p>
          </div>
  
          <!-- 扫码按钮 -->
          <van-button block class="action-button scan-button" @click="onScan">
            <i class="fas fa-qrcode button-icon"></i>
            扫码绑定
          </van-button>
  
          <!-- 分割线 -->
          <van-divider>或手动输入</van-divider>
  
          <!-- 手动输入表单 -->
          <van-form @submit="onManualSubmit">
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
  
          <!-- 帮助链接 -->
          <div class="help-link-wrapper">
            <a href="#" class="help-link">
              <i class="fas fa-question-circle help-icon"></i>
              找不到绑定码？
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { showToast } from 'vant';
  
  // State
  const deviceCode = ref('');
  const isLoading = ref(false);
  
  // Event Handlers
  const onScan = () => {
    showToast('启动摄像头扫描... (模拟)');
    // In a real app, you would integrate a QR scanner library here.
  };
  
  const onManualSubmit = () => {
    if (deviceCode.value.length < 16) {
      showToast('请输入16位设备绑定码');
      return;
    }
    isLoading.value = true;
    console.log('Binding with code:', deviceCode.value);
    
    setTimeout(() => {
      isLoading.value = false;
      showToast.success('设备绑定成功！');
      deviceCode.value = '';
    }, 1500);
  };
  </script>
  
  <style scoped>
  /* --- 全局页面样式 --- */
  .bind-device-page {
    background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  /* --- 主卡片 --- */
  .main-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 420px;
  }
  
  /* --- 顶部波浪背景 --- */
  .header-bg {
    height: 160px;
    background: linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .header-content {
    position: relative;
    z-index: 2;
    color: white;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .subtitle {
    margin-top: 8px;
    opacity: 0.9;
    font-size: 14px;
  }
  
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 80px;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,0.2)"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" /></svg>');
    background-size: 1000px 80px;
    animation: wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }
  .wave:nth-child(2) {
    animation-delay: -5s;
    animation-duration: 20s;
    opacity: 0.5;
  }
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-1000px); }
  }
  
  /* --- 内容区域 --- */
  .content-wrapper {
    padding: 24px;
  }
  .qr-guide {
    text-align: center;
    margin-bottom: 24px;
  }
  .qr-code-img {
    width: 160px;
    height: 160px;
    margin: 0 auto;
    border-radius: 8px;
    border: 4px solid #f3f4f6;
  }
  .guide-text {
    margin-top: 16px;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }
  
  /* --- 按钮和表单 --- */
  .action-button {
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #2563eb, #1cb0f6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  .button-icon {
    margin-right: 8px;
    font-size: 18px;
  }
  .scan-button {
    margin-bottom: 24px;
  }
  .confirm-button {
    margin-top: 16px;
  }
  
  .input-wrapper {
    position: relative;
  }
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #9ca3af;
  }
  .custom-input {
    width: 100%;
    height: 50px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
    border-radius: 12px;
    padding-left: 48px;
    padding-right: 16px;
    font-size: 16px;
    color: #1f2937;
    transition: all 0.2s;
    outline: none;
  }
  .custom-input:focus {
    border-color: #3b82f6;
    background-color: white;
  }
  .custom-input::placeholder {
    color: #9ca3af;
  }
  
  /* --- 分割线 --- */
  :deep(.van-divider) {
    font-size: 14px;
    color: #9ca3af;
    border-color: #e5e7eb;
  }
  
  /* --- 帮助链接 --- */
  .help-link-wrapper {
    margin-top: 24px;
    text-align: center;
  }
  .help-link {
    font-size: 14px;
    color: #2563eb;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
  }
  .help-icon {
    margin-right: 6px;
  }
  </style>