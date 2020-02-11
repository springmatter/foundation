<template>
  <label class="SmInputRoot">
    <small class="SmInputLabel">
      {{ label }}
      <span class="SmInputRequired" v-if="required">*</span>
    </small>
    <input
      class="SmInput"
      v-bind="$attrs"
      :value="value"
      @input="input($event)"
      @blur="checks($event)"
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
      event.preventDefault();
      if (this.required) {
        this.$refs.input.setAttribute("required", true);
      }
    },
    input(event) {
      this.$emit("input", event.target.value);
    }
  },
  mounted() {
    let form = this.$refs.input.closest("form");
    form.addEventListener("submit", event => {
      this.checks(event);
    });
    // form.setAttribute("novalidate", true);
  }
};
</script>

<style scoped>
.SmInputRoot {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

.SmInputLabel {
  margin-bottom: 8px;
  display: block;
  margin-top: 0;
}
.SmInput {
  background: white;
  border: 1px solid black;
  padding-left: 16px;
  height: 40px;
  display: block;
  width: 100%;
}

.SmInput:focus,
.SmInput[type="search"]:focus {
  outline: none;
  box-shadow: 0 0 0 1px var(--primary);
  border: 1px solid var(--primary);
}

.SmInput:not(:focus):invalid {
  box-shadow: 0 0 0 1px #e7040f;
  border: 1px solid #e7040f;
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

.SmInput[type="search"] {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMzMzMzMgMTIuNjY2N0MxMC4yNzg5IDEyLjY2NjcgMTIuNjY2NyAxMC4yNzg5IDEyLjY2NjcgNy4zMzMzM0MxMi42NjY3IDQuMzg3ODEgMTAuMjc4OSAyIDcuMzMzMzMgMkM0LjM4NzgxIDIgMiA0LjM4NzgxIDIgNy4zMzMzM0MyIDEwLjI3ODkgNC4zODc4MSAxMi42NjY3IDcuMzMzMzMgMTIuNjY2N1oiIHN0cm9rZT0iIzE0MTYxOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNC4wMDAxIDE0TDExLjEwMDEgMTEuMSIgc3Ryb2tlPSIjMTQxNjE4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
  background-repeat: no-repeat;
  background-position: center right 8px;
}

.SmInput[type="search"]::-webkit-search-cancel-button {
  margin-right: 8px;
}

.SmInput[type="color"]:hover {
  cursor: pointer;
}

.SmInputRequired {
  color: #e7040f;
}

.SmInputError {
  color: #e7040f;
  text-align: right;
}
</style>
