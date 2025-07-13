<template>
    <div class="my-bill-page">
      <!-- 1. 标准导航栏 -->
      <van-nav-bar
        title="我的账单"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <!-- 2. 全宽波浪页头 -->
      <div class="header-bg">
        <div class="header-content">
          <p class="due-amount-label">本期应缴金额 (元)</p>
          <h1 class="due-amount">¥{{ currentBill.amount.toFixed(2) }}</h1>
          <p class="due-date">缴费截止日期: {{ currentBill.dueDate }}</p>
        </div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
  
      <!-- 3. 主内容悬浮卡片 -->
      <div class="main-card">
        <van-tabs :active="activeTab" @update:active="activeTab = $event" class="bill-tabs">
          <!-- 本期账单 Tab -->
          <van-tab title="本期账单">
            <div class="tab-content">
              <div class="bill-details-list">
                <div class="detail-item">
                  <span class="label">账单周期</span>
                  <span class="value">{{ currentBill.period }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">套餐基础费</span>
                  <span class="value">¥{{ currentBill.baseFee.toFixed(2) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">其他费用</span>
                  <span class="value">¥{{ currentBill.otherFees.toFixed(2) }}</span>
                </div>
                <van-divider />
                <div class="detail-item total">
                  <span class="label">总计金额</span>
                  <span class="value">¥{{ currentBill.amount.toFixed(2) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">缴费状态</span>
                  <span class="value" :class="isPaid ? 'status-paid' : 'status-due'">
                    <i :class="isPaid ? 'fas fa-check-circle' : 'fas fa-info-circle'"></i>
                    {{ currentBill.status }}
                  </span>
                </div>
              </div>
              <van-button
                block
                class="pay-button"
                :disabled="isPaid"
                @click="onPay"
              >
                <i class="fas fa-credit-card button-icon"></i>
                {{ isPaid ? '已缴清' : '立即缴费' }}
              </van-button>
            </div>
          </van-tab>
          
          <!-- 历史账单 Tab -->
          <van-tab title="历史账单">
            <div class="tab-content">
              <div class="history-list">
                <div v-if="historyBills.length === 0" class="empty-state">
                  <p>暂无历史账单记录</p>
                </div>
                <div
                  v-else
                  v-for="bill in historyBills"
                  :key="bill.id"
                  class="history-item"
                >
                  <div class="history-info">
                    <p class="history-month">{{ bill.month }}</p>
                    <p class="history-status">已缴清</p>
                  </div>
                  <div class="history-amount">
                    <span>¥{{ bill.amount.toFixed(2) }}</span>
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
        
        <div class="help-link-wrapper">
          <a href="#" class="help-link">
            <i class="fas fa-question-circle help-icon"></i>
            对账单有疑问？
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { showToast } from 'vant';
  
  const activeTab = ref(0);
  
  const currentBill = ref({
    amount: 150.00,
    dueDate: '2023-12-25',
    period: '2023-11-01 至 2023-11-30',
    baseFee: 148.00,
    otherFees: 2.00,
    status: '待缴费',
  });
  
  const historyBills = ref([
    { id: 1, month: '2023年10月账单', amount: 150.00 },
    { id: 2, month: '2023年09月账单', amount: 148.00 },
    { id: 3, month: '2023年08月账单', amount: 148.00 },
  ]);
  
  const isPaid = computed(() => currentBill.value.status === '已缴清');
  
  const onClickLeft = () => history.back();
  
  const onPay = () => {
    showToast.loading({ message: '正在跳转支付...', forbidClick: true });
    setTimeout(() => {
      showToast.success('支付成功！');
      currentBill.value.status = '已缴清';
    }, 1500);
  };
  </script>
  
  <style scoped>
  /* --- 全局页面样式 --- */
  .my-bill-page {
    background-color: #f4f7f9;
    min-height: 100vh;
  }
  :deep(.van-nav-bar__title) {
    font-weight: 600;
  }
  
  /* --- 全宽波浪页头 --- */
  .header-bg {
    height: 220px; /* 增加高度 */
    background: linear-gradient(120deg, #2563eb 0%, #0ea5e9 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    z-index: 1;
  }
  .header-content {
    position: relative;
    z-index: 2;
  }
  .due-amount-label {
    font-size: 14px;
    opacity: 0.9;
  }
  .due-amount {
    font-size: 48px; /* 显著增大字号 */
    font-weight: bold;
    margin: 8px 0;
    letter-spacing: 1px;
  }
  .due-date {
    font-size: 13px;
    opacity: 0.8;
    background: rgba(255,255,255,0.15);
    padding: 4px 12px;
    border-radius: 99px;
    display: inline-block;
    margin-top: 8px;
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
    animation-delay: -5s; animation-duration: 20s; opacity: 0.5;
  }
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-1000px); }
  }
  
  /* --- 主卡片 --- */
  .main-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
    margin: -80px 16px 20px 16px; /* 增加负外边距以创建重叠效果 */
    position: relative;
    z-index: 2;
    overflow: hidden; /* 防止 Tab 指示器溢出 */
  }
  .bill-tabs {
    --van-tabs-line-height: 48px;
  }
  .tab-content {
    padding: 24px 24px 32px 24px;
  }
  
  /* --- 账单明细 --- */
  .bill-details-list {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 增加间距 */
    font-size: 15px; /* 增大字号 */
  }
  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail-item .label {
    color: #6b7280;
  }
  .detail-item .value {
    color: #1f2937;
    font-weight: 500;
  }
  .detail-item.total .value {
    font-weight: bold;
    font-size: 18px; /* 增大总计金额字号 */
  }
  .status-paid { color: #16a34a; }
  .status-due { color: #f97316; }
  .status-paid i, .status-due i { margin-right: 6px; }
  
  /* --- 历史账单 --- */
  .history-list { display: flex; flex-direction: column; }
  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0; /* 增加垂直内边距 */
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
  }
  .history-item:first-child { padding-top: 8px; }
  .history-item:last-child { border-bottom: none; }
  .history-month { font-size: 15px; color: #1f2937; }
  .history-status { font-size: 12px; color: #6b7280; margin-top: 4px; }
  .history-amount { font-size: 16px; font-weight: bold; color: #1f2937; display: flex; align-items: center; gap: 8px; }
  .history-amount i { color: #9ca3af; }
  
  /* --- 按钮和链接 --- */
  .pay-button {
    margin-top: 32px;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #2563eb, #1cb0f6);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  .pay-button.van-button--disabled { background: #e5e7eb; color: #9ca3af; box-shadow: none; opacity: 1; }
  .button-icon { margin-right: 8px; }
  
  .help-link-wrapper { text-align: center; padding: 24px 0 8px 0; }
  .help-link { font-size: 13px; color: #2563eb; text-decoration: none; }
  .help-icon { margin-right: 4px; }
  </style>