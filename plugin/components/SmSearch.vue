<template>
  <div>
    <SmInput
      type="search"
      autofocus
      class="SmSearch"
      v-model="filter"
      placeholder="Search"
      @keyup="filterResults"
      @search="filterResults"
    />
  </div>
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
</style>
