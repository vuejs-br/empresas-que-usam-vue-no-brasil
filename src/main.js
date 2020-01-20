import './assets/scss/main.scss'

import Vue from 'vue'
import Root from './Root.vue'
import useIdle from './lib/on-idle/plugin'
import { onIdle } from './lib/on-idle'

import './registerServiceWorker'

Vue.use(useIdle)

Vue.config.productionTip = process.env !== 'production'

onIdle(() => {
  new Vue({
    created () {
      document
        .body.classList.remove('starting')
    },
    render: h => h(Root)
  }).$mount('#app')
})
