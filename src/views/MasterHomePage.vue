<template>
  <div class="master-home-page">
    <!-- 1. 顶部个人信息卡片 -->
    <div class="header-section">
      <div class="profile-card">
        <div class="avatar-container">
          <div class="avatar-ring">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" alt="Master Avatar" class="avatar">
            <div class="status-dot online"></div>
          </div>
        </div>

        <div class="profile-info">
          <div class="greeting">
            <span class="time-greeting">下午好</span>
            <span class="wave-emoji">👋</span>
          </div>
          <h1 class="master-name">李师傅</h1>
          <div class="master-details">
            <span class="worker-id">
              <i class="fas fa-id-badge"></i>
              工号: 89757
            </span>
            <span class="work-status">
              <i class="fas fa-circle status-online"></i>
              在线服务中
            </span>
          </div>
        </div>

        <div class="quick-stats">
          <div class="stat-item">
            <div class="stat-number">12</div>
            <div class="stat-label">今日完成</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">4.9</div>
            <div class="stat-label">服务评分</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 工单状态导航 -->
    <div class="tabs-container">
      <div class="tabs-header">
        <h2 class="section-title">工单管理</h2>
        <div class="refresh-btn" @click="onRefresh" :class="{ 'refreshing': refreshing }">
          <i class="fas fa-sync-alt"></i>
        </div>
      </div>

      <van-tabs v-model="activeTab" sticky class="modern-tabs">
        <van-tab
          v-for="status in orderStatuses"
          :key="status.key"
          :badge="status.count > 0 ? status.count : ''"
        >
          <template #title>
            <div class="tab-content">
              <i :class="getTabIcon(status.key)"></i>
              <span>{{ status.title }}</span>
            </div>
          </template>

          <div class="tab-panel">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pull-refresh">
              <div v-if="getOrdersByStatus(status.key).length > 0" class="orders-list">
                <div v-for="order in getOrdersByStatus(status.key)" :key="order.id" class="order-item">
                  <!-- 左侧状态指示器 -->
                  <div class="status-indicator" :class="order.status"></div>

                  <!-- 主要内容 -->
                  <div class="order-content">
                    <!-- 头部信息 -->
                    <div class="order-header">
                      <div class="order-info">
                        <span class="customer-name">{{ order.customerName }}</span>
                        <span class="order-id">{{ order.id }}</span>
                      </div>
                      <div class="service-type" :class="order.tagType">
                        {{ order.serviceType }}
                      </div>
                    </div>

                    <!-- 详细信息 -->
                    <div class="order-meta">
                      <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>{{ order.address }}</span>
                      </div>
                      <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>{{ order.appointmentTime }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- 右侧操作区 -->
                  <div class="order-actions">
                    <template v-if="order.status === 'pending'">
                      <button class="action-btn primary" @click="openAcceptPopup(order)" :disabled="order.loading">
                        <i class="fas fa-hand-paper" v-if="!order.loading"></i>
                        <i class="fas fa-spinner fa-spin" v-else></i>
                      </button>
                    </template>

                    <template v-if="order.status === 'processing'">
                      <button class="action-btn secondary" @click="openTransferPopup(order)" :disabled="order.loading">
                        <i class="fas fa-share-alt"></i>
                      </button>
                      <button class="action-btn success" @click="handleOrderAction(order, 'start')" :disabled="order.loading">
                        <i class="fas fa-play"></i>
                      </button>
                    </template>

                    <template v-if="order.status === 'in_progress'">
                      <button class="action-btn warning" @click="openCompletePopup(order)" :disabled="order.loading">
                        <i class="fas fa-flag-checkered" v-if="!order.loading"></i>
                        <i class="fas fa-spinner fa-spin" v-else></i>
                      </button>
                    </template>

                    <template v-if="order.status === 'reviewing' || order.status === 'closed'">
                      <button class="action-btn info" @click="handleOrderAction(order, 'view')">
                        <i class="fas fa-eye"></i>
                      </button>
                    </template>
                  </div>
                </div>
              </div>
              <div v-else class="empty-state-modern">
                <div class="empty-illustration">
                  <i :class="getEmptyIcon(status.key)"></i>
                </div>
                <h3 class="empty-title">暂无{{ status.title }}工单</h3>
                <p class="empty-description">{{ getEmptyDescription(status.key) }}</p>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 现代化弹窗设计 -->
    <!-- 接单弹窗 -->
    <van-popup v-model="showAcceptPopup" round position="bottom" class="modern-popup">
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-handle"></div>
          <h3 class="popup-title">
            <i class="fas fa-calendar-check"></i>
            预约上门时间
          </h3>
        </div>
        <div class="popup-body">
          <div class="datetime-section">
            <van-datetime-picker
              v-model="appointmentTime"
              type="datetime"
              :min-date="minDate"
              class="modern-picker"
            />
          </div>
        </div>
        <div class="popup-footer">
          <button class="modern-btn secondary-btn" @click="showAcceptPopup = false">
            取消
          </button>
          <button class="modern-btn primary-btn" @click="confirmAcceptOrder">
            <i class="fas fa-check"></i>
            确认接单
          </button>
        </div>
      </div>
    </van-popup>

    <!-- 转派弹窗 -->
    <van-popup v-model="showTransferPopup" round position="bottom" class="modern-popup">
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-handle"></div>
          <h3 class="popup-title">
            <i class="fas fa-user-friends"></i>
            选择转派师傅
          </h3>
        </div>
        <div class="popup-body">
          <div class="workers-list">
            <div
              v-for="worker in otherWorkers"
              :key="worker.id"
              class="worker-item"
              :class="{ 'selected': selectedWorker === worker.id }"
              @click="selectedWorker = worker.id"
            >
              <div class="worker-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="worker-info">
                <h4 class="worker-name">{{ worker.name }}</h4>
                <p class="worker-id">工号: {{ worker.id }}</p>
              </div>
              <div class="selection-indicator">
                <i class="fas fa-check"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="popup-footer">
          <button class="modern-btn secondary-btn" @click="showTransferPopup = false">
            取消
          </button>
          <button class="modern-btn primary-btn" @click="confirmTransfer">
            <i class="fas fa-share-alt"></i>
            确认转派
          </button>
        </div>
      </div>
    </van-popup>

    <!-- 完工报告弹窗 -->
    <van-popup v-model="showCompletePopup" round position="bottom" class="modern-popup large">
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-handle"></div>
          <h3 class="popup-title">
            <i class="fas fa-clipboard-check"></i>
            提交完工报告
          </h3>
        </div>
        <div class="popup-body scrollable">
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-camera"></i>
              施工凭证照片
            </label>
            <div class="upload-section">
              <van-uploader
                v-model="completionForm.images"
                multiple
                :max-count="5"
                class="modern-uploader"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-qrcode"></i>
              收款二维码
            </label>
            <div class="upload-section">
              <van-uploader
                v-model="completionForm.qrCode"
                :max-count="1"
                class="modern-uploader"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-edit"></i>
              完工备注
            </label>
            <div class="textarea-container">
              <van-field
                v-model="completionForm.notes"
                rows="3"
                autosize
                type="textarea"
                placeholder="请输入施工备注信息..."
                class="modern-textarea"
              />
            </div>
          </div>
        </div>
        <div class="popup-footer">
          <button class="modern-btn secondary-btn" @click="showCompletePopup = false">
            取消
          </button>
          <button class="modern-btn success-btn" @click="confirmCompleteOrder">
            <i class="fas fa-paper-plane"></i>
            提交审核
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { Toast } from 'vant';

const activeTab = ref(0);
const allOrders = reactive([
  { id: 'WZ001', customerName: '张先生', address: '南山区科技园xx小区A栋', appointmentTime: '待预约', serviceType: '新装', status: 'pending', tagType: 'primary', loading: false },
  { id: 'WX002', customerName: '李女士', address: '福田区xx大厦B座', appointmentTime: '待预约', serviceType: '维修', status: 'pending', tagType: 'warning', loading: false },
  { id: 'WZ003', customerName: '王先生', address: '罗湖区xx花园', appointmentTime: '今天 16:00', serviceType: '新装', status: 'processing', tagType: 'primary', loading: false },
  { id: 'WZ004', customerName: '赵小姐', address: '宝安区xx中心', appointmentTime: '昨天 11:00', serviceType: '新装', status: 'in_progress', tagType: 'primary', loading: false },
  { id: 'WX005', customerName: '周先生', address: '龙岗区xx城', appointmentTime: '3天前', serviceType: '维修', status: 'reviewing', tagType: 'warning', loading: false },
  { id: 'WZ006', customerName: '孙女士', address: '南山区xx湾', appointmentTime: '上周', serviceType: '新装', status: 'closed', tagType: 'primary', loading: false },
]);
const otherWorkers = ref([{name: '王师傅', id: '89758'}, {name: '赵师傅', id: '89759'}]);
const showAcceptPopup = ref(false);
const showTransferPopup = ref(false);
const showCompletePopup = ref(false);
const currentOrder = ref(null);
const appointmentTime = ref(new Date());
const minDate = new Date();
const selectedWorker = ref(null);
const completionForm = reactive({ images: [], qrCode: [], notes: '' });
const refreshing = ref(false);

const getOrdersByStatus = (status) => allOrders.filter(order => order.status === status);
const orderStatuses = computed(() => [
  { key: 'pending', title: '待接单', count: getOrdersByStatus('pending').length },
  { key: 'processing', title: '待处理', count: getOrdersByStatus('processing').length },
  { key: 'in_progress', title: '施工中', count: getOrdersByStatus('in_progress').length },
  { key: 'reviewing', title: '审核中', count: getOrdersByStatus('reviewing').length },
  { key: 'closed', title: '已结单', count: getOrdersByStatus('closed').length },
]);
const confirmAcceptOrder = async () => {
  if (!appointmentTime.value) {
    Toast('请选择预约时间');
    return;
  }

  const index = allOrders.findIndex(o => o.id === currentOrder.value.id);
  if (index !== -1) {
    // 添加加载状态
    allOrders[index].loading = true;

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1000));

    allOrders[index].status = 'processing';
    allOrders[index].appointmentTime = appointmentTime.value.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-');
    allOrders[index].loading = false;

    Toast.success('✅ 接单成功！已安排预约时间');
  }
  showAcceptPopup.value = false;
};

