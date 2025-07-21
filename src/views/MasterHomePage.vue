<template>
  <div class="master-home-page">
    <!-- 1. 顶部个人信息卡片 -->
    <div class="header-section">
      <div class="header-background">
        <div class="bg-pattern"></div>
        <div class="bg-gradient"></div>
      </div>

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
              <div v-if="getOrdersByStatus(status.key).length > 0" class="orders-grid">
                <div v-for="order in getOrdersByStatus(status.key)" :key="order.id" class="modern-order-card">
                  <!-- 工单状态标签 -->
                  <div class="order-status-badge" :class="order.status">
                    <i :class="getStatusIcon(order.status)"></i>
                    <span>{{ getStatusText(order.status) }}</span>
                  </div>

                  <!-- 服务类型标签 -->
                  <div class="service-type-tag" :class="order.tagType">
                    <i :class="getServiceIcon(order.serviceType)"></i>
                    <span>{{ order.serviceType }}</span>
                  </div>

                  <!-- 客户信息 -->
                  <div class="customer-section">
                    <div class="customer-avatar">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="customer-info">
                      <h3 class="customer-name">{{ order.customerName }}</h3>
                      <p class="order-id">订单号: {{ order.id }}</p>
                    </div>
                  </div>

                  <!-- 地址和时间信息 -->
                  <div class="order-details">
                    <div class="detail-item">
                      <div class="detail-icon">
                        <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="detail-content">
                        <span class="detail-label">服务地址</span>
                        <span class="detail-value">{{ order.address }}</span>
                      </div>
                    </div>

                    <div class="detail-item">
                      <div class="detail-icon">
                        <i class="fas fa-clock"></i>
                      </div>
                      <div class="detail-content">
                        <span class="detail-label">预约时间</span>
                        <span class="detail-value">{{ order.appointmentTime }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 操作按钮区域 -->
                  <div class="action-section">
                    <template v-if="order.status === 'pending'">
                      <button
                        class="modern-btn primary-btn full-width"
                        @click="openAcceptPopup(order)"
                        :disabled="order.loading"
                      >
                        <div class="btn-content">
                          <i class="fas fa-hand-paper" v-if="!order.loading"></i>
                          <i class="fas fa-spinner fa-spin" v-else></i>
                          <span>{{ order.loading ? '处理中...' : '接受工单' }}</span>
                        </div>
                        <div class="btn-shine"></div>
                      </button>
                    </template>

                    <template v-if="order.status === 'processing'">
                      <div class="btn-group">
                        <button
                          class="modern-btn secondary-btn"
                          @click="openTransferPopup(order)"
                          :disabled="order.loading"
                        >
                          <i class="fas fa-share-alt"></i>
                          <span>转派</span>
                        </button>
                        <button
                          class="modern-btn success-btn"
                          @click="handleOrderAction(order, 'start')"
                          :disabled="order.loading"
                        >
                          <i class="fas fa-play"></i>
                          <span>开始</span>
                        </button>
                      </div>
                    </template>

                    <template v-if="order.status === 'in_progress'">
                      <button
                        class="modern-btn warning-btn full-width"
                        @click="openCompletePopup(order)"
                        :disabled="order.loading"
                      >
                        <div class="btn-content">
                          <i class="fas fa-flag-checkered" v-if="!order.loading"></i>
                          <i class="fas fa-spinner fa-spin" v-else></i>
                          <span>{{ order.loading ? '提交中...' : '完成施工' }}</span>
                        </div>
                        <div class="btn-shine"></div>
                      </button>
                    </template>

                    <template v-if="order.status === 'reviewing' || order.status === 'closed'">
                      <button
                        class="modern-btn info-btn full-width"
                        @click="handleOrderAction(order, 'view')"
                      >
                        <div class="btn-content">
                          <i class="fas fa-eye"></i>
                          <span>查看详情</span>
                        </div>
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

// 获取状态图标
const getStatusIcon = (status) => {
  const iconMap = {
    'pending': 'fas fa-hourglass-half',
    'processing': 'fas fa-cogs',
    'in_progress': 'fas fa-tools',
    'reviewing': 'fas fa-search-plus',
    'closed': 'fas fa-check-circle'
  };
  return iconMap[status] || 'fas fa-question-circle';
};

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    'pending': '待接单',
    'processing': '待处理',
    'in_progress': '施工中',
    'reviewing': '审核中',
    'closed': '已完成'
  };
  return textMap[status] || '未知状态';
};

// 获取服务图标
const getServiceIcon = (serviceType) => {
  const iconMap = {
    '新装': 'fas fa-plus-circle',
    '维修': 'fas fa-wrench',
    '升级': 'fas fa-arrow-up',
    '移机': 'fas fa-exchange-alt'
  };
  return iconMap[serviceType] || 'fas fa-cog';
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
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* === 顶部个人信息卡片 === */
.header-section {
  position: relative;
  padding: 20px 16px 40px;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%);
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

.profile-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 24px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-ring {
  position: relative;
  padding: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
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
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
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
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

.master-name {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  background: white;
  margin: -20px 16px 0;
  border-radius: 20px 20px 0 0;
  position: relative;
  z-index: 3;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
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
  --van-tabs-line-height: 56px;
  --van-tab-font-size: 14px;
}

:deep(.van-tabs__wrap) {
  background: white;
  box-shadow: none;
  border-bottom: 1px solid #f1f5f9;
}

:deep(.van-tab) {
  padding: 0 16px;
  color: #64748b;
  font-weight: 500;
  transition: all 0.3s ease;
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
  align-items: center;
  gap: 6px;
}

.tab-content i {
  font-size: 14px;
}

.tab-panel {
  background: #f8fafc;
  min-height: 60vh;
}

.pull-refresh {
  min-height: 60vh;
}

:deep(.van-pull-refresh__track) {
  background: #f8fafc;
}

/* === 工单网格布局 === */
.orders-grid {
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* === 现代化工单卡片 === */
.modern-order-card {
  background: white;
  border-radius: 20px;
  padding: 0;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.modern-order-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

.modern-order-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%);
  z-index: 1;
}

/* === 工单状态标签 === */
.order-status-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.order-status-badge.pending {
  background: rgba(251, 191, 36, 0.9);
  color: #92400e;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.order-status-badge.processing {
  background: rgba(59, 130, 246, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.order-status-badge.in_progress {
  background: rgba(16, 185, 129, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.order-status-badge.reviewing {
  background: rgba(139, 92, 246, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.order-status-badge.closed {
  background: rgba(107, 114, 128, 0.9);
  color: white;
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

/* === 服务类型标签 === */
.service-type-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  z-index: 2;
}

.service-type-tag.primary {
  background: rgba(59, 130, 246, 0.1);
  color: #1d4ed8;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.service-type-tag.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* === 客户信息区域 === */
.customer-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 60px 20px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}

.customer-info {
  flex: 1;
  min-width: 0;
}

.customer-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.order-id {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* === 工单详情区域 === */
.order-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  padding: 60px 20px;
  text-align: center;
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
  background: white;
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