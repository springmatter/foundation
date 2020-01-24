import SmButton from "../plugin/components/SmButton.vue";

import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";

export default {
  title: "SmButton",
  decorators: [withA11y],
  component: SmButton
};

const TEMPLATE = `
  <SmButton kind="primary" class="m-10" @click="click">
    Click me
  </SmButton>
`;

export const Default = () => ({
  components: { SmButton },
  template: TEMPLATE,
  methods: {
    // each action (aka event) needs to be declared like this and
    // then called in the template
    click: action("click")
  }
});
