<template>
  <v-card dark>
    <v-card-title v-show="!!title">{{ title }}</v-card-title>
    <v-card-text v-show="!!message">{{ message }}</v-card-text>
    <input v-model="message" placeholder="отредактируй меня" />
    <p>Вы ввели следующее название проекта: {{ message }}</p>
    <v-card-actions>
      <v-btn @click="createNewProject">Create New Project</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import whiteboardService from "@/services/whiteboard.service";

export default {
  name: "create-project-frame",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Create Project",
    },
  },
  // watch: {
  //   dialogVisible: {
  //     immediate: true,
  //     handler() {},
  //   },
  // },
  data: function () {
    return {
      message: '...'
    };
  },
  inject: ["agree", "cancel"],
  methods: {
    createNewProject() {
      if (this.message.length > 0) {
        whiteboardService.createProject(this.message).then(() => {
          console.log("project created");
        });
        this.agree();
      }
    },
  },
};
</script>
