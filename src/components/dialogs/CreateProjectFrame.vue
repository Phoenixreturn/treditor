<template>
  <v-card dark>
    <v-card-title v-show="!!title">{{ title }}</v-card-title>
    <v-card-text v-show="!!message">{{ message }}</v-card-text>
    <input v-model="message" placeholder="отредактируй меня" />
    <p>Введённое сообщение: {{ message }}</p>
    <v-card-actions>
      <v-btn @click="agree">Open Project</v-btn>
      <v-btn @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'create-project-frame',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Create Project',
    },
    message: {
      type: String,
      default: '...',
    },
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler() {
        console.log('CreateProjectFrame $$$$$$$$$$$$$$$$');
      },
    },
  },
  data: function () {
    return {};
  },
  inject: ['agree', 'cancel'],
  methods: {},
};
</script>
