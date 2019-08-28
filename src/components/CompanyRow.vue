<template>
  <v-layout row wrap>
    <v-flex class="primary--text" :id="anchor" v-if="anchor">
      #{{ anchor }}
    </v-flex>
    <v-flex xs12>
      <v-icon v-if="item.remote">mdi-star</v-icon>
      {{ item.name }}
    </v-flex>
    <v-flex xs12 v-for="(address, index) in item.address" :key="index">
      {{ address.city }} / {{ address.state}}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    anchor: {
      type: String
    }
  }
}
</script>

<style>

</style>
