<template>
  <v-app-bar color="blue" dense app>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">Project</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="do_action(item)"
        >
          <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-list-item-avatar v-on="on">
          <v-icon x-large>mdi-login</v-icon>
        </v-list-item-avatar>
      </template>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Robert Gallyamov</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-menu>

    <dialog-wrapper ref="dlg">
      <template v-slot="{ vis }">
        <component
          v-bind:is="currentFrame"
          v-bind:dialogVisible="vis"
        ></component>
      </template>
    </dialog-wrapper>
  </v-app-bar>
</template>

<script>
import DialogWrapper from '@/components/dialogs/DialogWrapper';
import CreateProjectFrame from '@/components/dialogs/CreateProjectFrame';
import OpenProjectFrame from '@/components/dialogs/OpenProjectFrame';

export default {
  name: 'Header',
  components: {
    DialogWrapper,
    CreateProjectFrame,
    OpenProjectFrame,
  },
  data() {
    return {
      menuItems: [
        { title: 'New', action: 'create', icon: 'mdi-new' },
        { title: 'Open', action: 'open', icon: 'mdi-book-open' },
        { title: 'Save', action: 'save', icon: 'mdi-save' },
        { title: 'Close', action: 'close', icon: 'mdi-close' },
      ],
      currentFrame: 'OpenProjectFrame',
    };
  },

  methods: {
    do_action: function (item) {
      switch (item.action) {
        case 'open':
          this.open_dialog();
          break;
        case 'save':
          this.$root.$emit('save-project');
          break;
        case 'create':
          this.currentFrame = 'CreateProjectFrame';
          this.open_dialog();
          this.$root.$emit('create-project');
          break;
        case 'close':
          this.$root.$emit('close-project');
          break;
        default:
          break;
      }
    },
    open_dialog: function () {
      this.$refs.dlg.open().then((result) => {
        console.log('Result: ', result);
      });
    },
  },
};
</script>
