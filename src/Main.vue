<script>
import pMap from 'p-map'
import { groupBy, orderBy, isEmpty, negate, debounce } from 'lodash-es'
import { loadCompanies, filterCompanies } from './lib/companies'
import { paramsToFilters } from './lib/utils'
import AppTagFilter from './components/AppTagFilter'
import LoadingBar from './components/LoadingBar'
import AppFilter from './components/AppFilter'
import LetterRow from './components/LetterRow'
import AppCheckbox from './components/AppCheckbox'

export default {
  name: 'AppMain',
  components: { LetterRow, AppTagFilter, AppFilter, LoadingBar, AppCheckbox },
  data: () => ({
    loading: true,
    tagsSelecteds: Object.freeze([]),
    groups: Object.freeze([]),
    companies: Object.freeze([]),
    meta: {},
    filters: {
      tags: Object.freeze([]),
      name: '',
      location: '',
      remote: false
    }
  }),
  computed: {
    hasFilter () {
      if (this.filters.remote) {
        return true
      }

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

      window.history.pushState({}, '', `/?${new URLSearchParams(this.filters)}`)

      await this.$onIdle()
      const groups = await pMap(groupsBase, async group => {
        await this.$onIdle()
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
    },
    onFilterRemote () {
      window.scrollTo(0, 0)
      this.filters.remote = true
    }
  },
  async mounted () {
    this.$onFilter = debounce(() => {
      this.applyFilter()
    }, 900)

    await this.$onIdle() // each promise in idle frame
      .then(() => loadCompanies())
      .then(({ meta, companies }) => {
        this.meta = Object.freeze(meta)
        this.companies = Object.freeze(companies)
      })
      .then(() => this.applyFilter())
      .then(() => {
        this.$stopFilterWatch = this.$watch(() => {
          return { ...this.filters }
        }, () => {
          this.loading = true
          this.$onFilter()
        })
      })

    paramsToFilters.bind(this)()
  },
  beforeDestroy () {
    this.$stopFilterWatch()
  }
}
</script>

<template>
  <div class="container is-fullhd">
    <div class="columns">
      <div class="column is-hidden-mobile">
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
              label="Localização"
              placeholder="Encontre uma empresa local"
              v-model="filters.location" />
          </div>
          <div class="column is-2 checkbox-column">
            <AppCheckbox
              id="remote"
              label="Remoto?"
              v-model="filters.remote"
            />
          </div>
        </div>
        <div>
          <LoadingBar v-if="loading" />
          <LetterRow
            v-for="group in groups"
            :key="group.letter"
            v-bind="group"
            @filter-remote="onFilterRemote"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.checkbox-column {
  display: flex;
  align-items: center;
}
</style>
