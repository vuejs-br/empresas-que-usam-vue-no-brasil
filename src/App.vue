<template>
  <div id="app">
    <!-- <AppHeader /> -->

    <AppHero />

    <div class="container">
      <LetterRow
        v-for="group in groups"
        :key="group.letter"
        v-bind="group"/>
    </div>
  </div>
</template>

<script>
import { groupBy, orderBy } from 'lodash-es'
import { loadCompanies } from './lib/companies'
// import AppHeader from './components/AppHeader'
import AppHero from './components/AppHero'
import LetterRow from './components/LetterRow'

export default {
  name: 'app',
  components: { LetterRow, AppHero },
  data: () => ({
    companies: [],
    meta: {}
  }),
  computed: {
    groups () {
      const companies = orderBy(this.companies, 'name')
      const groups = groupBy(companies, 'letter')

      return Object.entries(groups)
        .map(([letter, companies]) => {
          return {
            letter,
            companies: Object.freeze(companies)
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
