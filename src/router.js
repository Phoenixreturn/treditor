import Vue from 'vue';
import VueRouter from 'vue-router';
import WhiteBoard from '@/components/whiteboard/WhiteBoard.vue';
import Login from '@/components/authentication/Login.vue';
import Registration from '@/components/authentication/Registration.vue';
import Profile from '@/components/authentication/Profile.vue';
import WelcomeWindow from '@/components/WelcomeWindow';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: WelcomeWindow,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/whiteboard',
    component: WhiteBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    component: Registration,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user');

//   if (!loggedIn && LOGIN_PATH !== to.path) {
//     console.log("Redirect to onboarding page $$$")
//     next('/onboarding');
//   } else {
//     next();
//   }
// })

export default router;
