<template>
  <div>
    <input
      type="search"
      class="SmSearch"
      v-model="filter"
      placeholder="Search"
      @keyup="filterResults"
      @search="filterResults"
    />
  </div>
</template>

<script>
import SmIcon from "./SmIcon.vue";
import * as Fuse from "fuse.js";
export default {
  name: "SmSearch",
  props: {
    /** An list of Strings or Objects to search. */
    options: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      results: [],
      filter: ""
    };
  },
  computed: {
    settings: function() {
      // Check if 'options' is a list of strings or dictionaries to set correct keys.
      let keys =
        typeof this.options[0] == "string" ? [] : Object.keys(this.options[0]);
      return {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: keys
      };
    },
    fuse: function() {
      return new Fuse(this.options, this.settings);
    }
  },
  methods: {
    filterResults() {
      // If filter is empty, return all results
      if (this.filter == "") {
        this.results = this.options;
      } else {
        this.results = this.fuse.search(this.filter);
        // If list is a string, access indexed values.
        if (typeof this.options[0] == "string") {
          for (var i = 0; i < this.results.length; i++) {
            this.results[i] = this.options[this.results[i]];
          }
        }
      }
      this.$emit("input", this.results);
    }
  }
};
</script>

<style scoped>
.SmSearch {
  position: relative;
  width: 100%;
}
</style>