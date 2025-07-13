<template>
    <div class="report-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar title="举报投诉" left-arrow fixed placeholder @click-left="onClickLeft" />
  
      <!-- 2. Tab 切换 -->
      <van-tabs :active="activeTab" @update:active="activeTab = $event" sticky class="tabs-container">
        <van-tab>
          <template #title><i class="fas fa-edit tab-icon"></i>我要投诉</template>
          <!-- 投诉表单内容 -->
          <div class="form-content">
            <!-- 提示信息 -->
            <div class="info-box">
              您的每一次反馈都至关重要。请如实填写，我们承诺对您的信息严格保密，并尽快处理。
            </div>
            
            <!-- 表单 -->
            <van-form @submit="onSubmit">
              <div class="form-section-card">
                <label class="field-label">投诉类型 <span class="required-star">*</span></label>
                <van-field
                  v-model="complaintTypeText"
                  is-link
                  readonly
                  placeholder="请选择投诉类型"
                  @click="showPicker = true"
                />
              </div>
  
              <div class="form-section-card">
                <label class="field-label">问题描述 <span class="required-star">*</span></label>
                <van-field
                  v-model="description"
                  rows="5"
                  autosize
                  type="textarea"
                  maxlength="500"
                  placeholder="请详细描述您遇到的问题，以便我们更好地为您处理..."
                  show-word-limit
                />
              </div>
              
              <div class="form-section-card">
                <label class="field-label">上传凭证 <span class="label-optional">(选填，最多5张)</span></label>
                <van-uploader v-model="fileList" :max-count="5" />
              </div>
  
              <div class="form-section-card">
                <label class="field-label">联系手机</label>
                <van-field
                  v-model="contactPhone"
                  class="readonly-field"
                  readonly
                />
              </div>
              
              <div class="submit-button-wrapper">
                <van-button
                  round
                  block
                  native-type="submit"
                  class="submit-button"
                  :class="{ 'disabled': isSubmitDisabled }"
                  :disabled="isSubmitDisabled"
                >
                  提交
                </van-button>
              </div>
            </van-form>
          </div>
        </van-tab>
        
        <van-tab>
          <template #title><i class="fas fa-history tab-icon"></i>我的投诉</template>
          <!-- 我的投诉历史内容 -->
          <div class="history-content">
            <div class="history-item">
              <div class="history-header">
                <p class="history-title">投诉类型：技术故障/网络问题</p>
                <span class="status-tag status-completed">已完结</span>
              </div>
              <div class="history-body">
                <p><strong>提交时间：</strong>2023-10-27 10:15</p>
                <p><strong>处理结果：</strong>工程师已上门处理并解决，网络已恢复。</p>
              </div>
            </div>
             <div class="history-item">
              <div class="history-header">
                <p class="history-title">投诉类型：服务人员态度问题</p>
                <span class="status-tag status-processing">处理中</span>
              </div>
              <div class="history-body">
                <p><strong>提交时间：</strong>2023-11-05 14:00</p>
                <p><strong>最新进展：</strong>投诉已受理，正在核实情况。</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
  
      <!-- 投诉类型选择器 -->
      <van-popup :show="showPicker" @update:show="showPicker = $event" round position="bottom">
        <van-picker
          :columns="pickerColumns"
          @cancel="showPicker = false"
          @confirm="onPickerConfirm"
        />
      </van-popup>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { showToast } from 'vant';
  
  // Tab state
  const activeTab = ref(0);
  
  // Form state
  const complaintType = ref('');
  const complaintTypeText = ref('');
  const description = ref('');
  const fileList = ref([]);
  const contactPhone = ref('138****1234');
  
  // Picker state
  const showPicker = ref(false);
  const pickerColumns = [
    { text: '服务人员态度问题', value: 'service-attitude' },
    { text: '乱收费/费用疑问', value: 'billing-issue' },
    { text: '技术故障/网络问题', value: 'technical-fault' },
    { text: '套餐/活动虚假宣传', value: 'false-advertising' },
    { text: '预约安装/维修问题', value: 'appointment-issue' },
    { text: '其他问题', value: 'other' },
  ];
  
  // Event Handlers
  const onClickLeft = () => history.back();
  
  const onPickerConfirm = ({ selectedOptions }) => {
    complaintType.value = selectedOptions[0]?.value;
    complaintTypeText.value = selectedOptions[0]?.text;
    showPicker.value = false;
  };
  
  const onSubmit = () => {
    console.log('Form submitted:', {
      type: complaintType.value,
      description: description.value,
      files: fileList.value,
    });
    showToast.success('提交成功！');
  };
  
  // Computed property for button state
  const isSubmitDisabled = computed(() => {
    return !complaintType.value || !description.value.trim();
  });
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .report-page {
    background-color: #f4f7f9;
    min-height: 100vh;
  }
  :deep(.van-nav-bar) {
    --van-nav-bar-background: white;
  }
  :deep(.van-nav-bar__title) {
    font-weight: bold;
  }
  
  /* --- Tabs 切换 --- */
  .tabs-container {
    --van-tabs-line-height: 50px;
  }
  .tab-icon {
    margin-right: 5px;
  }
  :deep(.van-tab--active) {
    color: #1d63ff;
  }
  :deep(.van-tabs__line) {
    background: #1d63ff;
  }
  
  /* --- 表单内容区域 --- */
  .form-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .info-box {
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #374151;
    font-size: 13px;
    border-radius: 8px;
    padding: 12px;
    line-height: 1.6;
  }
  .form-section-card {
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 16px;
  }
  .field-label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #374151;
    margin-bottom: 12px; /* 增加标签和输入框的间距 */
  }
  .required-star {
    color: #ef4444;
    margin-left: 2px;
  }
  .label-optional {
    font-weight: normal;
    color: #6b7280;
    font-size: 13px;
  }
  
  /* --- 输入框自定义 --- */
  :deep(.van-cell) {
    padding: 10px;
    background-color: #f7f8fa;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }
  :deep(.van-field__control::placeholder) {
    color: #9ca3af;
  }
  :deep(.van-field--textarea) {
    padding: 12px;
  }
  .readonly-field {
    background-color: #f3f4f6 !important;
    color: #374151;
  }
  
  /* --- 上传组件样式修正 --- */
  :deep(.van-uploader) {
    width: 100%;
  }
  :deep(.van-uploader__wrapper) {
    width: 100%;
  }
  :deep(.van-uploader__upload) {
    width: 100%;
    height: 120px; /* 增加高度以匹配截图 */
    margin: 0;
    background-color: #f9fafb;
    border: 2px dashed #d1d5db; /* 使用虚线边框 */
    border-radius: 12px;
  }
  :deep(.van-uploader__upload-icon) {
    color: #9ca3af;
    font-size: 28px;
  }
  /* 添加自定义的文字提示 */
  :deep(.van-uploader__upload)::after {
    content: '点击上传图片';
    position: absolute;
    bottom: 25px; /* 定位在图标下方 */
    font-size: 12px;
    color: #6b7280;
  }
  
  /* --- 提交按钮 --- */
  .submit-button-wrapper {
    margin-top: 16px;
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
    background-color: #1d63ff;
    color: white;
  }
  
  /* --- 历史记录样式 --- */
  .history-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .history-item {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }
  .history-title {
    font-weight: 600;
    color: #1f2937;
  }
  .status-tag {
    font-size: 12px;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 999px;
    flex-shrink: 0;
  }
  .status-completed {
    background-color: #dcfce7;
    color: #166534;
  }
  .status-processing {
    background-color: #fef9c3;
    color: #854d0e;
  }
  .history-body {
    padding-top: 12px;
    font-size: 13px;
    color: #6b7280;
    line-height: 1.8;
  }
  </style>