import "@babel/polyfill";
import Vue from "vue";
import "./plugins/fontawesome";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import BootstrapVue from "bootstrap-vue";
import VueClipboard from "vue-clipboard2";
import VueHtml2Canvas from 'vue-html2canvas';

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.use(VueHtml2Canvas);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
