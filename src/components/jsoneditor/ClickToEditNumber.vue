<template>
  <div>
    <input
      type="number"
      v-if="edit"
      :value="valueLocal"
      @blur="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      @keyup.enter="
        valueLocal = $event.target.value;
        edit = false;
        $emit('input', valueLocal);
      "
      v-focus=""
    />
    <p v-else @click="edit = true">
      {{ valueLocal }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['value'],

  data() {
    return {
      edit: false,
      valueLocal: this.value[1][this.value[0]],
    };
  },

  watch: {
    valueLocal: function () {
      this.$set(this.value[1], this.value[0], this.valueLocal);
    },
    value: function () {
      this.valueLocal = this.value[1][this.value[0]];
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
