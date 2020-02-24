import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "./base.css";
import "tachyons";

import VueRouter from "vue-router";

import SmButton from "./components/SmButton.vue";
import SmIcon from "./components/SmIcon.vue";
import SmImage from "./components/SmImage.vue";
import SmInput from "./components/SmInput.vue";
import SmModal from "./components/SmModal.vue";
import SmNav from "./components/SmNav.vue";
import SmSearch from "./components/SmSearch.vue";
import SmSelect from "./components/SmSelect.vue";
import SmSpinner from "./components/SmSpinner.vue";

export default {
  install(Vue) {
    Vue.component("SmButton", SmButton);
    Vue.component("SmIcon", SmIcon);
    Vue.component("SmImage", SmImage);
    Vue.component("SmInput", SmInput);
    Vue.component("SmModal", SmModal);
    Vue.component("SmNav", SmNav);
    Vue.component("SmSpinner", SmSpinner);
    Vue.component("SmSearch", SmSearch);
    Vue.component("SmSelect", SmSelect);

    Vue.use(VueRouter);
  }
};
