<template>
  <v-layout>
    <v-flex xs12>
      {{ item.name }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style>

</style>
