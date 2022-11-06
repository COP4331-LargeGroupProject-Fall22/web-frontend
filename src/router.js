import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./components/HomeView.vue";
import LoginView from "./components/LoginView.vue";
import RegisterView from "./components/RegisterView.vue";
// lazy-loaded
const ProfileView = () => import("./components/ProfileView.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfileView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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