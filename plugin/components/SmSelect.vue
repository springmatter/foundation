<template>
  <div
    tabindex="2"
    class="SmSelect"
    @focusout="
      start && !disabled
        ? true
        : !start && disabled
        ? true
        : (expanded = false),
        check()
    "
  >
    <div
      class="selectionClass"
      :class="{ highlightSelection: expanded, grey: !selection.return }"
      @click="
        searchable && !expanded
          ? (expanded = true)
          : searchable
          ? (expanded = expanded)
          : (expanded = !expanded),
          !expanded ? (results = options) : true
      "
    >
      <div v-if="searchable && expanded" class="SmSearch">
        <SmSearch
          @focusin="disabled = true"
          @focusout="disabled = false"
          v-model="results"
          :options="options"
          @click.native.stop
        />
      </div>
      <div v-else class="selectBox">{{ selection.display }}</div>
      <SmButton
        :icon="expanded ? 'chevron-up' : 'chevron-down'"
        small
        kind="icon"
        class="chevron"
        @click="
          (expanded = !expanded),
            (disabled = true),
            !expanded ? (results = options) : true
        "
        @focusin="disabled = true"
        @focusout="disabled = false"
        @click.native.stop
      />
    </div>
    <div v-if="expanded" class="list">
      <div class="results">
        <div
          v-for="(result, index) in results"
          :key="index"
          :class="{
            resultClassSelected: multiple && result.selected,
            resultClass: !multiple || (multiple && !result.selected)
          }"
          @click="
            multiple ? selectMultiple(result, index) : select(result, index)
          "
        >
          {{
            displayKey ? result[displayKey] : multiple ? result["name"] : result
          }}
        </div>
        <div v-if="results.length == 0" class="noResult">No Results Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import SmSearch from "./SmSearch.vue";
import SmButton from "./SmButton.vue";

export default {
  name: "SmSelect",
  components: {
    SmSearch,
    SmButton
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
    },
    /** Flag to allow selecting multiple options. */
    multiple: {
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
      disabled: false,
      start: true
    };
  },
  methods: {
    check() {
      // !start && disabled ? (start = true) : (expanded = false)
      console.log("start", this.start);
      console.log("disabled", this.disabled);
      this.start = false;
    },
    test() {
      console.log("f");
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
    selectMultiple(result, index) {
      result.selected = !result.selected;
      let selection = this.displayKey
        ? result[this.displayKey]
        : result["name"];
      if (result.selected) {
        if (!this.selection.return) {
          this.selection.display = selection;
          this.selection.return = [];
        } else {
          this.selection.display = selection + ", " + this.selection.display;
        }
        this.selection.return.push(this.displayKey ? result : selection);
      } else {
        this.selection.return.splice(
          this.selection.return.indexOf(this.displayKey ? result : selection),
          1
        );
        if (this.selection.return.length == 0) {
          this.selection.return = null;
          this.selection.display = "Select...";
        }
        this.selection.display = this.selection.display.replace(
          selection + ", ",
          ""
        );
        this.selection.display = this.selection.display.replace(
          ", " + selection,
          ""
        );
        this.selection.display = this.selection.display.replace(selection, "");
      }
      this.$emit("input", this.selection.return);
      this.$forceUpdate();
    },
    reset() {
      this.results = this.options;
      if (this.multiple) {
        if (this.displayKey) {
          for (let i in this.results) {
            this.results[i].selected = false;
          }
        } else {
          for (let i in this.results) {
            this.results[i] = { name: this.results[i], selected: false };
          }
        }
      }
    }
  },
  created: function() {
    this.reset();
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
.list {
  box-shadow: 0 0 0 1px var(--secondary);
  border-radius: 0px 0px 2px 2px;
  color: black;
  background: white;
  margin-top: -2px;
  position: absolute;
  width: 100%;
  z-index: 9998;
}
.selectionClass {
  border: 1px solid var(--secondary);
  background: white;
  position: relative;
  padding: 8px 8px 8px 16px;
  user-select: none;
  display: flex;
  justify-content: space-between;
}
.selectionClass:hover,
.highlightSelection {
  border: 1px solid var(--primary-hover);
  box-shadow: 0 0 0 1px var(--primary-hover);
  z-index: 9999;
}
.selectBox {
  position: relative;
  height: 32px;
  line-height: 32px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-right: 8px;
}
::-webkit-scrollbar {
  width: 0em;
  height: 0em;
}
.chevron {
  position: relative;
  border: 1px solid white;
  flex-shrink: 0;
}
.SmSearch {
  width: 100%;
  margin-right: 8px;
  color: black;
}
.results {
  padding: 8px 0px 6px 0px;
  overflow: scroll;
  max-height: 296px;
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
  background: var(--primary-hover);
  color: white;
}
.resultClassSelected {
  padding: 4px 16px;
  border-radius: 0px;
  cursor: pointer;
  user-select: none;
  background: var(--primary-hover);
  color: white;
  margin-top: 2px;
  margin-bottom: 2px;
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
