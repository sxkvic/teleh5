<template>
    <div class="recharge-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar fixed placeholder class="nav-bar" @click-left="onClickLeft">
        <template #left>
          <van-icon name="arrow-left" size="18" color="#333" />
        </template>
        <template #title>
          <div class="nav-title">账户充值</div>
        </template>
        <template #right>
          <span class="nav-right-text">充值记录</span>
        </template>
      </van-nav-bar>
  
      <div class="main-content">
        <!-- 2. 账户余额卡片 -->
        <div class="balance-card">
          <p class="balance-label">当前账户余额 (元)</p>
          <p class="balance-amount">{{ currentBalance }}</p>
          <p class="account-id">宽带账号: {{ broadbandAccount }}</p>
        </div>
  
        <!-- 3. 充值金额选择 -->
        <div class="section-card">
          <h3 class="section-title">选择充值金额</h3>
          <div class="amount-grid">
            <div
              v-for="item in rechargeAmounts"
              :key="item.value"
              class="amount-card"
              :class="{ 'selected': selectedAmount === item.value && !customAmount }"
              @click="selectAmount(item.value)"
            >
              <div v-if="item.bonus" class="bonus-tag">{{ item.bonus }}</div>
              <p class="amount-value">{{ item.value }}元</p>
              <p class="amount-price">售价 ¥{{ item.price.toFixed(2) }}</p>
            </div>
          </div>
          <div class="custom-amount-wrapper">
            <span class="currency-symbol">¥</span>
            <input
              v-model="customAmount"
              type="number"
              class="custom-amount-input"
              placeholder="其他金额"
            />
          </div>
        </div>
        
        <!-- 4. 支付方式选择 -->
        <div class="section-card">
          <h3 class="section-title">选择支付方式</h3>
          <div class="payment-method">
            <div class="payment-info">
              <!-- 已更新为 Font Awesome 图标 -->
              <i class="fab fa-weixin payment-icon"></i>
              <span>微信支付</span>
            </div>
            <van-icon name="checked" color="#1d63ff" size="20" />
          </div>
        </div>
      </div>
  
      <!-- 5. 底部确认栏 -->
      <footer class="submit-footer">
        <div class="agreement-section">
          <van-checkbox v-model="isAgreed" icon-size="16px" checked-color="#1d63ff">
            <span class="agreement-text">
              我已阅读并同意 <a href="#" class="agreement-link">《充值服务协议》</a>
            </span>
          </van-checkbox>
        </div>
        <van-button
          round
          block
          class="submit-button"
          :class="{ 'disabled': isSubmitDisabled }"
          :disabled="isSubmitDisabled"
          @click="onSubmit"
        >
          确认支付
        </van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { showToast } from 'vant';
  
  const currentBalance = ref('12.50');
  const broadbandAccount = ref('GDZ03012345');
  const rechargeAmounts = ref([
    { value: 50, price: 50.00 },
    { value: 100, price: 100.00 },
    { value: 200, price: 200.00, bonus: '送2元' },
    { value: 300, price: 300.00 },
    { value: 500, price: 500.00 },
  ]);
  
  const selectedAmount = ref(null);
  const customAmount = ref('');
  const isAgreed = ref(false);
  
  const onClickLeft = () => history.back();
  
  const selectAmount = (amount) => {
    customAmount.value = ''; 
    selectedAmount.value = amount;
  };
  
  const onSubmit = () => {
    const finalAmount = customAmount.value || selectedAmount.value;
    showToast(`支付 ${finalAmount} 元成功`);
  };
  
  watch(customAmount, (newValue) => {
    if (newValue) {
      selectedAmount.value = null;
    }
  });
  
  const isSubmitDisabled = computed(() => {
    const amountIsValid = (selectedAmount.value > 0) || (parseFloat(customAmount.value) > 0);
    return !amountIsValid || !isAgreed.value;
  });
  
  </script>
  
  <style scoped>
  /* 确保您已在项目中全局引入了 Font Awesome */
  
  /* --- 全局 --- */
  .recharge-page {
    background-color: #f4f7f9;
    min-height: 100vh;
    padding-bottom: 120px;
  }
  .main-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  /* --- 顶部导航栏 --- */
  .nav-bar {
    --van-nav-bar-background: #f4f7f9;
  }
  :deep(.van-nav-bar__content) {
    border-bottom: none;
  }
  .nav-title {
    font-size: 17px;
    font-weight: 600;
    color: #1f2937;
  }
  .nav-right-text {
    color: #1d63ff;
    font-size: 14px;
  }
  
  /* --- 余额卡片 --- */
  .balance-card {
    background: linear-gradient(90deg, #2563eb, #3b82f6);
    color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
  }
  .balance-label {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }
  .balance-amount {
    font-size: 38px;
    font-weight: 700;
    margin: 8px 0;
    letter-spacing: 1px;
  }
  .account-id {
    font-size: 13px;
    opacity: 0.9;
    margin: 0;
  }
  
  /* --- 通用区块卡片 --- */
  .section-card {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  }
  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin: 0 0 16px 0;
  }
  
  /* --- 充值金额网格 --- */
  .amount-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .amount-card {
    width: 100%;
    padding: 12px 4px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
  }
  .amount-card.selected {
    border-color: #1d63ff;
    background-color: #f0f5ff;
  }
  .amount-value {
    font-size: 18px;
    font-weight: bold;
    color: #1f2937;
    margin: 0;
  }
  .amount-price {
    font-size: 12px;
    color: #6b7280;
    margin: 4px 0 0 0;
  }
  .bonus-tag {
    position: absolute;
    top: -10px;
    right: -8px;
    background-color: #ef4444;
    color: white;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 6px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  }
  
  /* --- 其他金额输入 --- */
  .custom-amount-wrapper {
    margin-top: 12px;
    background-color: #f3f4f6;
    border-radius: 10px;
    border: 1px solid #f3f4f6;
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
  .custom-amount-wrapper:focus-within {
    border-color: #a5b4fc;
    background-color: white;
  }
  .custom-amount-input {
    width: 100%;
    border: none;
    background: none;
    outline: none;
    text-align: center;
    font-size: 16px;
    padding: 12px 0;
    font-weight: 500;
    color: #1f2937;
  }
  .currency-symbol {
    font-size: 18px;
    color: #1f2937;
    font-weight: 600;
  }
  
  /* --- 支付方式 --- */
  .payment-method {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 4px;
  }
  .payment-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 500;
    color: #374151;
  }
  .payment-icon {
    font-size: 24px;
    color: #09BB07; /* 微信绿 */
  }
  
  /* --- 底部提交 --- */
  .submit-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    padding: 12px 16px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
    border-top: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .agreement-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .agreement-text {
    font-size: 12px;
    color: #6b7280;
  }
  .agreement-link {
    color: #1d63ff;
    text-decoration: none;
  }
  .submit-button {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border: none;
  }
  .submit-button.disabled {
    background-color: #bdc5d4;
    color: white;
  }
  .submit-button:not(.disabled) {
    background: #1d63ff;
    color: white;
  }
  </style>