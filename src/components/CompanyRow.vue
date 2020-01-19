<script>
import slugify from 'slugify'
import { toLower } from 'lodash-es'
import ExternalIcon from './ExternalIcon'

export default {
  name: 'CompanyRow',
  components: { ExternalIcon },
  props: {
    company: Object
  },
  computed: {
    slug () {
      return slugify(toLower(this.company.name))
    },
    id () {
      return `company-${this.slug}`
    }
  }
}
</script>

<template>
  <div v-bind="{ id }" class="company-row">
    <h3 class="title is-4">
      <a :href="'#' + id" class="has-text-light">#</a>
      <a :href="company.url" target="_blank">
        {{ company.name }} <ExternalIcon />
      </a>
    </h3>

    <div class="tags are-medium">
      <div
        class="tag is-dark"
        v-for="location in company.location"
        :key="slug + '-' + location">
        {{ location }}
      </div>
    </div>

    <div class="tags">
      <div
        class="tag is-link is-light"
        v-for="tag in company.tags"
        :key="slug + '-' + tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>
