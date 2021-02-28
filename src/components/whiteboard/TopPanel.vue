<template>
  <v-btn-toggle>
    <v-btn class="buttons1" @click="onClick(primitives.RECTANGLE, $event)">
      <v-icon>$vuetify.icons.rectangle</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick(primitives.CIRCLE, $event)">
      <v-icon>$vuetify.icons.circle</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick(primitives.TEXTLABEL, $event)">
      <v-icon>$vuetify.icons.label</v-icon>
    </v-btn>
    <v-btn class="buttons1" @click="onClick(primitives.POLYLINE, $event)">
      <v-icon>$vuetify.icons.line</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import primitives from '../whiteboard/primitives/primitive.type.js';
import operations from '../../store/operation.types.js';

export default {
  name: 'TopPanel',
  methods: {
    onClick(primitiveType) {
      if (this.$store.state.event.primitive != primitiveType) {
        this.$store.state.event.primitive = primitiveType;
        this.$store.state.event.type = operations.INIT;
      }
      switch (this.$store.state.event.type) {
        case operations.INIT:
          this.$store.state.event.type = operations.CREATE;
          break;
        case operations.CREATE:
          this.$store.state.event.type = operations.INIT;
          break;
        default:
          break;
      }
    },
  },
  computed: {
    primitives: function () {
      return primitives;
    },
  },
};
</script>
