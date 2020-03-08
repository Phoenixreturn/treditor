<template>
  <v-app>
    <NavigationBar></NavigationBar>
     <router-view></router-view>
   </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar'
import Vue from 'vue'
export default {
  name: 'App',
  components: {
    NavigationBar
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