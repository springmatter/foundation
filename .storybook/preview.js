import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "tachyons";
import "../plugin/styles/base.css";
import theme from "./theme.js";
import { addDecorator, addParameters } from "@storybook/vue";

import { withA11y } from "@storybook/addon-a11y";

addDecorator(withA11y);
addParameters({
  options: {
    showRoots: true,
    theme: theme
  }
});
