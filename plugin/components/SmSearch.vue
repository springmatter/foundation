<template>
  <SmInput
    type="search"
    autofocus
    class="SmSearch"
    v-model="filter"
    placeholder="Search"
    @keyup="filterResults"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    :label="label"
    :disabled="disabled"
  />
</template>

<script>
import SmInput from "./SmInput.vue";
import * as Fuse from "fuse.js";

export default {
  components: {
    SmInput
  },
  props: {
    /** Defined only to enable `v-model`. Use `v-model` instead. */
    value: {
      type: Array
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  data: function() {
    return {
      results: [],
      original: null,
      filter: ""
    };
  },
  computed: {
    fuse: function() {
      if (this.original) {
        return new Fuse(this.original, {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys:
            typeof this.original[0] === "string"
              ? []
              : Object.keys(this.original[0])
        });
      } else {
        return null;
      }
    }
  },
  methods: {
    filterResults() {
      // If filter is empty, return all results
      if (this.fuse && this.filter !== "") {
        this.results = this.fuse.search(this.filter);
        // If list is a string, access indexed values.
        if (typeof this.original[0] === "string") {
          for (var i = 0; i < this.results.length; i++) {
            this.results[i] = this.original[this.results[i]];
          }
        }
      } else {
        this.results = this.original;
      }
      this.$emit("input", this.results);
    }
  },
  mounted: function() {
    this.original = this.value;
  }
};
</script>

<style scoped>
.SmSearch {
  position: relative;
  width: 100%;
}

.SmSearch::before {
  content: "";
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMzMzMzMgMTIuNjY2N0MxMC4yNzg5IDEyLjY2NjcgMTIuNjY2NyAxMC4yNzg5IDEyLjY2NjcgNy4zMzMzM0MxMi42NjY3IDQuMzg3ODEgMTAuMjc4OSAyIDcuMzMzMzMgMkM0LjM4NzgxIDIgMiA0LjM4NzgxIDIgNy4zMzMzM0MyIDEwLjI3ODkgNC4zODc4MSAxMi42NjY3IDcuMzMzMzMgMTIuNjY2N1oiIHN0cm9rZT0iIzE0MTYxOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNC4wMDAxIDE0TDExLjEwMDEgMTEuMSIgc3Ryb2tlPSIjMTQxNjE4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
  background-repeat: no-repeat;
  background-position: center right 8px;
}
</style>
