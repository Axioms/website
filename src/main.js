import '@babel/polyfill'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
