import Vue from 'vue'
import VueRouter from 'vue-router'
import VueKonva from 'vue-konva'
import App from './App.vue'
import WhiteBoard from './components/whiteboard/WhiteBoard.vue'
import vuetify from './plugins/vuetify';
import {store} from './store';

Vue.use(VueRouter)
Vue.use(VueKonva)

const routes = [
  { path: '/', component: WhiteBoard },
  { path: '/stage', component: WhiteBoard },
  { path: '/editor', component: WhiteBoard },
  { path: '/bio ', component: WhiteBoard }
]

const router = new VueRouter({
routes
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify, 
  render: h => h(App)
}).$mount('#app')

