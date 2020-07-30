import Vue from 'vue'
import VueRouter from 'vue-router'
import WhiteBoard from './components/whiteboard/WhiteBoard.vue'
import TestComponent from './components/jsoneditor/Editor.vue'
import LoginComponent from './components/registration/Login.vue'
import MainComponent from './components/Treditor.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: MainComponent,
      children: [
          { path: '', component: WhiteBoard },
          { path: 'stage', component: WhiteBoard },
          { path: 'editor', component: WhiteBoard },
          { path: 'bio ', component: WhiteBoard },
          { path: 'test', component: TestComponent},
      ] 
    },
    { path: '/login', component: LoginComponent },
  ]
  
  export const router = new VueRouter({
  routes
  })