const confirmTransfer = async () => {
  if (!selectedWorker.value) {
    Toast('⚠️ 请选择一位师傅');
    return;
  }

  const index = allOrders.findIndex(o => o.id === currentOrder.value.id);
  if (index !== -1) {
    // 添加加载状态
    allOrders[index].loading = true;

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 800));

    const workerName = otherWorkers.value.find(w => w.id === selectedWorker.value)?.name;
    allOrders.splice(index, 1);
    Toast.success(`✅ 工单已成功转派给${workerName}！`);
  }
  showTransferPopup.value = false;
  selectedWorker.value = null;
};

const confirmCompleteOrder = async () => {
  if (completionForm.qrCode.length === 0) {
    Toast('⚠️ 请上传您的收款二维码');
    return;
  }

  if (completionForm.images.length === 0) {
    Toast('⚠️ 请上传施工凭证照片');
    return;
  }

  const index = allOrders.findIndex(o => o.id === currentOrder.value.id);
  if (index !== -1) {
    // 添加加载状态
    allOrders[index].loading = true;

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1200));

    allOrders[index].status = 'reviewing';
    allOrders[index].loading = false;
    Toast.success('✅ 完工报告已提交审核，请等待客户确认');
  }
  showCompletePopup.value = false;
  // 重置表单
  completionForm.images = [];
  completionForm.qrCode = [];
  completionForm.notes = '';
};

