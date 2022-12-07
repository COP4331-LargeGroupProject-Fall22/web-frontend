import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./components/HomeView.vue";
import LoginView from "./components/LoginView.vue";
import RegisterView from "./components/RegisterView.vue";
import VerifyEmailView from "./components/VerifyEmailView.vue";
// lazy-loaded
const ProfileView = () => import("./components/ProfileView.vue");

const routes = [
  {
    path: "/",
    name: "SmartChef",
    alias: ["/home"],
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/confirm",
    name: "Confirm email",
    component: VerifyEmailView,
  },
  {
    path: "/profile",
    name: "User profile",
    // lazy-loaded
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/register', '/home'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  // if (authRequired && !loggedIn) {
  //   next('/login');
  // } else {
  //   next();
  // }
  document.title = to.name;
  next();
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
