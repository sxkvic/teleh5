<template>
    <div class="unsubscribe-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="业务退订"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 模块 1: 确认退订的服务 (样式优化) -->
        <div class="service-confirmation-block">
          <p class="confirmation-label">您正在申请退订以下服务</p>
          <p class="service-name">500M家庭畅享年包</p>
          <p class="service-date">当前生效日期: 2023-01-15</p>
        </div>
  
        <!-- 模块 2: 重要事项告知 (样式强化) -->
        <div class="section-card consequences-card">
          <h3 class="section-title warning">
            <i class="fas fa-exclamation-triangle title-icon"></i>退订前请注意
          </h3>
          <ul class="consequences-list">
            <li class="consequence-item">
              <i class="fas fa-calendar-times list-icon"></i>
              <div>
                <strong>服务终止日期</strong>
                <p>业务退订后，将于次月1日正式失效。</p>
              </div>
            </li>
            <li class="consequence-item">
              <i class="fas fa-file-invoice-dollar list-icon"></i>
              <div>
                <strong>可能产生违约金</strong>
                <p>若您的套餐在协议期内，退订可能会产生相应的违约费用，具体金额请咨询客服。</p>
              </div>
            </li>
            <li class="consequence-item">
              <i class="fas fa-unlink list-icon"></i>
              <div>
                <strong>关联权益将失效</strong>
                <p>与该套餐绑定的手机话费赠送、会员权益等将同步失效。</p>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- 模块 3: 退订原因 (选填) -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-comment-dots title-icon primary"></i>方便告诉我们您退订的原因吗？
          </h3>
          <div class="reason-tags-wrapper">
            <span v-for="tag in reasonTags" :key="tag" class="reason-tag" :class="{ 'selected': selectedTags.includes(tag) }" @click="toggleTag(tag)">{{ tag }}</span>
          </div>
          <van-field v-if="selectedTags.includes('其他原因')" v-model="otherReason" rows="2" autosize type="textarea" placeholder="请输入其他原因" class="other-reason-input" />
        </div>
  
        <!-- 模块 4: 安全验证 (样式优化) -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-shield-alt title-icon primary"></i>安全验证
          </h3>
          <p class="verification-info">为了您的账户安全，请输入发送至手机 <strong>138****1234</strong> 的验证码。</p>
          <div class="verification-input-group">
            <van-field v-model="smsCode" type="number" maxlength="6" placeholder="请输入6位验证码" />
            <van-button class="send-code-button" :disabled="isCodeSent" @click="sendCode">{{ sendCodeButtonText }}</van-button>
          </div>
        </div>
      </main>
  
      <!-- 底部确认栏 -->
      <footer class="submit-footer">
        <div class="agreement-section">
          <van-checkbox v-model="isAgreed" icon-size="16px" shape="square" checked-color="#1d63ff">
            <span class="agreement-text">我已阅读并了解退订后果</span>
          </van-checkbox>
        </div>
        <van-button block class="submit-button" :disabled="isSubmitDisabled" @click="onSubmit">确认退订</van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onUnmounted } from 'vue';
  import { showToast } from 'vant';
  
  const selectedTags = ref([]);
  const otherReason = ref('');
  const smsCode = ref('');
  const isAgreed = ref(false);
  const isCodeSent = ref(false);
  const countdown = ref(60);
  let timer = null;
  const reasonTags = ['价格太贵', '服务不好', '网络太慢', '搬家/工作变动', '更换运营商', '其他原因'];
  const sendCodeButtonText = computed(() => isCodeSent.value ? `${countdown.value}s后重发` : '获取验证码');
  const isSubmitDisabled = computed(() => smsCode.value.length < 6 || !isAgreed.value);
  const onClickLeft = () => history.back();
  const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) { selectedTags.value.splice(index, 1); } else { selectedTags.value.push(tag); }
  };
  const sendCode = () => {
    isCodeSent.value = true;
    showToast.success('验证码已发送');
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer);
        isCodeSent.value = false;
        countdown.value = 60;
      }
    }, 1000);
  };
  const onSubmit = () => { showToast.success('退订申请已提交，将在下个账期生效。'); };
  onUnmounted(() => { if (timer) clearInterval(timer); });
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .unsubscribe-page { background-color: #f4f7f9; min-height: 100vh; padding-bottom: 120px; }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 20px; }
  
  /* --- 通用卡片和标题 --- */
  .section-card { background-color: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
  .section-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
  .title-icon.primary { color: #1d63ff; }
  .title-icon { margin-right: 10px; width: 20px; text-align: center; }
  
  /* --- 服务确认模块 --- */
  .service-confirmation-block { text-align: center; padding: 16px 0; }
  .confirmation-label { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
  .service-name { font-size: 22px; font-weight: bold; color: #1d63ff; }
  .service-date { font-size: 13px; color: #6b7280; margin-top: 8px; }
  
  /* --- 重要事项告知模块 --- */
  .consequences-card { background-color: #fffbeb; border: 1px solid #fde68a; }
  .section-title.warning { color: #b45309; }
  .section-title.warning .title-icon { color: #d97706; }
  .consequences-list { display: flex; flex-direction: column; gap: 20px; }
  .consequence-item { display: flex; align-items: flex-start; gap: 16px; }
  .list-icon { font-size: 16px; color: #d97706; margin-top: 4px; }
  .consequence-item strong { font-size: 15px; color: #1f2937; }
  .consequence-item p { font-size: 13px; color: #6b7280; margin-top: 4px; line-height: 1.7; }
  
  /* --- 退订原因 --- */
  .reason-tags-wrapper { display: flex; flex-wrap: wrap; gap: 12px; }
  .reason-tag { padding: 6px 14px; font-size: 13px; background-color: #f3f4f6; color: #374151; border: 1px solid #f3f4f6; border-radius: 999px; cursor: pointer; transition: all 0.2s ease-in-out; }
  .reason-tag.selected { background-color: #dbeafe; color: #1d4ed8; border-color: #93c5fd; font-weight: 500; }
  .other-reason-input { margin-top: 16px; }
  
  /* --- 安全验证 --- */
  .verification-info { font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
  .verification-input-group { display: flex; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
  .verification-input-group .van-field { flex: 1; padding: 12px; border: none; }
  .send-code-button { background-color: transparent; color: #1d63ff; border: none; font-weight: 500; border-left: 1px solid #e5e7eb; padding: 0 16px; border-radius: 0; }
  .send-code-button:disabled { color: #9ca3af; }
  
  /* --- 底部确认栏 --- */
  .submit-footer { position: fixed; bottom: 0; left: 0; right: 0; padding: 16px; background-color: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); }
  .agreement-section { text-align: center; margin-bottom: 12px; }
  .agreement-text { font-size: 13px; color: #6b7280; }
  .submit-button { height: 48px; border-radius: 999px; border: none; background: linear-gradient(to right, #ef4444, #f87171); color: white; font-size: 16px; font-weight: 500; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
  .submit-button.van-button--disabled { background: #d1d5db; box-shadow: none; }
  </style>