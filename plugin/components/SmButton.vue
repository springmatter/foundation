<template>
  <button class="SmButton" :class="btnClass" @click="$emit('click', $event)">
    <template v-if="kind !== 'icon'">
      <span v-if="loading === 1 && loadingText" class="SmButtonText">
        {{ loadingText }}
      </span>
      <span v-else-if="loading === 2 && loadedText" class="SmButtonText">
        {{ loadedText }}
      </span>
      <span class="SmButtonText" v-else>
        <slot></slot>
      </span>
    </template>

    <SmSpinner v-if="loading === 1" small class="SmButtonSpinner" />
    <SmIcon
      v-if="icon && loading !== 1 && !(loadedText && loading === 2)"
      :name="icon"
    />
    <small v-if="tooltip" class="SmButtonTooltip" :class="ttDirection">
      {{ tooltip }}
    </small>
  </button>
</template>

<script>
import SmIcon from "./SmIcon.vue";
import SmSpinner from "./SmSpinner.vue";

export default {
  components: {
    SmIcon,
    SmSpinner,
  },
  props: {
    /** Specifies the visual style of the button (primary|secondary|icon) */
    kind: {
      type: String,
      required: false,
      default: "primary",
      validator: function(value) {
        return ["primary", "secondary", "icon", "empty"].indexOf(value) !== -1;
      },
    },
    /** Adds an icon to the button. Must be the name of a feather icon. */
    icon: {
      type: String,
      required: false,
    },
    /** Adds a tooltip with the specified text. Most icon buttons should have tooltips */
    tooltip: {
      type: String,
      required: false,
    },
    /** Changes the direction of the tooltip, in case it is too close to the edge of the screen (left|right|top|bottom) */
    ttDirection: {
      type: String,
      required: false,
      default: "bottom",
      validator: function(value) {
        return ["left", "right", "top", "bottom"].indexOf(value) !== -1;
      },
    },
    /** 0 is not loading, 1 is loading, 2 is loaded */
    loading: {
      type: Number,
      validator(value) {
        return 0 <= value <= 2;
      },
    },
    /** The text that appears while `loading === 1` */
    loadingText: {
      type: String,
    },
    /** The text that appears while `loading === 2`. If this prop is provided on a button with an icon the icon will not be displayed when `loading === 2` */
    loadedText: {
      type: String,
    },
  },
  computed: {
    btnClass() {
      return this.kind + " loading" + this.loading;
    },
  },
};
</script>

<style scoped>
.SmButton {
  border: none;
  text-align: center;
  outline: none;
  cursor: pointer;
  min-width: 32px;
  height: 32px;
  padding-left: 16px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 300;
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
    background 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
    color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.SmButton.empty {
  text-align: initial;
  min-width: initial;
  height: initial;
  padding: initial;
  display: block;
}

.SmButton:hover {
  text-decoration: none;
}

.SmButton:focus {
  outline: #0038ff solid 1px;
  outline-offset: 1px;
}

.SmButton.icon:focus {
  outline-offset: -1px;
}

.SmButton:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.SmButton:active:not(:disabled) {
  opacity: 0.75;
}

.SmButton.loading1,
.SmButton.loading2 {
  pointer-events: none;
}

.SmButton.primary,
.SmButton.primary:disabled:hover {
  background: var(--primary);
  color: white;
}

.SmButton.primary:hover:not(.loading1) {
  background: var(--secondary);
  transform: translateY(-1px);
}

.SmButton.secondary,
.SmButton.secondary:disabled {
  background: white;
  color: black;
  border: 1px solid black;
}

.SmButton.icon,
.SmButton.icon:disabled {
  background: transparent;
  color: black;
  height: 32px;
  padding: 0;
}

.SmButton.icon:hover:not(.loading1) {
  color: var(--primary);
  transform: translateY(-1px);
}

.SmButton.secondary:hover:not(.loading1) {
  color: var(--secondary);
  border: 1px solid var(--secondary);
  transform: translateY(-1px);
}

.SmButtonTooltip {
  min-height: 32px;
  white-space: nowrap;
  padding: 0 8px;
  background: black;
  color: white;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
  opacity: 0;
  top: 100%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translateX(-50%);
  transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  pointer-events: none;
}

.SmButtonTooltip.right {
  top: 50%;
  bottom: auto;
  right: auto;
  transform: translateY(-50%);
  left: 100%;
}

.SmButtonTooltip.left {
  top: 50%;
  bottom: auto;
  left: auto;
  transform: translateY(-50%);
  right: 100%;
}

.SmButtonTooltip.top {
  bottom: 100%;
  top: auto;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}

.SmButtonTooltip::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
  border-radius: 0;
}

.SmButtonTooltip.top::before {
  bottom: -4px;
  left: initial;
  right: initial;
  top: initial;
  transform: rotate(180deg);
}

.SmButtonTooltip.left::before {
  right: -6px;
  left: initial;
  top: initial;
  bottom: initial;
  transform: rotate(90deg);
}

.SmButtonTooltip.right::before {
  left: -6px;
  right: initial;
  top: initial;
  bottom: initial;
  transform: rotate(-90deg);
}

.SmButton:hover .SmButtonTooltip {
  opacity: 1;
}

.SmButtonSpinner {
  position: relative;
  margin: 0 10px;
  /* mix-blend-mode; */
}

.SmButton.primary .SmButtonSpinner {
  filter: invert(100%);
  mix-blend-mode: screen;
}

.SmButtonText {
  margin-right: 8px;
}
</style>
