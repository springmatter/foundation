import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "tachyons";
import "./styles/base.css";

import SmApp from "./components/SmApp.vue";
import SmButton from "./components/SmButton.vue";
import SmCard from "./components/SmCard.vue";
import SmDropdown from "./components/SmDropdown.vue";
import SmIcon from "./components/SmIcon.vue";
import SmImage from "./components/SmImage.vue";
import SmSpinner from "./components/SmSpinner.vue";
import SmMore from "./components/SmMore.vue";
import SmScrollBox from "./components/SmScrollBox.vue";
import SmSearch from "./components/SmSearch.vue";
import SmTag from "./components/SmTag.vue";

export default {
  install(Vue) {
    Vue.component("SmApp", SmApp);
    Vue.component("SmButton", SmButton);
    Vue.component("SmCard", SmCard);
    Vue.component("SmDropdown", SmDropdown);
    Vue.component("SmIcon", SmIcon);
    Vue.component("SmImage", SmImage);
    Vue.component("SmSpinner", SmSpinner);
    Vue.component("SmMore", SmMore);
    Vue.component("SmScrollBox", SmScrollBox);
    Vue.component("SmSearch", SmSearch);
    Vue.component("SmTag", SmTag);
  }
};
