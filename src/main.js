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

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueKonva)

var Component = Vue.extend({
  data: function () {
    return { a: 1 }
  }
});

Vue.component('Robert',Component);

var circele = Vue.component('vCircle');
if (circele) {
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
  render: h => h(App),
}).$mount('#app')
}


