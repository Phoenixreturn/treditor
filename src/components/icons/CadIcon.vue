<template>
  <div>
    <cadIcon class="cadIcon"></cadIcon>
    <svg width="40" height="35" viewBox="10.5 25.5 16 16">
      <use xlink:href="#document-open-recent" />
    </svg>
  </div>
</template>

<script>
import cadIcon from "../../assets/cad_icons.svg"

export default {
  name: "CadIcon",
  components: {
    cadIcon
  }
}
</script>

<style scoped>
.cadIcon {
  height: 0;
  width: 0;
  position:absolute;
}
</style>