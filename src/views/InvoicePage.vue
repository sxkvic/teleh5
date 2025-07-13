<template>
    <div class="invoice-request-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="申请开票"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      >
        <template #right>
          <span class="nav-right-text" @click="goToHistory">开票记录</span>
        </template>
      </van-nav-bar>
  
      <main class="main-content">
        <!-- 步骤 1: 选择可开票账单 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-list-alt title-icon"></i>选择可开票账单
          </h3>
          <van-checkbox-group v-model="selectedBills">
            <div class="bill-list">
              <div v-for="bill in availableBills" :key="bill.id" class="bill-item">
                <div class="bill-info">
                  <p class="bill-period">{{ bill.period }}</p>
                  <p class="bill-amount">¥{{ bill.amount.toFixed(2) }}</p>
                </div>
                <van-checkbox :name="bill.id" checked-color="#1d63ff" />
              </div>
            </div>
          </van-checkbox-group>
        </div>
  
        <!-- 步骤 2: 填写发票信息 -->
        <div class="section-card">
          <h3 class="section-title">
              <i class="fas fa-file-invoice title-icon"></i>填写发票信息
          </h3>
          <van-radio-group v-model="invoiceInfo.type" direction="horizontal" class="invoice-type-selector">
            <van-radio name="personal" checked-color="#1d63ff">个人/非企业单位</van-radio>
            <van-radio name="company" checked-color="#1d63ff">企业</van-radio>
          </van-radio-group>
          
          <template v-if="invoiceInfo.type === 'personal'">
            <van-field v-model="invoiceInfo.title" label="发票抬头" placeholder="请输入姓名或单位全称" required />
            <van-field v-model="invoiceInfo.phone" label="手机号码" placeholder="选填，方便联系" type="tel" />
          </template>
          
          <template v-if="invoiceInfo.type === 'company'">
            <van-field v-model="invoiceInfo.title" label="单位名称" placeholder="请输入公司全称" required />
            <van-field v-model="invoiceInfo.taxId" label="税号" placeholder="请输入纳税人识别号" required />
            <van-field v-model="invoiceInfo.address" label="单位地址" placeholder="请输入公司注册地址" required />
            <van-field v-model="invoiceInfo.telephone" label="单位电话" placeholder="请输入公司电话" type="tel" required />
            <van-field v-model="invoiceInfo.bankInfo" label="开户行及账号" placeholder="请输入开户行及银行账号" required />
          </template>
        </div>
        
         <!-- 步骤 3: 接收方式及备注 -->
        <div class="section-card">
          <h3 class="section-title">
              <i class="fas fa-envelope-open-text title-icon"></i>接收方式及备注
          </h3>
          <van-field v-model="invoiceInfo.email" label="电子邮箱" placeholder="用于接收电子发票" type="email" required>
            <template #left-icon><i class="fas fa-envelope field-icon"></i></template>
          </van-field>
          <van-field v-model="invoiceInfo.remarks" rows="2" autosize label="备注" type="textarea" placeholder="选填，可填写订单号等信息" class="remarks-field" />
        </div>
      </main>
  
      <!-- 底部提交栏 (自定义实现) -->
      <footer class="submit-footer">
          <div class="amount-summary">
              <span class="summary-label">合计开票金额：</span>
              <span class="summary-value">¥ {{ (totalAmount / 100).toFixed(2) }}</span>
          </div>
          <van-button
              class="submit-button"
              :disabled="isSubmitDisabled"
              @click="onSubmit"
          >
              提交申请
          </van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, reactive } from 'vue';
  import { showToast } from 'vant';
  
  const selectedBills = ref([]);
  const invoiceInfo = reactive({
    type: 'personal', title: '', phone: '', taxId: '', address: '',
    telephone: '', bankInfo: '', email: '', remarks: '',
  });
  
  const availableBills = ref([
    { id: '202311', period: '2023年11月账单', amount: 150.00 },
    { id: '202310', period: '2023年10月账单', amount: 148.00 },
    { id: '202309', period: '2023年09月账单', amount: 148.00 },
  ]);
  
  const totalAmount = computed(() => {
    const sum = availableBills.value
      .filter(bill => selectedBills.value.includes(bill.id))
      .reduce((total, bill) => total + bill.amount, 0);
    return sum * 100;
  });
  
  const isSubmitDisabled = computed(() => {
    if (selectedBills.value.length === 0 || !invoiceInfo.email.trim() || !invoiceInfo.title.trim()) { return true; }
    if (invoiceInfo.type === 'company' && (!invoiceInfo.taxId.trim() || !invoiceInfo.address.trim() || !invoiceInfo.telephone.trim() || !invoiceInfo.bankInfo.trim())) { return true; }
    return false;
  });
  
  const onClickLeft = () => history.back();
  const goToHistory = () => showToast('跳转到开票记录...');
  const onSubmit = () => {
    showToast.success('开票申请已提交！');
    console.log('Invoice Request:', JSON.parse(JSON.stringify(invoiceInfo)));
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .invoice-request-page {
    background-color: #f4f7f9;
    min-height: 100vh;
    padding-bottom: 100px; /* 增加底部空间 */
  }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .nav-right-text { color: #1d63ff; font-size: 14px; }
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
  
  /* --- 通用卡片和标题 --- */
  .section-card {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  }
  .section-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #f3f4f6;
  }
  .title-icon { color: #1d63ff; margin-right: 8px; width: 18px; text-align: center; }
  
  /* --- 账单列表 --- */
  .bill-list { display: flex; flex-direction: column; }
  .bill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  .bill-item:last-child { border-bottom: none; padding-bottom: 0; }
  .bill-period { font-size: 15px; color: #1f2937; }
  .bill-amount { font-size: 14px; color: #6b7280; margin-top: 4px; }
  
  /* --- 发票信息 --- */
  .invoice-type-selector { margin-bottom: 16px; }
  :deep(.van-field) { padding: 12px 0; align-items: flex-start; }
  :deep(.van-field__label) { width: 6.5em; color: #374151; font-weight: 500; }
  .field-icon { color: #9ca3af; margin-right: 8px; }
  .remarks-field { border-top: 1px solid #f3f4f6; margin-top: 12px; padding-top: 12px; }
  
  /* --- 自定义底部提交栏 --- */
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
  .amount-summary {
    display: flex;
    flex-direction: column;
  }
  .summary-label {
    font-size: 13px;
    color: #6b7280;
  }
  .summary-value {
    font-size: 22px;
    font-weight: bold;
    color: #ef4444; /* red-500 */
  }
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
  .submit-button.van-button--disabled {
    background: #bdc5d4;
    opacity: 1;
  }
  </style>