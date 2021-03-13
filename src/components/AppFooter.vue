<script>
export default {
  name: 'AppFooter',
  version: process.env.VUE_APP_VERSION
}
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Feito pelos membros do <a href="https://t.me/vuejsbrasil" target="_blank">Vue.js Brasil</a>.<br>
        Conheça as nossas <a href="https://github.com/vuejs-br/comunidades" target="_blank">comunidades</a>.
      </p>
      <p class="has-text-info is-size-7">
        {{ $options.version }}
      </p>
    </div>
  </footer>
</template>
