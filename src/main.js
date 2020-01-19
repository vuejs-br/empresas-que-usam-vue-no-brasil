import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import './assets/scss/main.scss'

Vue.config.productionTip = process.env !== 'production'

new Vue({
  render: h => h(App)
}).$mount('#app')
