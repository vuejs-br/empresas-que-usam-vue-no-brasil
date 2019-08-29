<template>
  <v-card row wrap class="company" :class="{'has-anchor': anchor !== ''}">
    <v-flex class="primary--text anchor" :id="anchor" v-if="anchor">
      #{{ anchor }}
    </v-flex>
    <v-card-title class="mb-3">
      <v-flex>
        {{ item.name }}
      </v-flex>
      <v-flex shrink>
        <v-btn color="primary" text class="text-capitalize mr-0">
          há vagas!
          <v-icon right>
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </v-flex>
    </v-card-title>
    <v-card-text>
      <v-chip v-for="(tech, index) in item.tech" :key="index" class="mr-2 mb-2">
        {{ tech }}
      </v-chip>
      <v-layout row wrap class="pt-0">
        <v-flex shrink v-if="item.remote" class="primary--text pr-2">
          Remoto
        </v-flex>
        <v-flex shrink v-for="(address, index) in item.address" :key="index" class="pr-2">
          {{ address.city }} / {{ address.state}}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
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
.company {
  margin-top: 30px;
}
.anchor {
  position: absolute;
  margin-top: -40px;
}
.has-anchor {
  margin-top: 70px;
}
</style>