const handleOrderAction = async (order, action) => {
  if (action === 'start') {
    const index = allOrders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      allOrders[index].loading = true;

      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 600));

      allOrders[index].status = 'in_progress';
      allOrders[index].loading = false;
      Toast.success(`🚀 工单 ${order.id} 开始施工`);
    }
  } else {
    Toast(`👁️ 查看工单 ${order.id} 详情`);
  }
};
const openPopup = (popupRef, order) => { currentOrder.value = order; popupRef.value = true; };
const openAcceptPopup = (order) => openPopup(showAcceptPopup, order);
const openTransferPopup = (order) => openPopup(showTransferPopup, order);
const openCompletePopup = (order) => {
    completionForm.images = []; completionForm.qrCode = []; completionForm.notes = '';
    openPopup(showCompletePopup, order);
};

// 下拉刷新
const onRefresh = async () => {
  refreshing.value = true;

  // 模拟刷新数据
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 这里可以添加实际的数据刷新逻辑
  Toast.success('🔄 数据已刷新');
  refreshing.value = false;
};



// 获取标签页图标
const getTabIcon = (status) => {
  const iconMap = {
    'pending': 'fas fa-inbox',
    'processing': 'fas fa-tasks',
    'in_progress': 'fas fa-hammer',
    'reviewing': 'fas fa-clipboard-check',
    'closed': 'fas fa-check-double'
  };
  return iconMap[status] || 'fas fa-list';
};

