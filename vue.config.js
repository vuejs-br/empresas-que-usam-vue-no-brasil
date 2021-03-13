const HtmlWebpackInlineSourcePlugin = require('webpack-inline-modern-source-plugin')

const pkg = require('./package.json')

process.env.VUE_APP_VERSION = `v${pkg.version}@${Date.now().toString('36')}`

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
    assetsVersion: pkg.version,
    workboxOptions: {
      cacheId: `${pkg.name}@${pkg.version}`,
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      exclude: /(_redirects|_headers|cover.png|robots.txt|icons\/apple)/
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
