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
