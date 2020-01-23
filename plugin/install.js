import "./styles/utilities.css";
import "./styles/base.css";

import SmApp from "./components/SmApp.vue";
import SmButton from "./components/SmButton.vue";
import SmCard from "./components/SmCard.vue";
import SmColumnBox from "./components/SmColumnBox.vue";
import SmDropdown from "./components/SmDropdown.vue";
import SmIcon from "./components/SmIcon.vue";
import SmImage from "./components/SmImage.vue";
import SmLoading from "./components/SmLoading.vue";
import SmMore from "./components/SmMore.vue";
import SmScrollBox from "./components/SmScrollBox.vue";
import SmSearch from "./components/SmSearch.vue";
import SmTag from "./components/SmTag.vue";

export default {
  install(Vue, options) {
    Vue.component("SmApp", SmApp);
    Vue.component("SmButton", SmButton);
    Vue.component("SmCard", SmCard);
    Vue.component("SmColumnBox", SmColumnBox);
    Vue.component("SmDropdown", SmDropdown);
    Vue.component("SmIcon", SmIcon);
    Vue.component("SmImage", SmImage);
    Vue.component("SmLoading", SmLoading);
    Vue.component("SmMore", SmMore);
    Vue.component("SmScrollBox", SmScrollBox);
    Vue.component("SmSearch", SmSearch);
    Vue.component("SmTag", SmTag);
  }
};
