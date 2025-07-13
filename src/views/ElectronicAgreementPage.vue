<template>
    <div class="electronic-agreement-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="电子协议"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <div class="agreement-card">
          <!-- 协议主标题 -->
          <h1 class="main-title">宽带服务入网协议</h1>
  
          <!-- 协议元数据 -->
          <div class="agreement-meta">
            <p><strong>协议编号:</strong> BBNET-20231120-001</p>
            <p><strong>甲方 (服务方):</strong> 中国移动通信集团</p>
            <p><strong>乙方 (用户):</strong> 王** (138****1234)</p>
          </div>
  
          <!-- 协议正文 -->
          <div class="agreement-body">
            <p>根据《中华人民共和国合同法》、《中华人民共和国电信条例》及相关法律法规，甲乙双方在平等、自愿、公平、诚实信用的基础上，就乙方向甲方申请办理宽带接入服务事宜，达成协议如下：</p>
            
            <section>
              <h2>第一条：服务内容</h2>
              <p>1.1 甲方利用其覆盖范围的宽带网络，为乙方提供互联网接入服务。</p>
              <p>1.2 乙方申请的服务套餐为：<strong>{{ serviceInfo.name }}</strong>，下行速率为{{ serviceInfo.downlink }}，上行速率为{{ serviceInfo.uplink }}。</p>
              <p>1.3 服务开通地点为：{{ serviceInfo.address }}。</p>
            </section>
  
            <section>
              <h2>第二条：费用与结算</h2>
              <p>2.1 本协议项下套餐费用为 <strong>¥{{ serviceInfo.price.toFixed(2) }}/年</strong>，支付方式及周期以乙方在业务受理时确定的为准。</p>
              <p>2.2 乙方应按照约定的时间和方式足额缴纳费用。若逾期未缴，甲方有权暂停提供服务，并按日加收3‰的滞纳金。</p>
            </section>
            
            <section>
              <h2>第三条：双方的权利和义务</h2>
              <p>3.1 甲方的权利和义务：保障网络正常运行，提供符合约定速率的服务；对乙方的个人信息负有保密义务；按照约定提供故障申告和维修服务。</p>
              <p>3.2 乙方的权利和义务：按时缴纳费用；遵守国家关于网络信息安全的各项规定，不得利用甲方网络从事任何违法活动；妥善保管账号密码等个人信息。</p>
            </section>
  
            <section>
              <h2>第四条：协议的生效与终止</h2>
              <p>4.1 本协议自乙方在业务受理单上签字或通过电子方式确认之时起生效，有效期为一年。</p>
              <p>4.2 协议到期前，若双方均无异议，可按约定方式续约。若需终止协议，需提前30日向对方提出申请。</p>
            </section>
          </div>
        </div>
        
        <!-- 下载按钮 -->
        <div class="download-button-wrapper">
          <van-button
            round
            block
            class="download-button"
            @click="onDownload"
          >
            <i class="fas fa-file-download button-icon"></i>
            下载协议 PDF
          </van-button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import { showToast } from 'vant';
  
  // Mock Data for the agreement content
  const serviceInfo = reactive({
    name: '500M家庭畅享年包',
    downlink: '500Mbps',
    uplink: '50Mbps',
    address: '广东省深圳市南山区科技园XX大厦101室',
    price: 1200.00,
  });
  
  // Methods
  const onClickLeft = () => history.back();
  const onDownload = () => {
    showToast.success('已开始下载 (模拟)');
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .electronic-agreement-page {
    background-color: #f4f7f9;
    min-height: 100vh;
  }
  :deep(.van-nav-bar__title) {
    font-weight: 600;
  }
  .main-content {
    padding: 24px 16px;
  }
  
  /* --- 协议卡片 --- */
  .agreement-card {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  }
  
  /* --- 协议排版 --- */
  .main-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #1f2937;
    margin-bottom: 24px;
  }
  .agreement-meta {
    font-size: 13px;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 16px;
    margin-bottom: 20px;
    line-height: 1.8;
  }
  .agreement-body {
    font-size: 14px;
    color: #374151;
    line-height: 1.8;
  }
  .agreement-body section {
    margin-top: 20px;
  }
  .agreement-body h2 {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    padding-bottom: 4px;
    border-bottom: 1px solid #f3f4f6;
    margin-bottom: 12px;
  }
  .agreement-body p {
    margin-bottom: 10px;
  }
  .agreement-body strong {
    font-weight: 600;
    color: #1d63ff;
  }
  
  /* --- 下载按钮 --- */
  .download-button-wrapper {
    margin-top: 24px;
  }
  .download-button {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
  }
  .button-icon {
    margin-right: 8px;
    color: #1d63ff;
  }
  </style>