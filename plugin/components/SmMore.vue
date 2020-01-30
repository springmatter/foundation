<template>
  <div class="SmMore" :class="{ raiseZ: expanded }" @focusout="expanded=false">
    <div
      class="icon right-0"
      kind="icon"
      :class="{ iconBorder: expanded }"
      @click="expanded = !expanded"
    >
      <SmIcon name="more-vertical" size="s" />
    </div>
    <div v-if="expanded" class="options">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="option pt-1 pb-1"
        @click="
          $emit(option.replace(' ', '_').toLowerCase()), (expanded = false)
        "
      >
        <div class="pl-2 pr-2">{{ option }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SmIcon from "./SmIcon.vue";

export default {
  name: "SmMore",
  components: {
    SmIcon
  },
  props: {
    /** A list of options to display on dropdown. */
    options: Array,
    required: true
  },
  data: function() {
    return {
      expanded: false
    };
  }
};
</script>

<style scoped>
.icon {
  background: white;
  border: 1px solid white;
  border-bottom: 0px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
}

.iconBorder {
  border-radius: 2px 2px 0px 0px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  z-index: 9999;
}

.options {
  border-radius: 2px 0px 2px 2px;
  border: 1px solid black;
  background: white;
  position: absolute;
  right: 0;
  min-width: 80px;
  transform: translateY(31px);
}
.raiseZ {
  z-index: 9998;
}
.option {
  border-radius: 0px;
  min-height: 32px;
  cursor: pointer;
}

.option:hover {
  background: var(--primary-hover);
  color: white;
}

.SmMore {
  position: relative;
  margin-left: auto;
  border: 1px solid green;
  min-width: 80px;
  width: 100%;
}
</style>