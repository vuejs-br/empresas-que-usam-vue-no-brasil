<script>
import CompanyRow from './CompanyRow'

export default {
  name: 'LetterRow',
  components: { CompanyRow },
  props: {
    letter: String,
    companies: Array
  },
  computed: {
    count () {
      return this.companies.length
    },
    id () {
      return `letter-${this.letter}`
    }
  },
  methods: {
    onFilterRemote () {
      this.$emit('filter-remote')
    }
  }
}
</script>

<template>
  <section v-bind="{ id }" :class="count === 0 ? 'is-gray' : 'is-primary'" class="panel">
    <h2 class="panel-heading">
      <a :href="'#' + id" class="has-text-dark">#</a> {{ letter }}

      <div class="tags has-addons">
        <span class="tag is-dark">{{ count }}</span>
        <span class="tag is-black">Empresas</span>
      </div>
    </h2>
    <CompanyRow
      class="panel-block"
      v-for="(company, index) in companies"
      :key="letter + '-' + index"
      v-bind="{ company }"
      @filter-remote="onFilterRemote"
    />
  </section>
</template>

<style lang="scss" scoped>
.panel-heading{
  .tags {
    float: right;
  }
}
.panel-block {
  display: block;
}
</style>
