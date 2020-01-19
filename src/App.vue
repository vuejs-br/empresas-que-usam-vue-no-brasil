<template>
  <div id="app">
    <AppHero />

    <div class="container">
      <div class="columns">
        <div class="column">
          <AppTagFilter v-model="tagsSelecteds" :tags="meta.tags" />
        </div>
        <main class="column is-three-quarters">
          <LetterRow
          v-for="group in groups"
          :key="group.letter"
          v-bind="group"/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy } from 'lodash-es'
import { loadCompanies, filterCompanies } from './lib/companies'
import AppTagFilter from './components/AppTagFilter'
import AppHero from './components/AppHero'
import LetterRow from './components/LetterRow'

export default {
  name: 'app',
  components: { LetterRow, AppHero, AppTagFilter },
  data: () => ({
    tagsSelecteds: [],
    companies: [],
    meta: {}
  }),
  computed: {
    groups () {
      const tags = this.tagsSelecteds
      const companies = orderBy(this.companies, 'name')
      const groups = groupBy(companies, 'letter')

      return Object.entries(groups)
        .map(([letter, companies]) => {
          return {
            letter,
            companies: filterCompanies({ tags }, companies)
          }
        })
    }
  },
  async mounted () {
    const { meta, companies } = await loadCompanies()

    this.meta = Object.freeze(meta)
    this.companies = Object.freeze(companies)
  }
}
</script>

<style lang="scss">

</style>
