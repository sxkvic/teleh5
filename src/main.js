import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as Vant from 'vant';
import 'vant/lib/index.css';
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
