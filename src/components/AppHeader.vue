<script>
export default {
  name: 'AppHeader',
  data: () => ({
    show: false
  }),
  methods: {
    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="../assets/logo.png">
        </a>

        <a @click="toggle" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': show }">
        <div class="navbar-start">
          <div class="navbar-item">
            <input class="input is-primary" type="search" placeholder="Find a company">
          </div>
        </div>

        <div class="navbar-end">
          <!-- navbar items -->
          ----
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-start {
  min-width: 80%;
  .navbar-item {
    width: 100%;
  }
}
</style>
