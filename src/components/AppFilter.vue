<script>
import slug from 'slug'

export default {
  name: 'AppFilter',
  props: {
    value: String,
    label: String,
    placeholder: String
  },
  computed: {
    id () {
      return slug(this.label)
    }
  }
}
</script>

<template>
  <div class="app-filter">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :value="value"
      :placeholder="placeholder"
      :id="id"
      @input="e => $emit('input', e.target.value)"
      class="input"
      type="search">
  </div>
</template>

<style lang="scss" scoped>
.app-filter {
  margin-top: 5px;
  margin-bottom: 10px;
  label {
    color: #7a7a7a;
    font-size: 0.75em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}
</style>
