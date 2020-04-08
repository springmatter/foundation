<template>
  <label class="SmSelectRoot">
    <small class="SmSelectLabel">
      {{ label }}
      <span class="SmSelectRequired" v-if="required">*</span>
    </small>
    <SmSpinner v-if="loading" class="SmSelectSpinner" small />
    <select
      class="SmSelect"
      :class="{ SmSelectLoading: loading }"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event)"
      @blur="checks($event)"
      ref="select"
      :disabled="disabled || loading"
    >
      <option v-if="!loading" value="" selected disabled>
        {{ placeholder }}
      </option>
      <slot></slot>
    </select>
  </label>
</template>

<script>
import SmSpinner from "./SmSpinner.vue";

export default {
  components: { SmSpinner },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    /** This is declared so v-model can be used on the input */
    value: {
      type: String
    }
    // /** An interface for the contstraint validation API, structured as such: `{ ValidityState: errorMsg }`  */
    // validation: {
    //   type: Object
    // }
  },
  methods: {
    checks(event) {
      this.$emit("blur", event);
      event.preventDefault();
      if (this.required) {
        this.$refs.select.setAttribute("required", true);
      }
    }
  },
  mounted() {
    let form = this.$refs.select.closest("form");
    if (form) {
      form.addEventListener("submit", event => {
        this.checks(event);
      });
    }
  }
};
</script>

<style scoped>
.SmSelectRoot {
  display: block;
  width: 100%;
  position: relative;
}

.SmSelectLabel {
  margin-bottom: 8px;
  display: block;
  margin-top: 0;
}
.SmSelect {
  border: 1px solid black;
  padding: 0 16px 0 8px;
  height: 32px;
  display: block;
  width: 100%;
  appearance: none;
  border-radius: 2px;
}

.SmSelect:focus {
  outline: none;
  border: 1px solid var(--primary);
}

.SmSelect:not(:focus):invalid {
  /* box-shadow: 0 0 0 1px var(--error); */
  border: 1px solid var(--error);
}

.SmSelect:disabled {
  cursor: not-allowed;
  opacity: 0.25;
}

.SmSelect[multiple] {
  padding: 0;
  height: auto;
}

.SmSelect[multiple] * {
  border-radius: 0;
  padding: 4px;
}

.SmSelectRequired {
  color: var(--error);
}

.SmSelectSpinner {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 16px;
  margin-bottom: 16px;
}

.SmSelectLoading:disabled {
  cursor: wait;
  opacity: 1;
}
</style>
