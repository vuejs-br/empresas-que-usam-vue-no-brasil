<script>
import slug from 'slug'
import { toLower } from 'lodash-es'

export default {
  name: 'CompanyRow',
  props: {
    company: Object
  },
  computed: {
    slug () {
      return slug(toLower(this.company.name))
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
      {{ company.name }}
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
        class="tag is-info"
        v-for="tag in company.tags"
        :key="slug + '-' + tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>
