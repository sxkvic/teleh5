const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关键配置：使用相对路径加载资源
  publicPath: './'  // 表示资源路径相对于 index.html 所在目录
})