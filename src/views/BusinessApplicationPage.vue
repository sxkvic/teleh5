<template>
    <div class="service-application-page">
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="业务申请"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
  
      <main class="main-content">
        <!-- 模块 1: 选择申请的业务 -->
        <div class="section-card">
          <!-- 样式优化：将必填星号放在标题后 -->
          <h3 class="section-title">
            <i class="fas fa-box-open title-icon"></i>选择申请的业务 <span class="required-star">*</span>
          </h3>
          <van-field
            v-model="formData.serviceName"
            is-link
            readonly
            placeholder="请选择您要办理的宽带套餐"
            @click="showServicePicker = true"
          />
        </div>
        
        <!-- 模块 2: 办理人信息 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-user-circle title-icon"></i>办理人信息 <span class="required-star">*</span>
          </h3>
          <!-- 样式优化：移除原生 required 属性 -->
          <van-field v-model="formData.name" label="姓名" placeholder="请输入真实姓名">
            <template #left-icon><i class="fas fa-user field-icon"></i></template>
          </van-field>
          <van-field v-model="formData.idNumber" label="身份证号" placeholder="请输入18位身份证号">
            <template #left-icon><i class="fas fa-id-card field-icon"></i></template>
          </van-field>
        </div>
  
        <!-- 模块 3: 安装信息 -->
        <div class="section-card">
          <h3 class="section-title">
            <i class="fas fa-map-marker-alt title-icon"></i>安装信息 <span class="required-star">*</span>
          </h3>
          <!-- 功能简化：移除报错的 van-area，改为无点击事件的伪输入框 -->
          <van-field
            v-model="formData.address"
            is-link
            readonly
            label="安装地址"
            placeholder="功能开发中，暂不可选"
          />
          <van-field
            v-model="formData.appointmentDate"
            is-link
            readonly
            label="预约时间"
            placeholder="请选择期望上门安装日期"
            @click="showCalendar = true"
          />
        </div>
      </main>
  
      <!-- 底部提交栏 -->
      <footer class="submit-footer">
        <div class="agreement-section">
          <van-checkbox v-model="isAgreed" icon-size="16px" shape="square" checked-color="#1d63ff">
            <span class="agreement-text">我已阅读并同意 <a href="#">《宽带服务协议》</a></span>
          </van-checkbox>
        </div>
        <van-button
          block
          class="submit-button"
          :disabled="isSubmitDisabled"
          @click="onSubmit"
        >
          提交申请
        </van-button>
      </footer>
  
      <!-- 业务选择器 -->
      <van-popup :show="showServicePicker" @update:show="showServicePicker = $event" round position="bottom">
        <van-picker :columns="serviceColumns" @cancel="showServicePicker = false" @confirm="onServiceConfirm" />
      </van-popup>
      
      <!-- 日历选择器 -->
      <van-calendar :show="showCalendar" @update:show="showCalendar = $event" @confirm="onDateConfirm" :min-date="minDate" />
      
      <!-- 地址选择器已移除以修复报错 -->
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  import { showToast } from 'vant';
  // import { areaList } from '@vant/area-data'; // 移除 areaList 导入
  
  // State
  const formData = reactive({
    serviceName: '', serviceId: null, name: '', idNumber: '',
    address: '', // 地址字段保留，但功能禁用
    appointmentDate: '',
  });
  const isAgreed = ref(false);
  const showServicePicker = ref(false);
  const showCalendar = ref(false);
  // const showAddressPicker = ref(false); // 移除地址选择器的状态
  
  const serviceColumns = [{ text: '300M家庭基础版', value: '300M' }, { text: '500M家庭畅享版', value: '500M' }, { text: '1000M全家千兆版', value: '1000M' }];
  const minDate = new Date();
  
  // Computed
  const isSubmitDisabled = computed(() => {
    // 注意：校验逻辑中暂时移除了对 address 的校验
    return !formData.serviceId || !formData.name.trim() || !formData.idNumber.trim() || !formData.appointmentDate.trim() || !isAgreed.value;
  });
  
  // Methods
  const onClickLeft = () => history.back();
  const onServiceConfirm = ({ selectedOptions }) => {
    formData.serviceName = selectedOptions[0]?.text;
    formData.serviceId = selectedOptions[0]?.value;
    showServicePicker.value = false;
  };
  const onDateConfirm = (date) => {
    formData.appointmentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    showCalendar.value = false;
  };
  // const onAddressConfirm = (values) => { // 移除地址确认方法
  //     formData.address = values.selectedOptions.map(item => item.text).join('/');
  //     showAddressPicker.value = false;
  // };
  const onSubmit = () => {
    showToast.success('申请已提交，请等待客服与您联系！');
    console.log('Application Data:', JSON.parse(JSON.stringify(formData)));
  };
  </script>
  
  <style scoped>
  /* --- 全局样式 --- */
  .service-application-page { background-color: #f4f7f9; min-height: 100vh; padding-bottom: 120px; }
  :deep(.van-nav-bar__title) { font-weight: 600; }
  .main-content { padding: 16px; display: flex; flex-direction: column; gap: 20px; }
  
  /* --- 通用卡片和标题 --- */
  .section-card { background-color: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
  .section-title { display: flex; align-items: center; font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 12px; }
  .title-icon { color: #1d63ff; margin-right: 10px; width: 20px; text-align: center; }
  .required-star { color: #ef4444; margin-left: 4px; font-weight: normal; }
  
  /* --- Vant Field 自定义 --- */
  :deep(.van-cell) { padding: 14px 0; }
  :deep(.van-cell::after) { left: 0; right: 0; border-bottom: 1px solid #f3f4f6; }
  :deep(.van-cell:last-child::after) { border-bottom: none; }
  :deep(.van-field__label) { width: 6em; color: #374151; }
  .field-icon { font-size: 16px; color: #9ca3af; margin-right: 8px; }
  
  /* --- 底部提交栏 --- */
  .submit-footer { position: fixed; bottom: 0; left: 0; right: 0; padding: 16px; background-color: white; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); }
  .agreement-section { text-align: center; margin-bottom: 12px; }
  .agreement-text { font-size: 13px; color: #6b7280; }
  .agreement-text a { color: #1d63ff; text-decoration: none; }
  .submit-button { height: 48px; border-radius: 999px; border: none; background: linear-gradient(90deg, #2563eb, #1cb0f6); color: white; font-size: 16px; font-weight: 500; }
  .submit-button.van-button--disabled { background: #bdc5d4; }
  </style>