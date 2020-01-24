<script>
export default {
  name: 'AppCheckbox',
  props: {
    value: Boolean,
    label: String,
    id: [String, Number]
  },
  computed: {
    computedValue: {
      get () {
        return this.newValue
      },
      set (value) {
        this.newValue = value
        this.$emit('input', value)
      }
    }
  }
}
</script>

<template>
  <div class="app-checkbox">
    <label class="app-checkbox-label" :for="id"> {{ label }} </label>

    <input
      :id="id"
      class="app-checkbox-input"
      type="checkbox"
      v-model="computedValue"
    />
  </div>
</template>

<style>

</style>
