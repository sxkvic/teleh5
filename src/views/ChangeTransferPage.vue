<template>
    <div class="account-transfer-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="变更过户"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 优化后的自定义步骤条 -->
        <div class="steps-container">
          <div class="steps-progress-bar">
            <div class="progress-bar-inner" :style="{ width: progressWidth }"></div>
          </div>
          <div class="step-item" :class="{ 'completed': activeStep > 0, 'active': activeStep === 0 }">
            <div class="step-circle">
              <i v-if="activeStep > 0" class="fas fa-check"></i>
              <span v-else>1</span>
            </div>
            <p class="step-text">验证原户主</p>
          </div>
          <div class="step-item" :class="{ 'completed': activeStep > 1, 'active': activeStep === 1 }">
            <div class="step-circle">
              <i v-if="activeStep > 1" class="fas fa-check"></i>
              <span v-else>2</span>
            </div>
            <p class="step-text">填写新信息</p>
          </div>
          <div class="step-item" :class="{ 'completed': activeStep > 2, 'active': activeStep === 2 }">
            <div class="step-circle">
              <i v-if="activeStep > 2" class="fas fa-check"></i>
              <span v-else>3</span>
            </div>
            <p class="step-text">签约确认</p>
          </div>
        </div>
  
        <!-- 步骤内容卡片 -->
        <div class="section-card animated-card">
          <!-- 步骤 1: 原户主身份验证 -->
          <div v-if="activeStep === 0">
            <h3 class="section-title"><i class="fas fa-user-shield title-icon"></i>第一步：验证原户主身份</h3>
            <p class="step-info">为保障您的账户安全，请输入当前户主的信息。</p>
            <van-field v-model="originalOwner.phone" label="手机号码" placeholder="请输入当前绑定的手机号" type="tel" />
            <van-field v-model="originalOwner.idNumber" label="证件号码" placeholder="请输入当前户主的身份证号" />
            <div class="verification-input-group">
                <van-field v-model="originalOwner.smsCode" type="number" maxlength="6" placeholder="请输入验证码" />
                <div class="divider"></div>
                <van-button class="send-code-button" :disabled="isCodeSent" @click="sendCode">{{ sendCodeButtonText }}</van-button>
            </div>
            <van-button block class="action-button" @click="validateStep1">下一步</van-button>
          </div>
  
          <!-- 步骤 2: 填写新户主信息 -->
          <div v-if="activeStep === 1">
            <h3 class="section-title"><i class="fas fa-user-plus title-icon"></i>第二步：填写新户主信息</h3>
            <van-field v-model="newOwner.name" label="新户主姓名" placeholder="请输入接收方真实姓名" />
            <van-field v-model="newOwner.phone" label="新户主手机" placeholder="请输入接收方手机号码" type="tel" />
            <van-field v-model="newOwner.idNumber" label="新户主证件号" placeholder="请输入接收方18位身份证号" />
            <van-button block class="action-button" @click="validateStep2">下一步</van-button>
          </div>
  
          <!-- 步骤 3: 协议确认与短信签约 -->
          <div v-if="activeStep === 2">
            <h3 class="section-title"><i class="fas fa-file-signature title-icon"></i>第三步：新户主签约确认</h3>
            <div class="agreement-text-box">
                <p>即将向新户主手机 <strong>{{ newOwner.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</strong> 发送验证码进行签约确认。此操作代表新户主同意接收本宽带服务及所有关联协议。</p>
            </div>
            <div class="verification-input-group">
                <van-field v-model="newOwner.smsCode" type="number" maxlength="6" placeholder="请输入新户主收到的验证码" />
                <div class="divider"></div>
                <van-button class="send-code-button" :disabled="isFinalCodeSent" @click="sendFinalCode">{{ finalCodeButtonText }}</van-button>
            </div>
            <van-button block class="action-button submit-button" @click="submitTransfer">完成过户</van-button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onUnmounted } from 'vue';
  import { showToast } from 'vant';
  
  const activeStep = ref(0);
  const originalOwner = reactive({ phone: '', idNumber: '', smsCode: '' });
  const newOwner = reactive({ name: '', phone: '', idNumber: '', smsCode: '' });
  
  const isCodeSent = ref(false);
  const countdown = ref(60);
  let timer1 = null;
  const isFinalCodeSent = ref(false);
  const finalCountdown = ref(60);
  let timer2 = null;
  
  const sendCodeButtonText = computed(() => isCodeSent.value ? `${countdown.value}s` : '获取验证码');
  const finalCodeButtonText = computed(() => isFinalCodeSent.value ? `${finalCountdown.value}s` : '获取验证码');
  const progressWidth = computed(() => {
      return (activeStep.value / 2) * 100 + '%';
  });
  
  const onClickLeft = () => activeStep.value > 0 ? activeStep.value-- : history.back();
  const startCountdown = (timerRef, isSentRef, countRef) => {
    isSentRef.value = true;
    showToast.success('验证码已发送');
    timerRef = setInterval(() => {
      countRef.value--;
      if (countRef.value === 0) {
        clearInterval(timerRef);
        isSentRef.value = false;
        countRef.value = 60;
      }
    }, 1000);
    return timerRef;
  };
  const sendCode = () => { timer1 = startCountdown(timer1, isCodeSent, countdown); };
  const sendFinalCode = () => { timer2 = startCountdown(timer2, isFinalCodeSent, finalCountdown); };
  const validateStep1 = () => {
    if (originalOwner.phone && originalOwner.idNumber && originalOwner.smsCode) {
      activeStep.value = 1;
    } else { showToast('请填写完整的原户主信息'); }
  };
  const validateStep2 = () => {
    if (newOwner.name && newOwner.phone && newOwner.idNumber) {
      activeStep.value = 2;
    } else { showToast('请填写完整的新户主信息'); }
  };
  const submitTransfer = () => {
      if (!newOwner.smsCode) {
          showToast('请输入新户主收到的验证码！');
          return;
      }
      showToast.success('过户申请已提交，等待审核...');
      activeStep.value = 3; // Mark as completed
  };
  onUnmounted(() => {
    if (timer1) clearInterval(timer1);
    if (timer2) clearInterval(timer2);
  });
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .account-transfer-page { background-color: #f4f7f9; min-height: 100vh; }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .main-content { padding: 24px 16px; }
  
  /* --- 自定义步骤条 --- */
  .steps-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding: 0 10%;
    margin-bottom: 24px;
  }
  .steps-progress-bar {
    position: absolute;
    top: 14px; /* (circle size / 2) */
    left: 15%;
    right: 15%;
    height: 2px;
    background-color: #e5e7eb;
    z-index: 1;
  }
  .progress-bar-inner {
    height: 100%;
    background-color: #1d63ff;
    transition: width 0.4s ease;
  }
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    text-align: center;
  }
  .step-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    background-color: #f4f7f9; /* Match page background */
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #9ca3af;
    transition: all 0.4s ease;
  }
  .step-text {
    margin-top: 8px;
    font-size: 13px;
    color: #9ca3af;
    transition: all 0.4s ease;
  }
  .step-item.active .step-circle {
    border-color: #1d63ff;
    color: #1d63ff;
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(29, 99, 255, 0.1);
  }
  .step-item.active .step-text {
    color: #1d63ff;
    font-weight: 500;
  }
  .step-item.completed .step-circle {
    background-color: #1d63ff;
    border-color: #1d63ff;
    color: white;
  }
  .step-item.completed .step-text {
    color: #1f2937;
  }
  
  /* --- 通用卡片和标题 --- */
  .section-card { background-color: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
  .section-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
  .title-icon { color: #1d63ff; margin-right: 10px; }
  
  /* --- 动画 --- */
  .animated-card { animation: fadeIn 0.5s ease-in-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  
  /* --- 步骤通用 --- */
  .step-info { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
  :deep(.van-cell) { padding: 12px 0; }
  :deep(.van-cell::after) { border-bottom: 1px solid #f3f4f6; }
  :deep(.van-cell:last-of-type::after) { border-bottom: none; }
  .verification-input-group { display: flex; align-items: center; border: 1px solid #e5e7eb; border-radius: 12px; margin-top: 16px; overflow: hidden; transition: border-color 0.2s; }
  .verification-input-group:focus-within { border-color: #1d63ff; }
  .verification-input-group .van-field { flex: 1; padding: 12px; border: none; }
  .verification-input-group .van-field::after { display: none; }
  .divider { width: 1px; height: 24px; background-color: #e5e7eb; }
  .send-code-button { flex-shrink: 0; background: none; border: none; color: #1d63ff; font-weight: 500; padding: 0 16px; cursor: pointer; }
  .send-code-button:disabled { color: #9ca3af; cursor: default; }
  
  /* --- 按钮通用样式 --- */
  .action-button { margin-top: 24px; height: 48px; border-radius: 12px; background: linear-gradient(to right, #2563eb, #1cb0f6); color: white; border: none; font-size: 16px; font-weight: 500; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
  
  /* --- 步骤3 特定样式 --- */
  .agreement-text-box { background-color: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #374151; margin-bottom: 20px; }
  .agreement-text-box strong { color: #1d63ff; font-weight: bold; }
  </style>