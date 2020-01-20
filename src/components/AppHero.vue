<script>
export default {
  name: 'AppHero'
}
</script>
<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container is-fullhd">
        <h1 class="title">
          Empresas que usam Vue.js no Brasil
        </h1>
        <p class="subtitle">
          Esta lista é uma iniciativa pública que tem o intuito de divulgar o nome de empresas que usam Vue.js de alguma forma. <br>
          <span class="is-hidden-mobile">
            Os dados das empresas são de inteira responsabilidade do usuário que criar o PR e não somos capazes de avaliar o quanto e onde cada empresa usa. <br>
            A lista possui os dados básicos das empresas para que desenvolvedores e contratantes possam ter conhecimento sobre as stacks de cada um e motivar interações entre ambas as partes.
          </span>
        </p>

        <div class="buttons">
          <a target="_blank"
            class="button is-dark is-large"
            href="https://github.com/vuejs-br/empresas-que-usam-vue-no-brasil/pulls">
            Envie seu PR
          </a>

          <a target="_blank"
            class="button is-link is-light is-large is-hidden-mobile"
            href="https://github.com/vuejs-br/vagas">
            Vagas
          </a>

          <a target="_blank"
            class="button is-link is-light is-large"
            href="https://t.me/vuejsbrasil">
            Telegram
          </a>

          <a target="_blank"
            class="button is-link is-light is-large is-hidden-mobile"
            href="https://github.com/vuejs-br/forum">
            Forum
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
