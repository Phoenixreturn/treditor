<template>
  <div
    draggable="true"
    :style="{ position: 'relative' }"
    @mouseup="mouseupSplit"
    @dragstart="dragCallback"
  >
    <div
      class="dynamic-divider"
      :style="{ left: keyColumnWidth }"
      @mousedown="mousedownSplit"
      @mouseup="mouseupSplit"
    />
    <div class="properties-editor-header">
      <div :style="{ width: keyColumnWidth }">
        <i class="fa fa-camera-retro" />Key
      </div>
      <div :style="{ width: valueColumnWidth }">
        <i class="fa fa-check-square" />Value
      </div>
    </div>
    <div class="properties-editor-body">
      <div
        class="properties-editor-body-row"
        v-for="entry in flattenedValues.entries()"
        :key="entry[0]"
      >
        <div :style="{ width: keyColumnWidth }">{{ entry[0] }}</div>
        <div :style="{ width: valueColumnWidth }"><CellView :val="entry" /></div>
      </div>
    </div>
    <!-- <table>
      <thead>
        <tr class="hover:vue-ads-bg-blue-500">
          <th><i class="fa fa-camera-retro"></i>Key</th>
          <th><i class="fa fa-check-square"></i>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:vue-ads-bg-blue-500"
          v-for="entry in flattenedValues.entries()"
          :key="entry[0]"
        >
          <td>{{ entry[0] }}</td>
          <td><CellView :val="entry"></CellView></td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import CellView from "./CellView.vue";
import flatten from "./flatten.js";

export default {
  name: "Editor",
  components: {
    CellView,
  },
  computed: {
    keyColumnWidth: function () {
      return this.intWidth + "%";
    },
    valueColumnWidth: function() {
      let temp = (100 - this.intWidth) + "%";
      return temp;
    }
  },
  data: function () {
    return {
      intWidth: 50,
      startOffsetX: 0,
      resizing: false,
    };
  },
  mixins: [flatten],
  methods: {
    dragCallback: function (event) {
      if (this.resizing) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    mousedownSplit: function (event) {
      this.resizing = true;
      this.startOffsetX = event.offsetX;
      this.$el.addEventListener("mousemove", this.processingSplit);
    },
    mouseupSplit: function () {
      if (this.resizing) {
        this.resizing = false;
        this.$el.removeEventListener("mousemove", this.processingSplit);
      }
    },
    processingSplit: function (event) {
      let parWidth = this.$el.getBoundingClientRect().width;
      let parPageX = this.$el.getBoundingClientRect().left;
      this.intWidth = ((event.pageX - parPageX) * 100) / parWidth;
    },
  },
  props: {
    obj: {
      type: Object,
      default: function () {
        return {
          one: "first",
          two: { three: "Something new in these day", expanded: true },
          test: { yy: "ttt", xx: "robert" },
          fourc: true,
          svsf: 454,
        };
      },
    },
  },
  created: function () {
    console.log("Created MyEditor.");
  },
};
</script>

<style scoped src="./styles.css">
</style>
