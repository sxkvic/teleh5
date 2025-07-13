<template>
  <div class="product-query-page">
    <!-- 1. 顶部导航栏 -->
    <van-nav-bar
      title="我的产品查询"
      left-arrow
      fixed
      placeholder
      class="nav-bar"
      @click-left="onClickLeft"
    />

    <!-- 2. 主内容区域 -->
    <main class="main-content">
      <div class="query-card">
        <h2 class="card-title">查询您的宽带产品信息</h2>
        
        <form @submit.prevent="onSubmit" class="query-form">
          <!-- 自定义输入框以完美还原样式 -->
          <div class="input-wrapper">
            <i class="fas fa-barcode input-icon"></i>
            <input
              type="text"
              v-model="queryInput"
              class="custom-input"
              placeholder="输入设备码 / 宽带账号"
              required
            />
          </div>

          <div class="button-wrapper">
            <van-button
              block
              native-type="submit"
              class="submit-button"
              :loading="isLoading"
              loading-text="查询中..."
            >
              <i class="fas fa-search button-icon"></i>
              立即查询
            </van-button>
          </div>
        </form>
        
        <div class="help-link-wrapper">
          <a href="#" class="help-link">
            <i class="fas fa-question-circle help-icon"></i>
            如何找到我的设备码？
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

// State
const queryInput = ref('');
const isLoading = ref(false);

// Event Handlers
const onClickLeft = () => history.back();

const onSubmit = () => {
  if (!queryInput.value.trim()) {
    showToast('请输入设备码或宽带账号');
    return;
  }
  
  isLoading.value = true;
  console.log('Querying for:', queryInput.value);

  setTimeout(() => {
    isLoading.value = false;
    showToast.success('查询成功！');
  }, 1500);
};
</script>

<style scoped>
/* --- 全局页面样式 --- */
.product-query-page {
  background-color: #f4f7f9;
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.nav-bar {
  --van-nav-bar-background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
:deep(.van-nav-bar__title) {
  font-weight: 600;
  font-size: 17px;
}

/* --- 主内容区 --- */
.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px; /* 增加顶部间距 */
  height: calc(100vh - 46px);
  overflow-y: auto;
}

/* --- 查询卡片 --- */
.query-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
}
.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 28px;
}

/* --- 表单 --- */
.query-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 增加输入框和按钮的间距 */
}

/* --- 自定义输入框样式 --- */
.input-wrapper {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9ca3af;
}
.custom-input {
  width: 100%;
  height: 50px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding-left: 48px; /* 为图标留出空间 */
  padding-right: 16px;
  font-size: 16px;
  color: #1f2937;
  transition: border-color 0.2s;
  outline: none;
  -webkit-appearance: none; /* 移除 iOS 上的默认样式 */
}
.custom-input::placeholder {
  color: #9ca3af;
}
.custom-input:focus {
  border-color: #3b82f6;
}

/* --- 查询按钮 --- */
.submit-button {
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
}

/* --- 帮助链接 --- */
.help-link-wrapper {
  margin-top: 20px;
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