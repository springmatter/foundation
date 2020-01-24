// these options include a workaround for this bug with storybook mdx:
// https://github.com/storybookjs/storybook/issues/8096#issuecomment-534000621
module.exports = {
  presets: [
    [
      "@vue/babel-preset-app",
      {
        useBuiltIns: false,
        jsx: false
      }
    ]
  ]
};
