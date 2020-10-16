<template>
  <v-app>
    <v-navigation-drawer app expand-on-hover permanent :color="color">
       <dlg-wrapper ref="dlg">
          <dlg-frame title="Dialog" message="Message"></dlg-frame>
        </dlg-wrapper>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="../assets/avatar.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Robert Gallyamov</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <dlg-wrapper ref="dlg">
          <dlg-frame title="Dialog" message="Message"></dlg-frame>
      </dlg-wrapper>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :color="color" app flat>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" dark v-on="on">Project</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menuItems" :key="index" @click="do_action(item)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <SvgSprite class="sprite"></SvgSprite>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue"
import SvgSprite from "../assets/sprite.svg"
import DlgWrapper from "@/components/whiteboard/DlgWrapper";
import DlgFrame from "@/components/whiteboard/DlgFrame";

export default {
  name: "Treditor",
  components: {
    SvgSprite,
    DlgWrapper,
    DlgFrame
  },
  data() {
    return {
      color: "background",
      items: [
        { title: "Home", icon: "mdi-home-city", link: "stage" },
        { title: "TestComponent", icon: "mdi-account", link: "test" },
        { title: "LoginComponent", icon: "mdi-account", link: "login" },
        { title: "Users", icon: "mdi-account-group-outline", link: "bio" }
      ],
      menuItems: [
        { title: "Open", action: "open" },
        { title: "Save", action: "save" }
      ]
    }
  },
  methods: {
    clickedOnFIle(event, item) {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$' + item.link)
    },
    do_action: function(item) {
      switch(item.action) {
        case 'open':
          this.open_dialog();
          break;
        case 'save':
          break;
        default:
          break;
      }

    },
    open_dialog: function() {
      this.$refs.dlg.open().then(result => {
        console.log('Result: ', result)
      })
  }
  },
}
</script>

<style>
.sprite {
  height: 0;
  width: 0;
  position: absolute;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>