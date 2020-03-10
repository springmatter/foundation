<template>
  <label class="SmTextAreaRoot">
    <small class="SmTextAreaLabel">
      {{ label }}
      <span class="SmTextAreaRequired" v-if="required">*</span>
    </small>
    <textarea
      class="SmTextArea"
      v-bind="$attrs"
      :value="value"
      @input="input($event)"
      @blur="checks($event)"
      @keyup="$emit('keyup')"
      @search="$emit('search')"
      ref="textarea"
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
      event.preventDefault();
      if (this.required) {
        this.$refs.textarea.setAttribute("required", true);
      }
    },
    input(event) {
      this.$emit("input", event.target.value);
    }
  },
  mounted() {
    let form = this.$refs.textarea.closest("form");
    if (form) {
      form.addEventListener("submit", event => {
        this.checks(event);
      });
    }
  }
};
</script>

<style scoped>
.SmTextAreaRoot {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

.SmTextAreaLabel {
  margin-bottom: 8px;
  display: block;
  margin-top: 0;
}
.SmTextArea {
  background: white;
  border: 1px solid black;
  padding-left: 8px;
  height: 80px;
  display: block;
  width: 100%;
  resize: vertical;
}

.SmTextArea:focus {
  outline: none;
  /* box-shadow: 0 0 0 1px var(--primary); */
  border: 1px solid var(--primary);
}

.SmTextArea:not(:focus):invalid {
  /* box-shadow: 0 0 0 1px #e7040f; */
  border: 1px solid var(--error);
  background-repeat: no-repeat;
  background-position: center right 16px;
}

.SmTextArea::placeholder {
  color: var(--gray);
}

.SmTextArea:disabled {
  cursor: not-allowed;
  opacity: 0.25;
}

.SmTextAreaRequired {
  color: var(--error);
}

.SmTextAreaError {
  color: var(--error);
  text-align: right;
}
</style>
