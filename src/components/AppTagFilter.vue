<script>
import { orderBy, filter, isEmpty } from 'lodash-es'
import { sanitize } from '../lib/utils'

export default {
  name: 'AppTagFilter',
  data: () => ({
    selecteds: [],
    name: ''
  }),
  props: {
    value: Array,
    tags: Object
  },
  computed: {
    tagListBase () {
      const tags = Object.entries(this.tags || {})
        .map(([name, count]) => ({ name, count }))

      return orderBy(tags, ['count'], ['desc'])
    },
    tagList () {
      const { tagListBase, name } = this

      if (isEmpty(tagListBase)) {
        return Object.freeze(tagListBase)
      }

      const result = filter(
        tagListBase,
        tag => {
          return sanitize(tag.name).indexOf(sanitize(name)) >= 0
        }
      )

      return Object.freeze(result)
    }
  },
  watch: {
    selecteds (val) {
      this.$emit('input', Object.freeze([...val]))
    }
  },
  methods: {
    select (tag) {
      const old = this.selecteds.find(tagName => tagName === tag.name)

      if (old) {
        this.remove(old)
        return
      }

      this.selecteds.push(tag.name)
    },
    remove (tag) {
      this.selecteds.splice(
        this.selecteds.indexOf(tag),
        1
      )
    }
  }
}
</script>

<template>
  <aside class="menu">
    <p class="menu-label">
      Tags
    </p>
    <ul class="menu-list">
      <li class="tags-selecteds" v-for="tag in selecteds" :key="'s-tag-' + tag">
        <div class="tags has-addons">
          <a @click="remove(tag)" class="tag is-delete"></a>
          <span class="tag is-danger">{{ tag }}</span>
        </div>
      </li>
      <li class="filter-wrapper">
        <input
          v-model="name"
          placeholder="filtrar tags"
          class="input is-small"
          type="search">
      </li>
      <li @click="select(tag)" v-for="tag in tagList" :key="tag.name">
        <a>
          <div class="tags has-addons">
            <span class="tag is-info">{{ tag.count }}</span>
            <span class="tag is-dark">{{ tag.name }}</span>
          </div>
        </a>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
  .tags-selecteds {
    margin-bottom: 10px;
    .tags {
      float: left;
      margin-bottom: 2px;
      margin-right: 2px;
    }
  }
  .filter-wrapper, .tags-selecteds {
    padding-left: 5px;
  }
</style>
