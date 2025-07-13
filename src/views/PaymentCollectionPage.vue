<template>
    <div class="pay-for-others-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="为他人缴费"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 模块 1: 查询账户 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-user-friends title-icon"></i>为他人宽带缴费
          </h3>
          <van-field
            v-model="queryInput"
            placeholder="请输入对方的宽带账号或绑定的手机号"
            class="query-input"
          />
          <van-button
            block
            class="action-button"
            :loading="isLoading"
            @click="onQueryAccount"
          >
            查询账户
          </van-button>
        </div>
  
        <!-- 模块 2: 确认信息并缴费 (查询后显示) -->
        <div v-if="isAccountFound" class="section-card confirmation-card">
          <h3 class="section-title">
            <i class="fas fa-check-circle title-icon success"></i>请确认缴费信息
          </h3>
          <!-- 账户信息 -->
          <div class="account-info-list">
            <div class="info-item">
              <span class="label">缴费户名</span>
              <span class="value">{{ accountInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">宽带账号</span>
              <span class="value">{{ accountInfo.accountId }}</span>
            </div>
            <div class="info-item">
              <span class="label">当前余额</span>
              <span class="value">¥{{ accountInfo.balance.toFixed(2) }}</span>
            </div>
          </div>
          
          <!-- 缴费金额选择 -->
          <h4 class="sub-title">选择缴费金额</h4>
          <div class="amount-grid">
            <div
              v-for="amount in amounts"
              :key="amount"
              class="amount-card"
              :class="{ 'selected': selectedAmount === amount && !customAmount }"
              @click="selectAmount(amount)"
            >
              {{ amount }}元
            </div>
            <div class="amount-card custom-input-wrapper">
              <input type="number" v-model="customAmount" placeholder="其他" class="custom-amount-input">
            </div>
          </div>
        </div>
      </main>
  
      <!-- 底部提交栏 (查询后显示) -->
      <footer v-if="isAccountFound" class="submit-footer">
        <div class="amount-summary">
          <span class="summary-label">支付金额：</span>
          <span class="summary-value">¥ {{ finalAmount.toFixed(2) }}</span>
        </div>
        <van-button
          class="submit-button"
          :disabled="finalAmount <= 0"
          @click="onSubmit"
        >
          确认缴费
        </van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, watch } from 'vue';
  import { showToast } from 'vant';
  
  // State
  const queryInput = ref('');
  const isLoading = ref(false);
  const isAccountFound = ref(false);
  const accountInfo = reactive({ name: '', accountId: '', balance: 0 });
  const selectedAmount = ref(null);
  const customAmount = ref('');
  const amounts = [50, 100, 200, 300, 500];
  
  // Computed
  const finalAmount = computed(() => parseFloat(customAmount.value) || selectedAmount.value || 0);
  
  // Watcher to clear preset amount when custom amount is entered
  watch(customAmount, (newValue) => {
    if (newValue) { selectedAmount.value = null; }
  });
  
  // Methods
  const onClickLeft = () => history.back();
  
  const onQueryAccount = () => {
    if (!queryInput.value.trim()) {
      showToast('请输入宽带账号');
      return;
    }
    isLoading.value = true;
    isAccountFound.value = false; // Reset on new query
    setTimeout(() => {
      // Simulate API response
      if (queryInput.value === 'error') {
        showToast('未查询到该账户，请核对后重试');
      } else {
        Object.assign(accountInfo, {
          name: '王**',
          accountId: queryInput.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
          balance: 35.50
        });
        isAccountFound.value = true;
      }
      isLoading.value = false;
    }, 1000);
  };
  
  const selectAmount = (amount) => {
    customAmount.value = '';
    selectedAmount.value = amount;
  };
  
  const onSubmit = () => {
    showToast.success(`成功为 ${accountInfo.name} 缴费 ${finalAmount.value}元`);
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .pay-for-others-page { background-color: #f4f7f9; min-height: 100vh; padding-bottom: 100px; }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
  
  /* --- 通用卡片和标题 --- */
  .section-card { background-color: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
  .section-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
  .title-icon { color: #1d63ff; margin-right: 10px; }
  .title-icon.success { color: #16a34a; }
  
  /* --- 查询模块 --- */
  .query-input { margin-bottom: 20px; }
  .action-button { height: 48px; border-radius: 12px; border: none; background: #1d63ff; color: white; font-size: 16px; font-weight: 500; }
  
  /* --- 确认模块 --- */
  .confirmation-card { animation: fadeIn 0.5s ease-in-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .account-info-list { display: flex; flex-direction: column; gap: 16px; font-size: 15px; border-bottom: 1px solid #f3f4f6; padding-bottom: 20px; margin-bottom: 20px; }
  .info-item { display: flex; justify-content: space-between; }
  .info-item .label { color: #6b7280; }
  .info-item .value { color: #1f2937; font-weight: 500; }
  
  /* --- 金额选择 --- */
  .sub-title { font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 16px; }
  .amount-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .amount-card {
    padding: 16px 4px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
  }
  .amount-card.selected { border-color: #1d63ff; background-color: #eff6ff; color: #1d63ff; }
  .custom-input-wrapper { padding: 0; }
  .custom-amount-input { width: 100%; height: 100%; border: none; background: none; text-align: center; font-size: 16px; outline: none; }
  
  /* --- 底部提交栏 --- */
  .submit-footer { position: fixed; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 16px; padding-bottom: calc(16px + env(safe-area-inset-bottom)); background-color: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); }
  .amount-summary { display: flex; flex-direction: column; }
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
  .submit-button.van-button--disabled { background: #bdc5d4; }
  </style>