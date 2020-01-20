import { serialOnIdle } from './index'

const install = Vue => {
  Object.defineProperty(Vue.prototype, '$onIdle', {
    value: serialOnIdle
  })
}

export { install }
export default { install }
