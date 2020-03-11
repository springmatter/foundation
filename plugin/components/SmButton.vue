<template>
  <button class="SmButton" :class="kind" @click="$emit('click', $event)">
    <slot></slot>
    <SmIcon v-if="icon" :name="icon" />
    <small v-if="tooltip" class="SmButtonTooltip">{{ tooltip }}</small>
  </button>
</template>

<script>
import SmIcon from "./SmIcon.vue";
export default {
  components: {
    SmIcon
  },
  props: {
    /** Specifies the visual style of the button (primary|secondary|icon) */
    kind: {
      type: String,
      required: false,
      default: "primary",
      validator: function(value) {
        return ["primary", "secondary", "icon"].indexOf(value) !== -1;
      }
    },
    /** Adds an icon to the button. Must be the name of a feather icon. */
    icon: {
      type: String,
      required: false
    },
    /** Adds a tooltip with the specified text. Most icon buttons should have tooltips */
    tooltip: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
.SmButton {
  border: none;
  text-align: center;
  outline: none;
  cursor: pointer;
  min-width: 40px;
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 300;
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
    background 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
    color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.SmButton:hover {
  text-decoration: none;
}

.SmButton:focus {
  outline: #0038ff solid 2px;
  outline-offset: 1px;
  z-index: 10000;
}

.SmButton.primary > svg,
.SmButton.secondary > svg,
.SmButton.ghost > svg {
  margin-left: 8px;
}

.SmButton:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.SmButton:active {
  opacity: 0.75;
}

.SmButton.primary,
.SmButton.primary:disabled:hover {
  background: var(--primary);
  color: white;
}

.SmButton.primary:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.SmButton.secondary,
.SmButton.secondary:disabled:hover {
  background: white;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.SmButton.icon,
.SmButton.icon:disabled:hover {
  background: white;
  color: black;
  height: 32px;
  padding: 0;
}

.SmButton.icon:hover {
  color: var(--primary);
  transform: translateY(-1px);
}

.SmButton.secondary:hover {
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
  display: none;
  bottom: -32px;
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

.SmButton:hover .SmButtonTooltip {
  display: flex;
}
</style>
