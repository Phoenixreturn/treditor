<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      :width="options.width"
      v-bind:style="{ zIndex: options.zIndex }"
    >
      <slot></slot>
    </v-dialog>
  </div>
</template>

<script>
import whiteboardService from '../../services/whiteboard.service'

export default {
  name: "dlg-wrapper",

  data: () => ({
    dialog: false,
    options: {
      width: 600,
      zIndex: 200
    },
    resolve: null,
    reject: null
  }),

  methods: {
    open(options) {
      this.dialog = true;
      whiteboardService.getProjects();
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.$root.$emit('openProject', { projectId: 'sdvsdvsf343434' });
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
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