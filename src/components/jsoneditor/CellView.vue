<template>
  <div>
    <span v-if="typeof val[1][val[0]] === 'string'">
      <click-to-edit-string :value="val"></click-to-edit-string
    ></span>
    <span v-else-if="typeof val[1][val[0]] === 'number'">
      <click-to-edit-number :value="val"></click-to-edit-number>
    </span>
    <span v-else-if="typeof val[1][val[0]] === 'object'">
      <children-button
        v-on:click.native="setExpanded"
        :expanded="expandedSign"
        :loading="false"
      >
      </children-button>
    </span>
    <span v-else></span>
  </div>
</template>

<script>
import ClickToEditString from './ClickToEditString.vue';
import ClickToEditNumber from './ClickToEditNumber.vue';
import ChildrenButton from './ChildrenButton.vue';

import Vue from 'vue';

export default {
  name: 'CellView',
  components: {
    ClickToEditString,
    ClickToEditNumber,
    ChildrenButton,
  },
  props: ['val'],
  methods: {
    setExpanded() {
      Vue.set(this.val, 'expanded', !this.expandedSign);
    },
  },
  computed: {
    expandedSign() {
      if (Object.prototype.hasOwnProperty.call(this.val, 'expanded')) {
        return this.val['expanded'];
      } else {
        return false;
      }
    },
  },
};
</script>
