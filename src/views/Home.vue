<template>
  <v-fade-transition>
    <v-container fill-height v-if="loading">
      <v-layout align-center>
        <v-flex class="text-center">
          <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else grid-list-xl>
      <v-layout align-center>
        <v-flex grow>
          <v-text-field
            solo
            hide-details
            v-model="companyName"
            label="Nome da empresa"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-flex>
        <v-flex shrink>
          <v-badge :value="badge !== 0" overlap>
            <template v-slot:badge>{{ badge }}</template>
            <v-btn color="primary" icon text @click="filter = !filter">
              <v-icon>
                mdi-tune-vertical
              </v-icon>
            </v-btn>
          </v-badge>
        </v-flex>
      </v-layout>
      <v-expand-transition>
        <v-layout align-center row wrap v-if="filter">
          <v-flex>
            <v-autocomplete
              solo
              hide-details
              v-model="city"
              :items="cityList"
              chips
              color="blue-grey lighten-2"
              label="Cidades"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="grey--text caption"
                >(+{{ city.length - 2 }} outras)</span>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-autocomplete
              solo
              hide-details
              v-model="state"
              :items="stateList"
              chips
              color="blue-grey lighten-2"
              label="Estados"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="grey--text caption"
                >(+{{ state.length - 2 }} outros)</span>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex>
            <v-autocomplete
              solo
              hide-details
              v-model="tech"
              :items="techList"
              chips
              color="blue-grey lighten-2"
              label="Tecnologias"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="grey--text caption"
                >(+{{ tech.length - 2 }} outras)</span>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex shrink>
            <v-checkbox
            hide-details
            class="mt-0"
            v-model="remote"
            :disabled="remoteDisabled"
            label="Somente remoto"
          ></v-checkbox>
          </v-flex>
          <v-flex shrink >
            <v-btn text color="primary" @click="clear" :disabled="badge === 0" class="text-capitalize">
              limpar
            </v-btn>
          </v-flex>
        </v-layout>
      </v-expand-transition>
      <v-layout>
        <v-flex class="capition grey--text" v-if="filteredCompanies.length !== 0">
          {{ filteredCompanies.lenght }} {{ badge > 1 || companyName !== '' ? 'Empresas cadastradas' : 'Empresas filtradas' }}
        </v-flex>
      </v-layout>
      <CompanyRow :item="company" v-for="(company, index) in filteredCompanies" :key="index" :anchor="calculateAnchor(index)"/>
      <v-layout v-if="filteredCompanies.length === 0">
        <v-flex class="text-center grey--text">
          Nenhuma empresa encontrada
        </v-flex>
      </v-layout>
    </v-container>
  </v-fade-transition>
</template>

<script>
import CompanyRow from '@/components/CompanyRow'
export default {
  components: {
    CompanyRow
  },
  data () {
    return {
      loading: true,
      companies: [],
      remote: false,
      companyName: '',
      state: [],
      city: [],
      tech: [],
      filter: false
    }
  },
  methods: {
    clear () {
      this.state = []
      this.city = []
      this.tech = []
      this.companyName = ''
    },
    calculateAnchor (index) {
      if (index === 0) {
        return this.filteredCompanies[index].name[0]
      } else if (this.filteredCompanies[index - 1].name[0] !== this.filteredCompanies[index].name[0]) {
        return this.filteredCompanies[index].name[0]
      } else {
        return ''
      }
    },
    async loadCompanies () {
      this.loading = true
      this.companies = await this.getCompanies()
      this.loading = false
    },
    async getCompanies () {
      let md = await this.getMdfile()
      let companies = []
      let open = false
      md.split('\n').forEach(line => {
        if (line[0] === '[') {
          companies.push({
            name: line.split(']')[0].split('[')[1],
            url: line.split('(')[1].split(')')[0]
          })
          open = true
          return
        }
        if (companies.length > 0) {
          if (companies[companies.length - 1].name === 'DB1 Global Software') {
            console.log(line)
          }
        }
        if (open) {
          companies[companies.length - 1].tech = []
          line.split(',').forEach(elem => {
            companies[companies.length - 1].tech.push(elem.trim())
          })
          open = false
          return
        }
        if (line[0] === '_') {
          const places = line.replace('| Remoto', '').replace('Remoto', '')
          if (line.includes('Remoto')) {
            companies[companies.length - 1].remote = true
          } else {
            companies[companies.length - 1].remote = false
          }
          if (places.length === 2) {
            return
          }
          const manyPlaces = places.split('|')
          const pushAddress = (location) => {
            if (companies[companies.length - 1].address === undefined) {
              companies[companies.length - 1].address = []
            }
            try {
              const city = location.split('/')[0].replace('_', '').trim()
              const state = location.split('/')[1].replace('_', '').trim()
              companies[companies.length - 1].address.push({
                city,
                state
              })
            } catch (err) {
              console.log(err, line, companies[companies.length - 1].name)
            }
          }
          manyPlaces.forEach(location => {
            pushAddress(location)
          })
        }
      })
      return companies
    },
    getMdfile () {
      return new Promise(async (resolve, reject) => {
        const result = await fetch('https://raw.githubusercontent.com/Renato66/empresas-que-usam-vue-no-brasil/master/README.md').then(result => result.blob())
        // const result = await fetch('https://raw.githubusercontent.com/vuejs-br/empresas-que-usam-vue-no-brasil/master/README.md').then(result => result.blob())
        const reader = new FileReader()

        // This fires after the blob has been read/loaded.
        reader.addEventListener('loadend', (e) => {
          const text = e.srcElement.result
          resolve(text)
        })

        // Start reading the blob as text.
        reader.readAsText(result)
      })
    },
    sortAlphabetical (first, last) {
      return first !== last ? first < last ? -1 : 1 : 0
    }
  },
  computed: {
    badge () {
      const filter = [...this.state, ...this.city, ...this.tech]
      if (this.remote) {
        filter.push('')
      }
      return filter.length
    },
    filteredCompanies () {
      const nameRegex = new RegExp(this.companyName, 'i')
      const hasAddress = [...this.state, ...this.city].length > 0
      return this.badge === 0 && this.companyName === '' ? this.companies : this.companies.filter(company => {
        let isFilter = this.remote ? company.remote === this.remote : false
        if (this.companyName !== '') {
          if (company.name.search(nameRegex) === -1) {
            return false
          }
        }
        if (company.address === undefined && hasAddress) {
          return false
        }
        this.tech.forEach(tech => {
          if (company.tech.find(elem => elem === tech)) {
            isFilter = true
          }
        })
        this.state.forEach(state => {
          company.address.forEach(elem => {
            if (elem.state === state) {
              isFilter = true
            }
          })
        })
        this.city.forEach(city => {
          company.address.forEach(elem => {
            if (elem.city === city) {
              isFilter = true
            }
          })
        })
        return isFilter
      })
    },
    flatAdrress () {
      return this.companies.filter(elem => elem.address !== undefined).reduce((acc, elem) => acc.concat(elem.address), [])
    },
    cityList () {
      return [...new Set(this.flatAdrress.map(elem => elem.city))].sort(this.sortAlphabetical)
    },
    stateList () {
      return [...new Set(this.flatAdrress.map(elem => elem.state))].sort(this.sortAlphabetical)
    },
    techList () {
      return [...this.companies.reduce((acc, elem) => acc.concat(elem.tech), [])]
    },
    remoteDisabled () {
      return this.companies.filter(elem => elem.remote === true).length === 0
    }
  },
  mounted () {
    this.loadCompanies()
  }
}
</script>
