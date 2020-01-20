import Vue from 'vue'
import Root from './Root.vue'
import useIdle from './lib/on-idle/plugin'

import './registerServiceWorker'

import './assets/scss/main.scss'

Vue.use(useIdle)

Vue.config.productionTip = process.env !== 'production'

new Vue({
  created () {
    document
      .body.classList.remove('starting')
  },
  render: h => h(Root)
}).$mount('#app')
