<template>
  <label class="SmInputRoot">
    <small class="SmInputLabel" v-if="label">
      {{ label }}
      <span class="SmInputRequired" v-if="required">*</span>
    </small>
    <input
      class="SmInput"
      v-bind="$attrs"
      :value="value"
      @input="input($event)"
      @blur="checks($event)"
      @focus="$emit('focus', $event)"
      @keyup="$emit('keyup', $event)"
      @change="$emit('change', $event)"
      ref="input"
    />
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
      this.$emit("blur", event);
      event.preventDefault();
      if (this.required && this.$refs.input) {
        this.$refs.input.setAttribute("required", true);
      }
    },
    input(event) {
      this.$emit("input", event.target.value);
    }
  },
  mounted() {
    let form = this.$refs.input.closest("form");
    if (form) {
      form.addEventListener("submit", event => {
        this.checks(event);
      });
    }
  }
};
</script>

<style scoped>
.SmInputRoot {
  display: block;
  width: 100%;
}

.SmInputLabel {
  margin-bottom: 8px;
  display: block;
  margin-top: 0;
}
.SmInput {
  background: white;
  border: 1px solid black;
  padding-left: 8px;
  display: block;
  width: 100%;
  height: 32px;
  box-sizing: border-box;
}

.SmInput:focus,
.SmInput[type="search"]:focus {
  outline: none;
  /* box-shadow: 0 0 0 1px var(--primary); */
  border: 1px solid var(--primary);
}

.SmInput:not(:focus):invalid {
  /* box-shadow: 0 0 0 1px #e7040f; */
  border: 1px solid var(--error);
  background-repeat: no-repeat;
  background-position: center right 16px;
}

.SmInput::placeholder {
  color: var(--gray);
}

.SmInput:disabled {
  cursor: not-allowed;
  opacity: 0.25;
}

.SmInput[type="color"] {
  padding: 2px;
}

.SmInput[type="color"]:hover {
  cursor: pointer;
}

.SmInput[type="file"] {
  border: none !important;
  width: auto;
  padding: 0;
}

.SmInputRequired {
  color: var(--error);
}

.SmInputError {
  color: var(--error);
  text-align: right;
}

.SmInput[type="search"]::-webkit-search-decoration,
.SmInput[type="search"]::-webkit-search-cancel-button,
.SmInput[type="search"]::-webkit-search-results-button,
.SmInput[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
