<template>
  <v-footer app>
    <SvgSprite class="sprite"></SvgSprite>
  </v-footer>
</template>

<script>
import SvgSprite from '../assets/sprite.svg';

export default {
  name: 'Footer',
  components: {
    SvgSprite,
  },
};
</script>

<style scoped>
.sprite {
  height: 0;
  width: 0;
  position: absolute;
}
</style>
