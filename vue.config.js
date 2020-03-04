const path = require('path')
const assetsDir = 'assets'
module.exports = {
  devServer: {
    port: 80,
    disableHostCheck: true
  },
  configureWebpack: {
    externals: {
      // BMap: 'BMap'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : process.env.NODE_ENV === 'alpha' ? '/' : '/',
  assetsDir: assetsDir,
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : process.env.NODE_ENV === 'alpha' ? 'test' : 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/var.less')]
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            // selectorBlackList: ['van-'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  }
}
