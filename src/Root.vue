<template>
  <div id="app">
    <AppHero />

    <AppMain />
    <hr>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter'
import AppHero from './components/AppHero'

const AppMain = () => import(/* webpackChunkName: "app-main" */'./Main')

export default {
  name: 'app',
  components: { AppFooter, AppMain, AppHero }
}
</script>

<style lang="scss">

@media (max-width: 1407px) {
  #app > .container {
    max-width: none;
    padding-left: 22px;
    padding-right: 22px;
    width: 100%;
  }
}
</style>
