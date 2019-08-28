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
      <v-layout>
        <v-flex>
        </v-flex>
        <v-flex>
          <v-autocomplete
            label="Cidade"
            :items="cityList"
            v-model="city"
            no-data-text="Nenhuma cidade encontrada"
          ></v-autocomplete>
        </v-flex>
        <v-flex shrink>
          <v-select
            v-model="state"
            :items="stateList"
            label="Estado"
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
          </v-select>
        </v-flex>
        <v-flex shrink>
          <v-checkbox
          v-model="remote"
          label="Remoto"
        ></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex grow>
          <v-text-field
            v-model="companyName"
            label="Nome da empresa"
            prepend-icon="mdi-search"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <CompanyRow :item="company" v-for="(company, index) in companies" :key="index"/>
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
      city: []
    }
  },
  methods: {
    async loadCompanies () {
      this.loading = true
      this.companies = await this.getCompanies()
      this.loading = false
      console.log(this.companies)
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
    flatAdrress () {
      return this.companies.filter(elem => elem.address !== undefined).reduce((acc, elem) => acc.concat(elem.address), [])
    },
    cityList () {
      return [...new Set(this.flatAdrress.map(elem => elem.city))].sort(this.sortAlphabetical)
    },
    stateList () {
      return [...new Set(this.flatAdrress.map(elem => elem.state))].sort(this.sortAlphabetical)
    }
  },
  mounted () {
    this.loadCompanies()
  }
}
</script>
