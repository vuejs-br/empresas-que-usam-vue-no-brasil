import Vue from 'vue'
import App from './App.vue'
import useIdle from './lib/on-idle/plugin'

import './registerServiceWorker'

import './assets/scss/main.scss'

Vue.use(useIdle)

Vue.config.productionTip = process.env !== 'production'

new Vue({
  render: h => h(App)
}).$mount('#app')
