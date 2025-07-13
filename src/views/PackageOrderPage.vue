<template>
  <div class="package-center-page">
    <!-- 1. 顶部导航栏 -->
    <van-nav-bar
      title="套餐中心"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
      class="nav-bar"
    />

    <div class="main-content">
      <!-- 2. 套餐类型切换 (手动实现) -->
      <div class="tab-container">
        <div class="tab-list">
          <button 
            @click="activeTab = 'annual'" 
            :class="['tab-button', { 'active': activeTab === 'annual' }]">
            年付特惠
          </button>
          <button 
            @click="activeTab = 'monthly'" 
            :class="['tab-button', { 'active': activeTab === 'monthly' }]">
            灵活月付
          </button>
        </div>
      </div>

      <!-- 3. 套餐列表 -->
      <div v-if="activeTab === 'annual'" class="package-list">
        <div
          v-for="pkg in annualPackages"
          :key="pkg.id"
          class="package-card"
          :class="{ 'selected': selectedPackageId === pkg.id }"
          @click="selectedPackageId = pkg.id"
        >
          <!-- 官方推荐 Tag -->
          <div v-if="pkg.recommended" class="recommend-tag">官方推荐</div>

          <div class="card-header">
            <div class="package-info">
              <h3 class="package-name">{{ pkg.name }}</h3>
              <p class="package-desc">{{ pkg.description }}</p>
            </div>
            <div class="package-price">
              <span class="price-currency">¥</span><span class="price-value">{{ pkg.price }}</span>
              <span class="price-period">/ {{ pkg.period }}</span>
            </div>
          </div>

          <div class="card-body">
            <ul class="feature-list">
              <li v-for="feature in pkg.features" :key="feature.text">
                <van-icon :name="feature.icon" class="feature-icon" />
                <span v-html="feature.text"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div v-if="activeTab === 'monthly'" class="package-list">
         <p class="empty-state">暂无灵活月付套餐</p>
      </div>

      <!-- 4. 订购须知 -->
      <div class="terms-section">
        <van-collapse v-model="activeCollapse" :border="false">
          <van-collapse-item name="1" class="terms-collapse-item">
            <template #title><div class="terms-title">订购须知</div></template>
            <div class="terms-content">
                <p>* 所订购年付套餐，协议期为一年，中途取消不支持退款。</p>
                <p>* 月付套餐协议期为一个月，到期可续，可随时取消。</p>
                <p>* 具体网络速率可能受线路、设备及网络环境影响。</p>
                <p>* 最终解释权归中国移动所有。</p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>

    <!-- 5. 底部提交栏 -->
    <div class="bottom-bar-placeholder"></div>
    <footer class="submit-footer">
      <div class="footer-content">
        <div class="selection-info">
          <p class="selection-text">{{ selectionText }}</p>
        </div>
        <van-button 
          round 
          type="primary" 
          class="submit-button"
          :disabled="!selectedPackageId"
          @click="onSubmit">
          立即订购
        </van-button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { showToast } from 'vant';

// 返回上一页
const onClickLeft = () => history.back();

// 当前激活的 Tab: 'annual' 或 'monthly'
const activeTab = ref('annual');

// 当前展开的折叠面板
const activeCollapse = ref([]);

// 套餐数据
const annualPackages = ref([
  {
    id: 'annual-1000',
    name: '千兆旗舰套餐',
    description: '适合游戏直播、VR体验、多设备连接',
    price: 1800,
    period: '年',
    recommended: true,
    features: [
      { icon: 'chart-trending-o', text: '速率: <strong>1000Mbps</strong>' },
      { icon: 'cluster-o', text: '包含设备: WiFi-6光猫路由器一体机' },
      { icon: 'setting-o', text: '安装服务: 免收安装调试费' },
    ],
  },
  {
    id: 'annual-500',
    name: '500M畅享套餐',
    description: '满足高清影音、家庭办公需求',
    price: 1200,
    period: '年',
    recommended: false,
    features: [
      { icon: 'chart-trending-o', text: '速率: <strong>500Mbps</strong>' },
      { icon: 'cluster-o', text: '包含设备: 千兆光猫' },
      { icon: 'setting-o', text: '安装服务: 免收安装调试费' },
    ],
  },
  {
    id: 'annual-300',
    name: '300M优选套餐',
    description: '适合日常上网、在线网课',
    price: 998,
    period: '年',
    recommended: false,
    features: [
      { icon: 'chart-trending-o', text: '速率: <strong>300Mbps</strong>' },
      { icon: 'cluster-o', text: '包含设备: 千兆光猫' },
    ],
  },
]);

