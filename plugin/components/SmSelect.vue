<template>
  <div tabindex="3" class="SmSelect" id="SmSelect" @focusout="focusOut">
    <input
      v-if="searchable && !selection.return"
      autocomplete="off"
      placeholder="Select..."
      class="selectionClass w-100"
      :class="{ highlightSelection: expanded, raiseZ: expanded }"
      @click="
        !expanded
          ? ((results = options), (selection.return = null), (expanded = true))
          : (expanded = false),
          results.length == 0 ? (filter = '') : true
      "
      v-model="filter"
      @keyup="filterResults"
      id="input"
      value="value"
    />
    <input
      v-else-if="searchable && selection.return"
      class="selectionClass w-100"
      autocomplete="off"
      @click="
        !expanded
          ? ((results = options),
            (selection.return = null),
            (expanded = true),
            (filter = selection.display))
          : (expanded = false)
      "
      :value="selection.display"
    />
    <div
      v-else
      class="selectionClass"
      :class="{
        highlightSelection: expanded,
        grey: !selection.return,
        raiseZ: expanded
      }"
      @click="expanded = !expanded"
    >
      {{ selection.display }}
    </div>
    <SmIcon
      class="chevron"
      :class="{ raiseZ: expanded }"
      :name="expanded ? 'chevron-up' : 'chevron-down'"
    />
    <div v-if="expanded" class="results">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="resultClass"
        @click="select(result, index)"
      >
        {{ displayKey ? result[displayKey] : result }}
      </div>
      <div v-if="results.length == 0" class="noResult">No Results Found</div>
    </div>
  </div>
</template>

<script>
import SmIcon from "./SmIcon.vue";
import * as Fuse from "fuse.js";

export default {
  name: "SmSelect",
  components: {
    SmIcon
  },
  props: {
    /** An array of Strings or Objects from which to select. */
    options: {
      type: Array,
      required: true
    },
    /** Required if the 'options' is a list of Objects, such that this key will access the value in each option to display. */
    displayKey: {
      type: String,
      required: false
    },
    /** Flag to provide search functionality over the provided options. */
    searchable: {
      type: Boolean,
      required: false
    }
  },
  data: function() {
    return {
      expanded: false,
      selection: {
        display: "Select...",
        return: null
      },
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
    focusOut(ev) {
      if (!this.$el.contains(ev.relatedTarget)) {
        this.expanded = false;
        if (this.results.length == 0) {
          this.filter = "";
        }
      }
    },
    select(result, index) {
      if (this.displayKey) {
        this.selection.display = result[this.displayKey];
        this.selection.return = this.options[index];
      } else {
        this.selection.display = result;
        this.selection.return = result;
      }
      this.$emit("input", this.selection.return);
      this.results = this.options;
      this.expanded = false;
    },
    filterResults() {
      if (!this.expanded) {
        this.expanded = true;
      }
      // If filter is empty, return all results
      if (this.filter == "") {
        this.results = this.options;
      } else {
        this.results = this.fuse.search(this.filter);
        // If list is a string, access indexed values.
        if (!this.displayKey) {
          for (var i = 0; i < this.results.length; i++) {
            this.results[i] = this.options[this.results[i]];
          }
        }
      }
    }
  },
  created: function() {
    this.results = this.options;
  }
};
</script>

<style scoped>
.SmSelect {
  position: relative;
  width: 100%;
}
.SmSelect:focus {
  outline: none !important;
}
.selectionClass {
  border: 1px solid black;
  background: white;
  position: relative;
  padding: 8px 32px 8px 16px;
  user-select: none;
  display: flex;
  min-height: 40px;
  line-height: 22px;
  justify-content: space-between;
}
.selectionClass:hover,
.highlightSelection {
  border: 1px solid #0038ff;
  box-shadow: 0 0 0 1px #0038ff;
}

.chevron {
  position: absolute;
  border: 1px solid white;
  top: 0;
  right: 0;
  z-index: 9992;
  margin: 10px 8px;
  pointer-events: none;
}
.results {
  box-shadow: 0 0 0 1px black;
  border-radius: 0px 0px 2px 2px;
  color: black;
  background: white;
  margin-top: -2px;
  position: absolute;
  width: 100%;
  z-index: 9993;
  padding: 8px 0px 6px 0px;
  overflow: scroll;
  max-height: 296px;
}
.raiseZ {
  z-index: 9999;
}
.resultClass {
  padding: 4px 16px;
  border-radius: 0px;
  cursor: pointer;
  user-select: none;
  margin-top: 2px;
  margin-bottom: 2px;
}
.resultClass:hover {
  background: #0038ff;
  color: white;
}
.noResult {
  color: grey;
  text-align: center;
  padding: 6px;
}
.grey {
  color: grey;
}
</style>
