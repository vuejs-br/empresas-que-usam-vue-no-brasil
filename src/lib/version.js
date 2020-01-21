const logVersion = version => {
  const appName = 'Empresas que usam Vue.js'
  const hasSw = (navigator.serviceWorker && navigator.serviceWorker.controller)
  const mode = (window.matchMedia('(display-mode: standalone)').matches)
    ? 'standalone'
    : 'web'

  const sw = hasSw
    ? 'sw-on'
    : 'sw-off'

  // eslint-disable-next-line
  console.log(
    `%c ${appName} %c v${version} %c ${mode}/${sw} %c`,
    'background:#35495e ; padding: 3px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#40b882 ; padding: 3px; border-radius: 0 0 0 0;  color: #fff',
    `background:#${hasSw ? '21ba45' : 'db2828'} ; padding: 3px; border-radius: 0 3px 3px 0;  color: #fff`,
    'background:transparent'
  )
}

export { logVersion }
