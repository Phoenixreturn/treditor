import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import event from './eventContext.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    event
  }
});