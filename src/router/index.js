import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginPage.vue'
import RoleSelection from '../views/RoleSelectionPage.vue'

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
