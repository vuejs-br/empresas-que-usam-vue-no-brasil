<template>
  <div id="app">
    <AppHero />

    <div class="container">
      <div class="columns">
        <div class="column">
          <AppTagFilter
            v-model="filters.tags"
            :tags="meta.tags" />
        </div>
        <main class="column is-three-quarters">
          <div class="columns">
            <div class="column">
              <AppFilter
                label="Nome da empresa"
                placeholder="Encontre uma empresa por nome"
                v-model="filters.name" />
            </div>
            <div class="column">
              <AppFilter
                label="Localização da empresa"
                placeholder="Encontre uma empresa local"
                v-model="filters.location" />
            </div>
          </div>
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
import { groupBy, orderBy, isEmpty, negate } from 'lodash-es'
import { loadCompanies, filterCompanies } from './lib/companies'
import AppTagFilter from './components/AppTagFilter'
import AppFilter from './components/AppFilter'
import AppHero from './components/AppHero'
import LetterRow from './components/LetterRow'

export default {
  name: 'app',
  components: { LetterRow, AppHero, AppTagFilter, AppFilter },
  data: () => ({
    tagsSelecteds: [],
    filters: {
      tags: [],
      name: '',
      location: ''
    },
    companies: [],
    meta: {}
  }),
  computed: {
    hasFilter () {
      return Object.values(this.filters)
        .some(negate(isEmpty))
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
      const companies = orderBy(this.companies, 'name')
      const groups = groupBy(companies, 'letter')

      return Object.entries(groups)
        .map(([letter, companies]) => {
          const records = filterCompanies(this.filters, companies)
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
