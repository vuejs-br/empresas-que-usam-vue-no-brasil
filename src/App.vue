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
          v-for="group in groupsVisibles"
          :key="group.letter"
          v-bind="group"/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy, isEmpty } from 'lodash-es'
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
    hasFilter () {
      return !isEmpty(this.tagsSelecteds)
    },
    groupsVisibles () {
      const { groups } = this
      if (!this.hasFilter) {
        return Object.freeze(groups)
      }

      return Object.freeze(
        orderBy(groups, ['count'], ['desc'])
      )
    },
    groups () {
      const tags = this.tagsSelecteds
      const companies = orderBy(this.companies, 'name')
      const groups = groupBy(companies, 'letter')

      return Object.entries(groups)
        .map(([letter, companies]) => {
          const records = filterCompanies({ tags }, companies)
          return {
            letter,
            count: records.length,
            companies: records
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
