<template>
  <v-app>
  <v-navigation-drawer app expand-on-hover permanent :color="color">
      <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>
  
            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
  
        <v-divider></v-divider>
  
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title" 
            :to="item.link" 
            link
          >
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
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

     <router-view></router-view>
  </v-content>
  <v-footer app>
  </v-footer>
</v-app>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      color: 'background',
      items: [
        { title: 'Home', icon: 'mdi-home-city', link: 'stage' },
        { title: 'My Account', icon: 'mdi-account', link: 'editor' },
        { title: 'Users', icon: 'mdi-account-group-outline', link: 'bio' },
      ],
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>