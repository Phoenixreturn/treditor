import Vue from 'vue'
import VueKonva from 'vue-konva'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {store} from './store';
import { router } from   './router';

import './assets/css/app.css'

Vue.use(VueKonva)
Vue.use(VeeValidate);

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

