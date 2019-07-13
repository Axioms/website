import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vpn',
      name: 'vpn',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Vpn.vue')
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: () => import('./views/Download.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwtUser) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/ssh',
      name: 'ssh',
      component: () => import('./views/Ssh.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/signup.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwtUser) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.jwtUser) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
