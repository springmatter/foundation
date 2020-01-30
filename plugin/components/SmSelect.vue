<template>
  <div class="SmSelect">
    <div
      class="selectionClass"
      :class="{highlightSelection: expanded, grey: !selection.return}"
      @click="searchable && !expanded ? expanded = true: (searchable ? expanded = expanded : expanded = !expanded), 
       !expanded ? results=options : true"
    >
      <div v-if="searchable && expanded" class="SmSearch">
        <SmSearch autofocus v-model="results" :options="options" />
      </div>
      <div v-else class="selectBox">{{ selection.display }}</div>
      <div
        class="chevron"
        @click="expanded=!expanded, !expanded ? results=options : true"
        @click.stop
      >
        <SmIcon :class="{ chevronRotate: expanded }" name="chevron-down" />
      </div>
    </div>
    <div v-if="expanded" class="list">
      <div class="results">
        <div
          v-for="(result, index) in results"
          :key="index"
          class="resultClass"
          @click="select(result, index)"
        >{{ displayKey ? result[displayKey] : result }}</div>
        <div v-if="results.length == 0" class="noResult">No Results Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import SmSearch from "./SmSearch.vue";
import SmIcon from "./SmIcon.vue";

export default {
  name: "SmSelect",
  components: {
    SmSearch,
    SmIcon
  },
  props: {
    /** An array of Strings or Objects from which to select. */
    options: {
      type: Array,
      required: true
    },
    /** Flag to provide search functionality over the provided options. */
    searchable: {
      type: Boolean,
      required: false
    },
    /** Required if the 'options' is a list of Objects, such that this key will access the value in each option to display. */
    displayKey: {
      type: String,
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
      results: []
    };
  },
  methods: {
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
.list {
  box-shadow: 0 0 0 1px var(--secondary);
  border-radius: 0px 0px 2px 2px;
  color: black;
  background: white;
  margin-top: -2px;
  position: absolute;
  width: 100%;
  z-index: 9997;
}
.selectBox {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.selectionClass {
  border: 1px solid var(--secondary);
  background: white;
  position: relative;
  padding: 8px 16px;
  user-select: none;
  height: 48px;
  z-index: 9998;
}
.selectionClass:hover {
  border: 1px solid var(--primary-hover);
  box-shadow: 0 0 0 1px var(--primary-hover);
}
.highlightSelection {
  border: 1px solid var(--primary-hover);
  box-shadow: 0 0 0 1px var(--primary-hover);
}
.chevron {
  position: relative;
  float: right;
  top: 50%;
  transform: translateY(-50%);
  color: black;
  z-index: 9999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
.chevronRotate {
  transform: rotate(180deg);
}
.SmSearch {
  position: absolute;
  border-radius: 0px;
  width: 100%;
  padding-right: 60px;
  padding-left: 16px;
  top: 50%;
  left: 0;
  color: black;
  transform: translateY(-50%);
}
.results {
  padding: 8px 0px;
  overflow: scroll;
  max-height: 352px;
}
.resultClass {
  padding: 4px 16px;
  border-radius: 0px;
  cursor: pointer;
  user-select: none;
}
.resultClass:hover {
  background: var(--primary-hover);
  color: white;
}
.noResult {
  color: grey;
  text-align: center;
}
.grey {
  color: grey;
}
</style>