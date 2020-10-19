<template>
  <v-card dark>
    <v-card-title v-show="!!title">{{ title }}</v-card-title>
    <v-card-text v-show="!!message">{{ message }}</v-card-text>
    <v-data-table
      :headers="headers"
      :items="projects"
      item-key="objectId"
      :single-select=true
      show-select
      v-model="selected"
      :hide-default-footer=true
      class="elevation-1"
    >
    </v-data-table>
    <v-card-actions>
      <v-btn @click="openProject">Open Project</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import whiteboardService from "@/services/whiteboard.service"

export default {
  name: "open-project-frame",
  props: {
    title: {
      type: String,
      default: 'Open Project'
    },
    message: {
      type: String,
      default: '...'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          whiteboardService.getProjects(this.projects)
        }        
      }
    }
  },
  data: function() {
    return {
      singleSelect: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { 
          text: 'objectId',
           value: 'objectId' 
        }
      ],
      projects: [
      ],
      selected: []
    }
  },
  methods: {
    openProject: function() {     
      this.$root.$emit('open-project', this.selected[0]) 
      this.agree();
    }
  },
  inject: ["agree", "cancel"]
};
</script>