module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,          // 设计稿宽度
      viewportHeight: 667,         // 设计稿高度 (可选)
      unitPrecision: 3,            // 转换后的精度，即小数点位数
      viewportUnit: 'vw',          // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类
      minPixelValue: 1,            // 小于或等于1px不转换为视窗单位
      mediaQuery: false,           // 允许在媒体查询中转换px
      exclude: [/node_modules/],   // 排除某些文件夹的文件或特定文件
      landscape: false,            // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw',         // 横屏时使用的单位
      landscapeWidth: 568          // 横屏时使用的视口宽度
    }
  }
}