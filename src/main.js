import Vue from 'vue'
import VueRouter from 'vue-router'
import VueKonva from 'vue-konva'
import App from './App.vue'
import WhiteBoard from './components/whiteboard/WhiteBoard.vue'
import TestComponent from './components/jsoneditor/Editor.vue'
import vuetify from './plugins/vuetify';
import {store} from './store';

import './assets/css/app.css'
Vue.use(VueRouter)
Vue.use(VueKonva)

const routes = [
  { path: '/', component: WhiteBoard },
  { path: '/stage', component: WhiteBoard },
  { path: '/editor', component: WhiteBoard },
  { path: '/bio ', component: WhiteBoard },
  { path: '/test', component: TestComponent}
]

const router = new VueRouter({
routes
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  el: '#app',
  vuetify, 
  render: function(h) {
    return h(App)
  }
})