// 选中的套餐ID
const selectedPackageId = ref(null);

// 计算选中的套餐详情
const selectedPackageDetails = computed(() => {
  if (!selectedPackageId.value) return null;
  return annualPackages.value.find(p => p.id === selectedPackageId.value);
});

// 计算底部栏左侧文本
const selectionText = computed(() => {
  if (!selectedPackageDetails.value) return '请选择一个套餐';
  // 根据截图，底部栏不显示已选套餐名
  // return `已选: ${selectedPackageDetails.value.name}`;
  return '请选择一个套餐';
});

// 提交事件
const onSubmit = () => {
  if (!selectedPackageDetails.value) return;
  showToast(`成功订购 ${selectedPackageDetails.value.name}`);
};

</script>

<style scoped>
/* --- 全局 --- */
.package-center-page {
  background-color: #f7f8fa;
  min-height: 100vh;
}
.main-content {
  padding: 16px;
}
.nav-bar {
  --van-nav-bar-background: #f7f8fa;
  --van-nav-bar-title-font-size: 17px;
}

/* --- Tab 切换 --- */
.tab-container {
  padding: 4px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.tab-list {
  display: flex;
  justify-content: space-around;
}
.tab-button {
  flex: 1;
  padding: 10px 0;
  font-size: 15px;
  color: #64748b;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  font-weight: 500;
}
.tab-button.active {
  color: #1d63ff;
  font-weight: 600;
}
.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background-color: #1d63ff;
  border-radius: 2px;
}

/* --- 套餐卡片 --- */
.package-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.package-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid white;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
}
.package-card.selected {
  border-color: #1d63ff;
}

.recommend-tag {
  position: absolute;
  top: 0;
  right: 18px;
  background-color: #d92626;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 0 0 8px 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.package-name {
  font-size: 19px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 6px 0;
}
.package-desc {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.package-price {
  text-align: right;
  flex-shrink: 0;
  margin-left: 12px;
  color: #1d63ff;
}
.price-currency {
  font-size: 16px;
  font-weight: 600;
  margin-right: -2px;
}
.price-value {
  font-size: 24px;
  font-weight: 800;
}
.price-period {
  font-size: 13px;
  color: #6b7280;
}

.card-body {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #e5e7eb;
}
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.feature-list li {
  display: flex;
  align-items: center;
}
.feature-icon {
  color: #22c55e;
  margin-right: 8px;
  font-size: 16px;
}
.feature-list li :deep(strong) {
  font-weight: 600;
  color: #1f2937;
}

/* --- 订购须知 --- */
.terms-section {
  margin-top: 16px;
}
.terms-collapse-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}
.terms-title {
  font-weight: 500;
  font-size: 15px;
}
:deep(.van-cell) {
  padding: 14px 16px;
}
.terms-content {
  padding: 12px 16px;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
}
.terms-content p {
  margin: 0 0 4px 0;
}
.terms-content p:last-child {
  margin-bottom: 0;
}

/* --- 底部操作栏 --- */
.bottom-bar-placeholder {
  height: 80px; /* 与footer高度一致 */
}
.submit-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
  height: 80px;
}
.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 100%;
}
.selection-text {
  font-size: 14px;
  color: #6b7280;
}
.submit-button {
  width: 120px;
  height: 44px;
  font-size: 16px;
}
.submit-button.van-button--disabled {
  background-color: #a7b7d2;
  border-color: #a7b7d2;
  color: white;
  opacity: 0.8;
}

/* --- 空状态 --- */
.empty-state {
  text-align: center;
  color: #969799;
  padding: 40px 0;
}
</style>