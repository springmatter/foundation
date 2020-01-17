import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import "../utilities/utilities.css";
import "./styles.css";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue)$/
);

export default {
  install(Vue, options) {
    this.registerComponents(Vue);
  },
  registerComponents(Vue) {
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName = upperFirst(
        camelCase(
          fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
      );

      Vue.component(componentName, componentConfig.default || componentConfig);
    });
  }
};
