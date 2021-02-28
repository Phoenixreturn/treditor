<template>
  <div class="cell-view">
    <component
      v-bind="currentEditCellComponent.attr"
      v-on="currentEditCellComponent.events"
      v-bind:is="currentEditCellComponent.type"
      @click.native="setExpanded(currentEditCellComponent.type)"
    />
  </div>
</template>

<script>
import ClickToEditString from "./ClickToEditString.vue";
import ClickToEditNumber from "./ClickToEditNumber.vue";
import ChildrenButton from "./ChildrenButton.vue";
import Vue from "vue";
export default {
  name: "CellView",
  components: {
    ClickToEditString,
    ClickToEditNumber,
    ChildrenButton,
  },
  props: ["val"],
  methods: {
    setExpanded(type) {
      if (type == "ChildrenButton") {
        Vue.set(this.val, "expanded", !this.expandedSign);
      }
    },
  },
  computed: {
    expandedSign() {
      if (Object.prototype.hasOwnProperty.call(this.val, "expanded")) {
        return this.val["expanded"];
      } else {
        return false;
      }
    },
    currentEditCellComponent() {
      if (typeof this.val[1][this.val[0]] === "string") {
        return {
          type: "ClickToEditString",
          attr: {
            value: this.val,
          },
          events: {},
        };
      } else if (typeof this.val[1][this.val[0]] === "number") {
        return {
          type: "ClickToEditNumber",
          attr: {
            value: this.val,
          },
          events: {},
        };
      } else if (typeof this.val[1][this.val[0]] === "object") {
        return {
          type: "ChildrenButton",
          attr: {
            expanded: this.expandedSign,
            loading: false,
          },
          events: {},
        };
      } else {
        return {};
      }
    },
  },
};
</script>

<style>
.cell-view p {
  margin: 0;
  overflow: hidden;
}
.cell-view input {
  overflow: hidden;
  max-width: 100%;
}
</style>