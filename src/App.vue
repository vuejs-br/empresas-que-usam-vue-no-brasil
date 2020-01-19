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
          <div>
            <LoadingBar v-if="loading" />
            <LetterRow
              v-for="group in groups"
              :key="group.letter"
              v-bind="group"/>
          </div>
        </main>
      </div>
    </div>
    <hr>
    <AppFooter />
  </div>
</template>

<script>
import { groupBy, orderBy, isEmpty, negate, debounce } from 'lodash-es'
import { loadCompanies, filterCompanies } from './lib/companies'
import AppFooter from './components/AppFooter'
import AppTagFilter from './components/AppTagFilter'
import LoadingBar from './components/LoadingBar'
import AppFilter from './components/AppFilter'
import AppHero from './components/AppHero'
import LetterRow from './components/LetterRow'
import pMap from 'p-map'

export default {
  name: 'app',
  components: { AppFooter, LetterRow, AppHero, AppTagFilter, AppFilter, LoadingBar },
  data: () => ({
    loading: true,
    tagsSelecteds: Object.freeze([]),
    groups: Object.freeze([]),
    companies: Object.freeze([]),
    meta: {},
    filters: {
      tags: Object.freeze([]),
      name: '',
      location: ''
    }
  }),
  computed: {
    hasFilter () {
      return Object.values(this.filters)
        .some(negate(isEmpty))
    },
    groupsBase () {
      const companies = orderBy(this.companies, 'name')
      const groups = groupBy(companies, 'letter')

      return Object.entries(groups)
        .map(([letter, companies]) => {
          return {
            letter,
            companies,
            count: companies.length
          }
        })
    }
  },
  methods: {
    async applyFilter () {
      const { groupsBase } = this

      this.loading = true

      if (!this.hasFilter) {
        this.groups = Object.freeze(groupsBase)
        this.loading = false
        return
      }

      const groups = await pMap(groupsBase, async group => {
        const records = await filterCompanies(this.filters, group.companies)

        return Object.freeze({
          ...group,
          count: records.length,
          companies: records
        })
      })

      this.groups = Object.freeze(
        orderBy(groups, ['count'], ['desc'])
      )

      this.loading = false
    }
  },
  async mounted () {
    const { meta, companies } = await loadCompanies()

    this.meta = Object.freeze(meta)
    this.companies = Object.freeze(companies)

    this.applyFilter()

    this.$onFilter = debounce(() => {
      this.applyFilter()
    }, 900)

    this.$stopFilterWatch = this.$watch(() => {
      return { ...this.filters }
    }, () => {
      this.loading = true
      this.$onFilter()
    })
  },
  beforeDestroy () {
    this.$stopFilterWatch()
  }
}
</script>
