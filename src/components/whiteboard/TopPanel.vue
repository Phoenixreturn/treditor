<template>
  <v-btn-toggle mandatory>
    <v-btn class="buttons1" @click="onClick('rectangle')">
      <v-icon>$vuetify.icons.rectangle</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('circle')">
      <v-icon>$vuetify.icons.circle</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('textLabel')">
      <v-icon>$vuetify.icons.label</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('polyLine')">
      <v-icon>$vuetify.icons.line</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "TopPanel",
  methods: {
    onClick(e) {
      this.$emit("create", e)
    }
  }
}
</script>
