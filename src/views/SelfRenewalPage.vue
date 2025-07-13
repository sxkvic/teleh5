<template>
    <div class="self-service-renewal-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="自助续费"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 模块 1: 当前服务信息 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-box-open title-icon"></i>当前服务
          </h3>
          <div class="current-service-info">
            <p class="service-name">{{ currentService.name }}</p>
            <p class="expiry-date">将于 {{ currentService.expiryDate }} 到期</p>
          </div>
        </div>
  
        <!-- 模块 2: 选择续费方案 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-th-list title-icon"></i>选择续费方案
          </h3>
          <van-radio-group v-model="selectedPlanId" class="renewal-options-list">
            <div
              v-for="plan in renewalPlans"
              :key="plan.id"
              class="renewal-option-card"
              :class="{ 'selected': selectedPlanId === plan.id }"
              @click="selectedPlanId = plan.id"
            >
              <div class="plan-details">
                <p class="plan-duration">{{ plan.duration }}</p>
                <p v-if="plan.savings" class="plan-savings">{{ plan.savings }}</p>
              </div>
              <div class="plan-price-section">
                <span class="plan-price">¥{{ plan.price.toFixed(2) }}</span>
                <van-radio :name="plan.id" checked-color="#1d63ff"></van-radio>
              </div>
              <div v-if="plan.tag" class="recommend-tag">{{ plan.tag }}</div>
            </div>
          </van-radio-group>
        </div>
  
        <!-- 模块 3: 支付方式 -->
        <div class="section-card">
          <div class="payment-method-row">
            <span class="payment-label">支付方式</span>
            <div class="payment-value" @click="changePaymentMethod">
              <span>账户余额 (¥{{ accountBalance.toFixed(2) }})</span>
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </main>
  
      <!-- 底部提交栏 -->
      <footer class="submit-footer">
          <div class="amount-summary">
              <span class="summary-label">应付金额</span>
              <span class="summary-value">¥ {{ (selectedPlanDetails?.price || 0).toFixed(2) }}</span>
          </div>
          <van-button
              class="submit-button"
              :disabled="isSubmitDisabled"
              @click="onSubmit"
          >
              立即续费
          </van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { showToast } from 'vant';
  
  // State
  const selectedPlanId = ref(null);
  const accountBalance = ref(2050.75);
  
  // Mock Data
  const currentService = ref({
    name: '500M家庭畅享年包',
    expiryDate: '2024-01-14',
  });
  const renewalPlans = ref([
    { id: 1, duration: '续费一年', price: 1200.00, savings: null, tag: null },
    { id: 2, duration: '续费两年', price: 2200.00, savings: '立省200元', tag: '推荐' },
    { id: 3, duration: '续费三年', price: 3000.00, savings: '立省600元', tag: null },
  ]);
  
  // Computed
  const selectedPlanDetails = computed(() => {
    return renewalPlans.value.find(plan => plan.id === selectedPlanId.value) || null;
  });
  const isSubmitDisabled = computed(() => selectedPlanId.value === null);
  
  // Methods
  const onClickLeft = () => history.back();
  const changePaymentMethod = () => showToast('更换支付方式');
  const onSubmit = () => {
    if (!selectedPlanDetails.value) return;
    if (accountBalance.value < selectedPlanDetails.value.price) {
      showToast('账户余额不足，请充值或更换支付方式');
      return;
    }
    showToast.success(`成功续费${selectedPlanDetails.value.duration}！`);
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .self-service-renewal-page { background-color: #f4f7f9; min-height: 100vh; padding-bottom: 100px; }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
  
  /* --- 通用卡片和标题 --- */
  .section-card { background-color: white; border-radius: 16px; padding: 20px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
  .section-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 16px; }
  .title-icon { color: #1d63ff; margin-right: 8px; }
  
  /* --- 当前服务模块 --- */
  .service-name { font-size: 18px; font-weight: bold; color: #1f2937; }
  .expiry-date { font-size: 14px; color: #ef4444; margin-top: 8px; }
  
  /* --- 续费方案 --- */
  .renewal-options-list { display: flex; flex-direction: column; gap: 12px; }
  .renewal-option-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
  }
  .renewal-option-card.selected { border-color: #1d63ff; background-color: #eff6ff; }
  .plan-duration { font-size: 16px; font-weight: 500; color: #1f2937; }
  .plan-savings { font-size: 12px; color: #ef4444; margin-top: 4px; }
  .plan-price-section { display: flex; align-items: center; gap: 16px; }
  .plan-price { font-size: 18px; font-weight: bold; color: #1d63ff; }
  .recommend-tag {
    position: absolute;
    top: -1px;
    right: -1px;
    background: #ef4444;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 0 12px 0 12px;
  }
  
  /* --- 支付方式 --- */
  .payment-method-row { display: flex; justify-content: space-between; align-items: center; }
  .payment-label { font-size: 15px; color: #1f2937; font-weight: 500; }
  .payment-value { display: flex; align-items: center; gap: 8px; color: #6b7280; font-size: 14px; cursor: pointer; }
  
  /* --- 底部提交栏 --- */
  .submit-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
    background-color: white;
    box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
  }
  .amount-summary { display: flex; flex-direction: column; align-items: flex-start; }
  .summary-label { font-size: 13px; color: #6b7280; }
  .summary-value { font-size: 22px; font-weight: bold; color: #ef4444; }
  .submit-button {
    width: 40%;
    height: 48px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(90deg, #2563eb, #1cb0f6);
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  .submit-button.van-button--disabled { background: #bdc5d4; opacity: 1; }
  </style>