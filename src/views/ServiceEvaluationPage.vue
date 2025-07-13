<template>
    <div class="rating-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="服务评价"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 步骤 1: 选择服务工单 -->
        <div class="section-card">
          <h3 class="section-title">
            <span class="step-circle">1</span>请选择您要评价的服务工单
          </h3>
          <div class="order-list">
            <div
              v-for="order in workOrders"
              :key="order.id"
              class="order-card"
              :class="{ 'selected': selectedOrderId === order.id }"
              @click="selectedOrderId = order.id"
            >
              <div>
                <p class="order-title">{{ order.title }}</p>
                <p class="order-time">完成时间: {{ order.time }}</p>
              </div>
              <!-- 手动实现的圆形对勾 -->
              <div v-if="selectedOrderId === order.id" class="checked-icon-wrapper">
                  <i class="fas fa-check"></i>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 步骤 2: 打分和标签 -->
        <div class="section-card">
          <h3 class="section-title">
            <span class="step-circle">2</span>请为本次服务打分
          </h3>
          <div class="rating-area">
            <van-rate v-model="rating" :size="32" color="#f59e0b" void-icon="star" void-color="#e5e7eb" />
            <p class="rating-feedback-text">{{ ratingFeedback }}</p>
          </div>
          <div class="tags-area">
            <h4 class="tags-subtitle">您可以选择标签，评价更具体哦</h4>
            <div class="tags-wrapper">
              <span
                v-for="tag in feedbackTags"
                :key="tag"
                class="feedback-tag"
                :class="{ 'selected': selectedTags.includes(tag) }"
                @click="toggleTag(tag)"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
        
        <!-- 步骤 3: 宝贵意见 -->
        <div class="section-card">
          <h3 class="section-title">
            <span class="step-circle">3</span>请留下您的宝贵意见 (选填)
          </h3>
          <van-field
            v-model="comment"
            rows="4"
            autosize
            type="textarea"
            placeholder="您的建议是我们前进的动力..."
            class="comment-textarea"
          />
          <div class="anonymous-rating">
              <van-checkbox v-model="isAnonymous" icon-size="16px" shape="square" checked-color="#1d63ff">匿名评价</van-checkbox>
          </div>
        </div>
      </main>
      
      <!-- 底部提交栏 -->
      <footer class="submit-footer">
          <van-button
              block
              class="submit-button"
              :class="{ 'disabled': isSubmitDisabled }"
              :disabled="isSubmitDisabled"
              @click="onSubmit"
          >
              提交评价
          </van-button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { showToast } from 'vant';
  
  const selectedOrderId = ref(null);
  const rating = ref(0);
  const selectedTags = ref([]);
  const comment = ref('');
  const isAnonymous = ref(false);
  
  const workOrders = ref([
    { id: 'WZ20231026', title: '宽带新装工单', time: '2023-10-26 15:30' },
    { id: 'WX20231020', title: '故障维修工单', time: '2023-10-20 11:00' },
  ]);
  const feedbackTags = [
    '服务热情', '技术专业', '着装整洁', '准时上门',
    '问题已解决', '等待太久', '态度恶劣', '问题未解决'
  ];
  const ratingMessages = [
    "感谢您的反馈，我们会做得更好",
    "非常抱歉，我们的服务没能让您满意",
    "很遗憾，我们会努力改进",
    "感谢您的反馈，我们会做得更好",
    "谢谢您的认可，我们会继续努力",
    "太棒了！感谢您的五星好评！"
  ];
  
  const onClickLeft = () => history.back();
  
  const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
      selectedTags.value.splice(index, 1);
    } else {
      selectedTags.value.push(tag);
    }
  };
  
  const onSubmit = () => {
    console.log({
      orderId: selectedOrderId.value,
      rating: rating.value,
      tags: selectedTags.value,
      comment: comment.value,
      isAnonymous: isAnonymous.value,
    });
    showToast.success('评价提交成功！');
  };
  
  const ratingFeedback = computed(() => ratingMessages[rating.value]);
  const isSubmitDisabled = computed(() => !selectedOrderId.value || rating.value === 0);
  
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .rating-page {
    background-color: #f4f7f9;
    min-height: 100vh;
    padding-bottom: 90px;
  }
  :deep(.van-nav-bar__title) {
    font-weight: 600;
    font-size: 17px;
  }
  .main-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 20px; /* 增加卡片间距 */
  }
  
  /* --- 卡片和标题 --- */
  .section-card {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .section-title {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 20px;
  }
  .step-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #2563eb;
    color: white;
    font-size: 12px;
    margin-right: 8px;
  }
  
  /* --- 工单选择 --- */
  .order-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .order-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .order-card.selected {
    border: 2px solid #2563eb;
    background-color: #eff6ff;
  }
  .order-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
  .order-time {
    font-size: 13px;
    color: #6b7280;
    margin-top: 6px;
  }
  .checked-icon-wrapper {
    width: 24px;
    height: 24px;
    background-color: #2563eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
  }
  
  /* --- 评分和标签 --- */
  .rating-area {
    text-align: center;
    padding-bottom: 20px;
  }
  .rating-feedback-text {
    margin-top: 16px;
    font-size: 14px;
    color: #6b7280;
    min-height: 20px;
  }
  .tags-area {
    border-top: 1px solid #f3f4f6;
    padding-top: 20px;
  }
  .tags-subtitle {
    font-size: 14px;
    color: #374151;
    margin-bottom: 16px;
  }
  .tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .feedback-tag {
    padding: 6px 14px;
    font-size: 13px;
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #f3f4f6;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .feedback-tag.selected {
    background-color: #dbeafe;
    color: #1d4ed8;
    border-color: #93c5fd;
    font-weight: 500;
  }
  
  /* --- 评论区 --- */
  .comment-textarea {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
  :deep(.comment-textarea .van-field__control) {
      min-height: 80px;
  }
  .anonymous-rating {
    margin-top: 16px;
    font-size: 14px;
  }
  :deep(.van-checkbox__label) {
      color: #374151;
  }
  
  /* --- 底部提交栏 --- */
  .submit-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    padding: 16px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom));
    border-top: 1px solid #f0f0f0;
  }
  .submit-button {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 999px;
  }
  .submit-button.disabled {
    background: #bdc5d4;
    color: white;
    opacity: 1; /* Vant's default opacity might be too strong */
  }
  .submit-button:not(.disabled) {
    background: linear-gradient(90deg, #2563eb, #1cb0f6);
    color: white;
  }
  </style>