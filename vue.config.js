const { resolve, join } = require('path')
const HtmlCriticalPlugin = require('html-critical-webpack-plugin')

process.env.VUE_APP_VERSION = require('./package.json').version

const isProd = (process.env.NODE_ENV === 'production')

const plugins = []

if (isProd) {
  plugins.push(
    new HtmlCriticalPlugin({
      base: join(resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      timeout: 30000,
      penthouse: {
        blockJSRequests: false
      }
    })
  )
}

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
