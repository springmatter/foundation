<template>
  <button
    class="SmButton"
    :class="[kind, { small: small }]"
    @click="$emit('click', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout')"
  >
    <slot></slot>
    <SmIcon v-if="icon" :name="icon" :size="small ? 's' : 'm'" />
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
        return ["primary", "secondary", "ghost", "icon"].indexOf(value) !== -1;
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
  display: inline;
  text-align: left;
  border: none;
  outline: none;
  cursor: pointer;
}

.SmButton:focus {
  outline: #0038ff solid 2px;
  outline-offset: 1px;
}

.primary,
.secondary,
.ghost,
.icon {
  min-width: 176px;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
}

.primary > svg,
.secondary > svg,
.ghost > svg {
  margin-left: 8px;
}

.SmButton:disabled,
.primary:disabled,
.secondary:disabled,
.ghost:disabled,
.icon:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.SmButton:active,
.primary:active,
.secondary:active {
  opacity: 0.75;
}

.ghost:active,
.icon:active {
  opacity: 0.5;
}

.primary,
.primary:disabled:hover {
  background: var(--primary);
  color: white;
}

.primary:hover {
  background: var(--primary-hover);
}

.secondary,
.secondary:disabled:hover {
  background: var(--gray2);
  color: black;
}

.secondary:hover {
  background: var(--gray3);
}

.ghost,
.ghost:disabled:hover,
.icon,
.icon:disabled:hover {
  background: white;
  color: black;
  border: 1px solid var(--secondary);
}

.ghost:hover,
.icon:hover {
  border: 1px solid var(--primary);
  color: var(--primary);
}

.small {
  min-width: 120px;
  height: 32px;
}

.icon {
  padding: 7px;
  min-width: 0;
}
</style>
