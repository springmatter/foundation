<template>
  <div v-if="dataCopy" class="SmSearchSelect" @click="$event.stopPropagation()">
    <SmSearch
      class="SmSearchSelectSearch"
      v-model="dataCopy"
      :label="label"
      @focus="focus()"
      ref="Search"
    />
    <span v-if="selected && showSelected" class="SmSearchSelectSelected">
      {{ dkeys ? selected[dkeys[0]] : selected }}
      <small v-if="dkeys" class="SmSearchSelectSecondary">
        {{ selected[dkeys[1]] }}
      </small>
    </span>
    <ul
      class="SmSearchSelectList"
      v-if="open"
      :style="{ maxHeight: maxItems * 32 + 'px' }"
    >
      <li
        v-for="(item, index) in dataCopy"
        :key="index"
        @click="setValue(item)"
        class="SmSearchSelectItem"
      >
        {{ dkeys ? item[dkeys[0]] : item }}
        <small v-if="dkeys && dkeys.length > 1" class="SmSearchSelectSecondary">
          {{ item[dkeys[1]] }}
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
import SmSearch from "./SmSearch.vue";

export default {
  components: { SmSearch },
  props: {
    /** Defined only to enable `v-model`. Use `v-model` instead. `v-model` will correspond to the selected value */
    value: {
      type: [String, Number]
    },
    /** the data list to search over. can be an array of strings, numbers or objects */
    data: {
      type: Array
    },
    /** REQUIRED if the data list is an array objects. One or two space-separated keys that contain display text. The first will be the primary display text and the second will be greyed out secondary text. Both keys must lead to strings or numbers.  */
    displayKeys: {
      type: String
    },
    /** REQUIRED if the data list is an array of objects. The value corresponding to this key will be returned via `v-model` when an object is selected.  */
    valueKey: {
      type: String
    },
    /** the maximum number of items to be displayed in the dropdown */
    maxItems: {
      type: Number,
      default: 7,
      validator: maxItems => maxItems > 0
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      dataCopy: null,
      input: false,
      selected: null,
      showSelected: false,
      open: false
    };
  },
  computed: {
    dkeys() {
      if (this.displayKeys !== undefined) {
        return this.displayKeys.split(" ");
      } else {
        return false;
      }
    }
  },
  methods: {
    setValue(item) {
      let val = this.valueKey === undefined ? item : item[this.valueKey];
      this.$emit("input", val);
      this.showSelected = true;
      this.selected = item;
      this.$refs.Search.filter = "";
      this.open = false;
    },
    display(item) {
      return this.displayKey === undefined ? item : item[this.displayKey];
    },
    focus() {
      this.open = true;
      this.showSelected = false;
    }
  },
  mounted() {
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    if (this.value && this.valueKey) {
      this.selected = this.dataCopy.find(e => e[this.valueKey] === this.value);
      this.showSelected = true;
    } else if (this.value) {
      this.selected = this.value;
    }

    document.addEventListener("click", () => {
      if (this.selected) {
        this.showSelected = true;
      }
      this.open = false;
    });
  }
};
</script>

<style scoped>
.SmSearchSelect {
  position: relative;
}

.SmSearchSelectItem {
  list-style-type: none;
  cursor: pointer;
  height: 32px;
  border-radius: 0;
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.SmSearchSelectSearch::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>');
}

.SmSearchSelectList {
  margin: 0;
  padding: 0;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: -1px;
  overflow-y: scroll;
}

.SmSearchSelectItem:hover {
  background: var(--primary);
  color: white;
}

.SmSearchSelectItem:hover > .SmSearchSelectSecondary {
  color: white;
}

.SmSearchSelectSelected {
  position: absolute;
  display: flex;
  align-items: center;
  background: white;
  min-width: 60px;
  height: 30px;
  top: 1px;
  left: 10px;
}

.SmSearchSelectSecondary {
  color: var(--gray);
  margin-left: 4px;
  margin-top: 2px;
  font-style: italic;
  /* font-weight: 400; */
}
</style>