// 获取空状态图标
const getEmptyIcon = (status) => {
  const iconMap = {
    'pending': 'fas fa-inbox',
    'processing': 'fas fa-clipboard-list',
    'in_progress': 'fas fa-hard-hat',
    'reviewing': 'fas fa-search',
    'closed': 'fas fa-trophy'
  };
  return iconMap[status] || 'fas fa-folder-open';
};

// 获取空状态描述
const getEmptyDescription = (status) => {
  const descMap = {
    'pending': '暂时没有新的工单需要处理',
    'processing': '当前没有待处理的工单',
    'in_progress': '没有正在施工的工单',
    'reviewing': '没有等待审核的工单',
    'closed': '还没有已完成的工单'
  };
  return descMap[status] || '暂无相关工单';
};
</script>

<style scoped>
/* === 全局样式重置 === */
.master-home-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 添加装饰性背景元素 */
.master-home-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* === 顶部个人信息卡片 === */
.header-section {
  position: relative;
  padding: 24px 16px 32px;
  background: transparent;
  z-index: 2;
}

.profile-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-ring {
  position: relative;
  padding: 3px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;
}

.status-dot {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid white;
}

.status-dot.online {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.profile-info {
  text-align: center;
  margin-bottom: 24px;
}

.greeting {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.time-greeting {
  font-size: 16px;
  color: #64748b;
  font-weight: 500;
}

.wave-emoji {
  font-size: 18px;
}

.master-name {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 16px 0;
}

.master-details {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.worker-id, .work-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.worker-id i {
  color: #3b82f6;
}

.status-online {
  color: #10b981;
  font-size: 8px;
}

.quick-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(148, 163, 184, 0.2);
}

/* === 标签页容器 === */
.tabs-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  margin: 0 16px;
  border-radius: 20px 20px 0 0;
  position: relative;
  z-index: 5;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: none;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f1f5f9;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.refresh-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.refresh-btn:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.refresh-btn.refreshing {
  background: #3b82f6;
  color: white;
}

.refresh-btn.refreshing i {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* === 现代化标签页 === */
.modern-tabs {
  --van-tabs-line-height: 72px;
  --van-tab-font-size: 12px;
}

:deep(.van-tabs__wrap) {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 72px;
  padding: 8px 0;
}

:deep(.van-tabs__nav) {
  padding: 12px 8px 8px 8px;
  min-height: 64px;
  display: flex;
  align-items: center;
}

:deep(.van-tabs__content) {
  overflow-x: auto;
  margin-top: 0;
}

:deep(.van-tabs__track) {
  background: #f8fafc;
}

:deep(.van-tab) {
  padding: 12px 12px;
  color: #64748b;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 65px;
  min-height: 64px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.van-tab--active) {
  color: #3b82f6;
  font-weight: 600;
}

:deep(.van-tabs__line) {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  height: 3px;
  border-radius: 2px;
  width: 30px !important;
}

:deep(.van-badge) {
  background: #ef4444;
  color: white;
  font-size: 11px;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 9px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 50px;
  height: 100%;
  padding: 4px 0;
}

.tab-content i {
  font-size: 16px;
  margin-bottom: 2px;
}

.tab-content span {
  font-size: 11px;
  white-space: nowrap;
  line-height: 1;
}

.tab-panel {
  background: transparent;
}

.pull-refresh {
  min-height: 200px;
}

:deep(.van-pull-refresh__track) {
  background: transparent;
}

/* === 工单列表布局 === */
.orders-list {
  padding: 8px 16px;
}

.order-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.order-item:hover {
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.95);
}

.status-indicator {
  width: 4px;
  height: 40px;
  border-radius: 2px;
  margin-right: 12px;
  flex-shrink: 0;
}

.status-indicator.pending { background: #f59e0b; }
.status-indicator.processing { background: #3b82f6; }
.status-indicator.in_progress { background: #10b981; }
.status-indicator.reviewing { background: #8b5cf6; }
.status-indicator.closed { background: #6b7280; }

.order-content {
  flex: 1;
  min-width: 0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.order-id {
  font-size: 12px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
}

.service-type {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.service-type.primary { background: #dbeafe; color: #1d4ed8; }
.service-type.warning { background: #fef3c7; color: #d97706; }
.service-type.success { background: #d1fae5; color: #059669; }

.order-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
}

.meta-item i {
  width: 12px;
  font-size: 10px;
}

.order-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn.secondary {
  background: #f1f5f9;
  color: #64748b;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #e2e8f0;
}

.action-btn.success {
  background: #10b981;
  color: white;
}

.action-btn.success:hover:not(:disabled) {
  background: #059669;
}

.action-btn.warning {
  background: #f59e0b;
  color: white;
}

.action-btn.warning:hover:not(:disabled) {
  background: #d97706;
}

.action-btn.info {
  background: #8b5cf6;
  color: white;
}

.action-btn.info:hover:not(:disabled) {
  background: #7c3aed;
}





.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

.detail-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
  min-width: 0;
}

.detail-label {
  display: block;
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  display: block;
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
  line-height: 1.4;
}

/* === 操作按钮区域 === */
.action-section {
  padding: 20px;
  border-top: 1px solid #f1f5f9;
  background: #fafbfc;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.modern-btn {
  position: relative;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modern-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.modern-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.modern-btn:not(:disabled):active {
  transform: translateY(0);
}

.full-width {
  width: 100%;
}

/* === 按钮变体样式 === */
.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.primary-btn:not(:disabled):hover {
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.1);
  color: #475569;
  border: 1px solid #e2e8f0;
}

.secondary-btn:not(:disabled):hover {
  background: rgba(148, 163, 184, 0.2);
  border-color: #cbd5e1;
}

.success-btn {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.success-btn:not(:disabled):hover {
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
}

.warning-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
}

.warning-btn:not(:disabled):hover {
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.6);
}

.info-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.info-btn:not(:disabled):hover {
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
}

/* === 按钮内容和动画 === */
.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent);
  transition: left 0.5s;
}

.modern-btn:not(:disabled):hover .btn-shine {
  left: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #64748b;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.info-row:hover {
  background: #e2e8f0;
}

.info-row i {
  width: 20px;
  text-align: center;
  margin-right: 12px;
  color: #3b82f6;
  font-size: 16px;
}

/* === 现代化空状态 === */
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  margin: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.empty-illustration {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
}

.empty-illustration::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  z-index: -1;
  opacity: 0.1;
}

.empty-illustration i {
  font-size: 48px;
  color: #94a3b8;
  opacity: 0.6;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

/* === 现代化弹窗样式 === */
:deep(.van-popup.modern-popup) {
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
}

:deep(.van-popup.modern-popup.large) {
  max-height: 85vh;
}

.popup-container {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
}

.popup-handle {
  width: 40px;
  height: 4px;
  background: #d1d5db;
  border-radius: 2px;
  margin: 12px auto 0;
}

.popup-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
}

.popup-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.popup-title i {
  color: #667eea;
  font-size: 18px;
}

.popup-body {
  padding: 24px;
}

.popup-body.scrollable {
  max-height: 50vh;
  overflow-y: auto;
}

.popup-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  border-top: 1px solid #f1f5f9;
  background: #fafbfc;
}

.popup-footer .modern-btn {
  flex: 1;
}

/* === 时间选择器样式 === */
.datetime-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.modern-picker {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.van-datetime-picker) {
  background: white;
}

/* === 师傅选择列表 === */
.workers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.worker-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.worker-item:hover {
  background: #e2e8f0;
}

.worker-item.selected {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.worker-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.worker-info {
  flex: 1;
}

.worker-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.worker-id {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.selection-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.worker-item.selected .selection-indicator {
  opacity: 1;
  transform: scale(1);
}

/* === 表单组样式 === */
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.form-label i {
  color: #667eea;
  font-size: 14px;
}

.upload-section, .textarea-container {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.modern-uploader {
  background: transparent;
}

:deep(.van-uploader__wrapper) {
  background: white;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
  transition: all 0.3s ease;
}

:deep(.van-uploader__wrapper:hover) {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.modern-textarea {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

:deep(.van-field__control) {
  font-size: 14px;
  line-height: 1.5;
}

:deep(.van-field:focus-within) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>