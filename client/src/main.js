import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "./plugins/axios";
import BootstrapVue from "bootstrap-vue";
import vueDebounce from "vue-debounce";
import Vuelidate from "vuelidate";
import VueParticles from "vue-particles";
import { VueReCaptcha } from "vue-recaptcha-v3"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faCoins, faUsers, faBox, faPlusCircle, faTable, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBitcoin);
library.add(faCoins);
library.add(faUsers);
library.add(faBox);
library.add(faPlusCircle);
library.add(faTable);
library.add(faQuestionCircle);
library.add(faQuestionCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueReCaptcha, { siteKey: "6LcR4p8UAAAAAIpD_dZ8JJa1bxU7Udyn6ov5YI_S" });
Vue.use(BootstrapVue);
Vue.use(Axios);
Vue.use(vueDebounce);
Vue.use(Vuelidate);
Vue.use(VueParticles)

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
