import Vue from 'vue'
import VueRouter from 'vue-router'
import WhiteBoard from './components/whiteboard/WhiteBoard.vue'
import TestComponent from './components/jsoneditor/Editor.vue'
import OnboardComponent from './components/onboarding/Onboarding.vue'
import RegisterComponent from './components/onboarding/Register.vue'
import ProfileComponent from './components/onboarding/Profile.vue'
import MainComponent from './components/Treditor.vue'
import LearnComponent from './components/learning/LearnComponent'

Vue.use(VueRouter)

const LOGIN_PATH = '/onboarding';

const routes = [
    { path: '/', component: MainComponent,
      children: [
          { path: '', component: WhiteBoard },
          { path: 'stage', component: WhiteBoard },
          { path: 'editor', component: WhiteBoard },
          { path: 'bio', component: WhiteBoard },
          { path: 'test', component: TestComponent},
      ] 
    },
    { path: '/learning', component: LearnComponent},
    { path: '/onboarding', component: OnboardComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/profile', component: ProfileComponent },
]
  
const router = new VueRouter({
routes
})

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user');

//   if (!loggedIn && LOGIN_PATH !== to.path) {
//     console.log("Redirect to onboarding page $$$")
//     next('/onboarding');
//   } else {
//     next();
//   }
// })

export { router };