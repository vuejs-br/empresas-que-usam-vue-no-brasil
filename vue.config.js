module.exports = {
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
