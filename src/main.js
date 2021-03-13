import Vue from 'vue'
import useIdle from './lib/on-idle/plugin'
import { onIdle } from './lib/on-idle'
import { logVersion } from './lib/version'
import './registerServiceWorker'

const Root = () => import(/* webpackChunkName: "root" */ './Root.vue')

Vue.use(useIdle)

Vue.config.productionTip = process.env !== 'production'

onIdle(() => {
  new Vue({
    created () {
      document
        .body.classList.remove('starting')
    },
    mounted () {
      logVersion(process.env.VUE_APP_VERSION)
    },
    render: h => h(Root)
  }).$mount('#app')
})
