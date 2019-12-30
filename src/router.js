import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/vpn",
      name: "vpn",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Vpn.vue")
    },
    {
      path: "/filemanager",
      name: "filemanager",
      component: () => import("./views/Filemanager.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwt) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/ssh",
      name: "ssh",
      component: () => import("./views/Ssh.vue")
    },
    /*{
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },*/
    {
      path: "/gradeCalc",
      name: "gradeCalc",
      component: () => import("./views/GradeCalc.vue")
    },
    {
      path: "/passwordreset",
      name: "passwordreset",
      component: () => import("./views/Passwordreset.vue")
    },
    {
      path: "/notes",
      name: "notes",
      component: () => import("./views/Notes.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwt) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwt) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
