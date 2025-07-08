# 移动宽带安装 H5 应用

这是一个基于 Vue 2 + Vant UI 的移动端 H5 应用，主要用于移动宽带安装服务的用户登录。

## 项目特性

- 📱 移动端优先设计，完美适配各种屏幕尺寸
- 🎨 精美的 UI 设计，包含动画效果和交互反馈
- 🔐 完整的表单验证和用户认证流程
- 🌊 动态波浪背景动画
- 📋 支持记住密码、社交登录等功能
- 🧪 内置测试工具，确保功能稳定性

## 技术栈

- **框架**: Vue 2.6.14
- **UI 组件库**: Vant 2.13.8
- **路由**: Vue Router 3.x
- **构建工具**: Vue CLI 5.x
- **样式**: CSS3 + 响应式设计
- **包管理**: npm

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 功能说明

### 登录页面功能

1. **手机号登录**
   - 支持中国大陆手机号格式验证
   - 实时输入验证和错误提示

2. **密码输入**
   - 支持密码显示/隐藏切换
   - 最小长度验证

3. **记住密码**
   - 本地存储用户选择

4. **社交登录**
   - 微信登录（开发中）
   - 支付宝登录（开发中）

### 测试账号

- 手机号: `13800138000`
- 密码: `123456`

## 设计特色

### 视觉设计
- 渐变色背景，营造现代感
- 卡片式布局，层次分明
- 圆角设计，亲和力强
- 动态波浪效果，增加视觉趣味

### 交互设计
- 输入框聚焦动画
- 按钮点击反馈
- 加载状态提示
- 震动反馈（支持的设备）

### 移动端适配
- 使用 postcss-px-to-viewport 插件自动将 px 转换为 vw/vh
- 基于 375px 设计稿标准
- 无需编写媒体查询，自动适配各种屏幕尺寸
- 支持高分辨率屏幕显示
- 更精确的视口适配，效果更佳

## 开发说明

### 移动端适配配置
项目使用 `postcss-px-to-viewport` 插件进行移动端适配：

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,          // 设计稿宽度
      viewportHeight: 667,         // 设计稿高度
      unitPrecision: 3,            // 转换后的精度
      viewportUnit: 'vw',          // 指定需要转换成的视窗单位
      selectorBlackList: ['.ignore', '.hairlines'],  // 不转换的类
      minPixelValue: 1,            // 小于1px不转换
      mediaQuery: false,           // 允许在媒体查询中转换px
      exclude: [/node_modules/]    // 排除某些文件夹
    }
  }
}
```

**使用说明：**
- 设计稿按照 375px 宽度设计
- CSS 中直接写 px 值，会自动转换为 vw 单位
- 如果某个元素不想转换，添加 `.ignore` 类名
- vw 单位比 rem 更精确，适配效果更好

### 自定义配置
项目使用 Vue CLI 构建，可以通过 `vue.config.js` 进行自定义配置。

### 样式规范
- 使用 scoped CSS 避免样式冲突
- 采用 BEM 命名规范
- 直接使用 px 单位，postcss-px-to-viewport 会自动转换为 vw

### 代码规范
- ESLint + Vue 官方规范
- 组件名使用 PascalCase
- 方法名使用 camelCase

## 浏览器兼容性

- iOS Safari 10+
- Android Chrome 60+
- 微信内置浏览器
- 支付宝内置浏览器

## 许可证

MIT License
