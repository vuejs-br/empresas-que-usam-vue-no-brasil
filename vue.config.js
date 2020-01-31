const HtmlWebpackInlineSourcePlugin = require('webpack-inline-modern-source-plugin')

process.env.VUE_APP_VERSION = require('./package.json').version

const isProd = (process.env.NODE_ENV === 'production')

const plugins = isProd
  ? [new HtmlWebpackInlineSourcePlugin()]
  : []

module.exports = {
  pwa: {
    name: 'Empresas que usam Vue.js no Brasil',
    themeColor: '#40b882',
    msTileColor: '#35495e',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true
    }
  },
  chainWebpack (config) {
    config
      .plugin('html')
      .tap(args => {
        args[0].inlineSource = '(/css/root.*.css)$'

        return args
      })
  },
  configureWebpack: {
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          'lodash-es': {
            priority: 6,
            test: /\/lodash-es/,
            name: 'lodash-es',
            chunks: 'all'
          }
        }
      }
    }
  }
}
