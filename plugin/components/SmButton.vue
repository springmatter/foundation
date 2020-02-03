<template>
  <button
    class="SmButton"
    :class="[kind, { small: small }]"
    @click="$emit('click', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout')"
  >
    <slot></slot>
    <SmIcon v-if="icon" :name="icon" :size="small || icon ? 's' : 'm'" />
  </button>
</template>

<script>
import SmIcon from "./SmIcon.vue";
export default {
  components: {
    SmIcon
  },
  props: {
    /** Specifies the visual style of the button (primary|secondary|ghost|icon) */
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
    /** Makes the button smaller */
    small: {
      type: Boolean,
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
  min-width: 176px;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
    background 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.SmButton:focus {
  outline: #0038ff solid 2px;
  outline-offset: 1px;
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

.primary,
.primary:disabled:hover {
  background: var(--primary);
  color: white;
}

.primary:hover {
  background: #001b44;
  transform: translateY(-1px);
}

.secondary,
.secondary:disabled:hover {
  background: white;
  color: black;
  border: 1px solid black;
}

.icon,
.icon:disabled:hover {
  background: white;
  color: black;
  border: 1px solid black;
  height: 32px;
  padding: 7px;
  min-width: 0;
}

.secondary:hover,
.icon:hover {
  border: 1px solid #001b44;
  color: #001b44;
}

.secondary:hover {
  transform: translateY(-1px);
}

.small {
  min-width: 120px;
  height: 32px;
}
</style>
