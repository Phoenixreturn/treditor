<template>
  <v-btn-toggle mandatory>
    <v-btn class="buttons1" @click="onClick('rectangle')">
      <v-icon>mdi-format-align-left</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('circle')">
      <v-icon>mdi-format-align-center</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('textLabel')">
      <v-icon>mdi-format-align-right</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('polyLine')">
      <v-icon>mdi-format-align-justify</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick('path')">
      <CadIcon></CadIcon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import CadIcon from '../icons/CadIcon'

export default {
  name: "TopPanel",
  components: {
    CadIcon
  },
  methods: {
    onClick(e) {
      this.$emit("create", e)
    }
  }
}
</script>
