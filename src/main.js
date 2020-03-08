import Vue from 'vue'
import VueRouter from 'vue-router'
import VueKonva from 'vue-konva'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import HelloWorld from './components/HelloWorld.vue'
import Resizable from './components/Resizable.vue'
import WhiteBoard from './components/WhiteBoard.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import {store} from './store';

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueKonva)

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/resizable', component: Resizable },
  { path: '/canvas', component: WhiteBoard }
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

