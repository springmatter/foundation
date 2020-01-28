import { create } from "@storybook/theming/create";
import logo from "./sm-logo-square.svg";
import intro from "./intro.otf";

export default create({
  base: "light",

  colorPrimary: "#0038ff",
  colorSecondary: "#0038ff",

  // UI
  appBg: "#f8f9fa",
  appContentBg: "white",
  appBorderColor: "silver",
  appBorderRadius: 4,

  // Typography
  fontBase:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontCode: "monospace",

  // Text colors
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "#495057",
  barSelectedColor: "#495057",
  barBg: "white",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: "Foundation",
  brandUrl: "https://github.com/springmatter/foundation",
  brandImage: logo
});
