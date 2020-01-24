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
        return this.value
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
  <label :for="id" class="app-checkbox">
    <input
      :id="id"
      class="app-checkbox-input"
      type="checkbox"
      v-model="computedValue"
      :checked="computedValue"
    />

    <span class="app-checkbox-check" />
    <span class="app-checkbox-label">{{ label }}</span>
  </label>
</template>

<style lang="scss">
@import "../assets/scss/variables.scss";

/* inspired by Buefy checkbox style */
.app-checkbox {
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 15px;
  line-height: 1.25;
  cursor: pointer;
}

.app-checkbox-input {
  position: absolute;
  left: 0;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.app-checkbox-check {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  border-radius: 4px;
  border: 2px solid #7a7a7a;
  transition: background .15s ease-out;
  background: transparent;
}

.app-checkbox-input:checked + .app-checkbox-check {
  background: #35495e url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E") no-repeat 50%;
  border-color: #35495e;
}

.app-checkbox-label {
  margin-left: 5px;
}

@media screen and (max-width: $tablet) {
  .app-checkbox {
    margin: 0;
  }
}
</style>
