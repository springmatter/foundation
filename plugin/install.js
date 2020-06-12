import "./base.css";
import "tachyons";

import SmButton from "./components/SmButton.vue";
import SmIcon from "./components/SmIcon.vue";
import SmImage from "./components/SmImage.vue";
import SmInput from "./components/SmInput.vue";
import SmModal from "./components/SmModal.vue";
import SmNav from "./components/SmNav.vue";
import SmSearch from "./components/SmSearch.vue";
import SmSelect from "./components/SmSelect.vue";
import SmSpinner from "./components/SmSpinner.vue";
import SmTextArea from "./components/SmTextArea.vue";
import SmSearchSelect from "./components/SmSearchSelect.vue";

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
    Vue.component("SmTextArea", SmTextArea);
    Vue.component("SmSearchSelect", SmSearchSelect);
  },
};
