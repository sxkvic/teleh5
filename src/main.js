import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Field, Form, Checkbox, Toast } from "vant";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
