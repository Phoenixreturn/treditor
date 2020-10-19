<template>
  <div>
    <v-dialog
      v-model="dialogVisible"
      persistent
      :width="options.width"
      v-bind:style="{ zIndex: options.zIndex }">
      <slot :vis="dialogVisible"></slot>
    </v-dialog>
  </div>
</template>

<script>
import whiteboardService from "@/services/whiteboard.service"

export default {
  name: "dialog-wrapper",

  data: () => ({
    dialogVisible: false,
    options: {
      width: 600,
      zIndex: 200
    },
    resolve: null,
    reject: null
  }),
  methods: {
    open(options) {
      this.dialogVisible = true;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.$root.$emit('openProject', { projectId: 'sdvsdvsf343434' });
      this.dialogVisible = false;
    },
    cancel() {
      this.resolve(false);
      this.dialogVisible = false;
    }
  },
  provide: function() {
    return { 
      agree: this.agree, 
      cancel: this.cancel 
    };
  }
};
</script>