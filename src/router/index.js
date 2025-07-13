import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginPage.vue'
import RoleSelection from '../views/RoleSelectionPage.vue'
import Home from '../views/HomePage.vue'
import PackageOrder from '../views/PackageOrderPage.vue'
import PreRecharge from '../views/PreRechargePage.vue'
import Complaint from '../views/ComplaintPage.vue'
import ProductQuery from '../views/ProductQueryPage.vue'
import ServiceEvaluation from '../views/ServiceEvaluationPage.vue'
import CustomerService from '../views/CustomerServicePage.vue'
import BindDeviceCode from '../views/BindDeviceCodePage.vue'
import MyBill from '../views/MyBillPage.vue'
import Invoice from '../views/InvoicePage.vue'
import BusinessCancellation from '../views/BusinessCancellationPage.vue'
import SelfRenewal from '../views/SelfRenewalPage.vue'
import BusinessApplication from '../views/BusinessApplicationPage.vue'
import ElectronicAgreement from '../views/ElectronicAgreementPage.vue'
import PaymentCollection from '../views/PaymentCollectionPage.vue'
import ChangeTransfer from '../views/ChangeTransferPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '移动宽带安装 - 登录'
    }
  },
  {
    path: '/role-selection',
    name: 'RoleSelection',
    component: RoleSelection,
    meta: {
      title: '移动宽带安装 - 选择身份'
    }
  },
  // 绑定设备码
  {
    path: '/bind-device-code',
    name: 'BindDeviceCode',
    component: BindDeviceCode,
    meta: {
      title: '移动宽带安装 - 绑定设备码'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '移动宽带安装 - 首页'
    }
  },
  // 套餐订购
  {
    path: '/package-order',
    name: 'PackageOrder',
    component: PackageOrder,
    meta: {
      title: '移动宽带安装 - 套餐订购'
    }
  },
  // 我的账单页面
  {
    path: '/my-bill',
    name: 'MyBill',
    component: MyBill,
    meta: {
      title: '移动宽带安装 - 我的账单'
    }
  },
  // 业务退订
  {
    path: '/business-cancellation',
    name: 'BusinessCancellation',
    component: BusinessCancellation,
    meta: {
      title: '移动宽带安装 - 业务退订'
    }
  },
  // 预充值
  {
    path: '/pre-recharge',
    name: 'PreRecharge',
    component: PreRecharge,
    meta: {
      title: '移动宽带安装 - 预充值'
    }
  },
  // 投诉
  {
    path: '/complaint',
    name: 'Complaint',
    component: Complaint,
    meta: {
      title: '移动宽带安装 - 投诉'
    }
  },
  // 产品查询
  {
    path: '/product-query',
    name: 'ProductQuery',
    component: ProductQuery,
    meta: {
      title: '移动宽带安装 - 产品查询'
    }
  },
  // 服务评价
  {
    path: '/service-evaluation',
    name: 'ServiceEvaluation',
    component: ServiceEvaluation,
    meta: {
      title: '移动宽带安装 - 服务评价'
    }
  },
  // 客服中心
  {
    path: '/customer-service',
    name: 'CustomerService',
    component: CustomerService,
    meta: {
      title: '移动宽带安装 - 客服中心'
    }
  },
  // 开票
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice,
    meta: {
      title: '移动宽带安装 - 开票'
    }
  },
  // 自助续费
  {
    path: '/self-renewal',
    name: 'SelfRenewal',
    component: SelfRenewal,
    meta: {
      title: '移动宽带安装 - 自助续费'
    }
  },
  // 业务申请
  {
    path: '/business-application',
    name: 'BusinessApplication',
    component: BusinessApplication,
    meta: {
      title: '移动宽带安装 - 业务申请'
    }
  },
  // 电子协议
  {
    path: '/electronic-agreement',
    name: 'ElectronicAgreement',
    component: ElectronicAgreement,
    meta: {
      title: '移动宽带安装 - 电子协议'
    }
  },
  // 代缴代扣
  {
    path: '/payment-collection',
    name: 'PaymentCollection',
    component: PaymentCollection,
    meta: {
      title: '移动宽带安装 - 代缴代扣'
    }
  },
  // 变更过户
  {
    path: '/change-transfer',
    name: 'ChangeTransfer',
    component: ChangeTransfer,
    meta: {
      title: '移动宽带安装 - 变更过户'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
