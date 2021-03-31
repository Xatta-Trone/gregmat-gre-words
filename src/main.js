import Vue from "vue";
import App from "./App.vue";
import "./assets/style.css";
Vue.config.productionTip = false;

import Notifications from "vue-notification";

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.use(Notifications);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
