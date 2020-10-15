<template>
  <v-card dark>
    <v-card-title v-show="!!title">{{ title }}</v-card-title>
    <v-card-text v-show="!!message">{{ message }}</v-card-text>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    ></v-data-table>
    <v-card-actions>
      <v-btn @click="agree">Open Project</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const mongoose = require("mongoose");

export default {
  name: "dlg-frame",
  props: ["title", "message"],
  data: function() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'objectId', value: 'objectId' }
      ],
      desserts: [
        {
          name: 'Picasso',
          objectId: new mongoose.Types.ObjectId(),
        },
        {
          name: 'Van Gog',
          objectId: new mongoose.Types.ObjectId(),
        }
      ],
    }
  },
  inject: ["agree", "cancel"],
  methods: {}
};
</script>