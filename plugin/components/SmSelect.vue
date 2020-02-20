<template>
  <label class="SmSelectRoot">
    <small class="SmSelectLabel">
      {{ label }}
      <span class="SmSelectRequired" v-if="required">*</span>
    </small>
    <select
      class="SmSelect"
      v-bind="$attrs"
      :value="value"
      @input="input($event)"
      @blur="checks($event)"
      ref="select"
    >
      <slot></slot>
    </select>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    required: {
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
      event.preventDefault();
      if (this.required) {
        this.$refs.select.setAttribute("required", true);
      }
    },
    input(event) {
      this.$emit("input", event.target.value);
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
  margin-bottom: 16px;
}

.SmSelectLabel {
  margin-bottom: 8px;
  display: block;
  margin-top: 0;
}
.SmSelect {
  border: 1px solid black;
  padding: 0 16px;
  height: 40px;
  display: block;
  width: 100%;
  appearance: none;
  border-radius: 2px;
}

.SmSelect:focus {
  outline: none;
  box-shadow: 0 0 0 1px var(--primary);
  border: 1px solid var(--primary);
}

.SmSelect:not(:focus):invalid {
  box-shadow: 0 0 0 1px #e7040f;
  border: 1px solid #e7040f;
  background-repeat: no-repeat;
  background-position: center right 16px;
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
  color: #e7040f;
}
</style>
