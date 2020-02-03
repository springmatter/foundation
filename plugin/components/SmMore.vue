<template>
  <div
    class="SmMore"
    :class="{ raiseZ: expanded }"
    @focusout="expanded = false"
  >
    <SmButton
      class="icon"
      kind="icon"
      icon="more-vertical"
      :class="{ iconBorder: expanded }"
      @click="expanded = !expanded"
    ></SmButton>
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
import SmButton from "./SmButton.vue";

export default {
  name: "SmMore",
  components: {
    SmIcon,
    SmButton
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
  margin-left: auto;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 9998;
}

.iconBorder {
  border-radius: 2px 2px 0px 0px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
}

.options {
  border-radius: 2px 0px 2px 2px;
  border: 1px solid black;
  background: white;
  position: absolute;
  right: 0;
  min-width: 80px;
  z-index: 50;
  transform: translateY(-1px);
}
.raiseZ {
  z-index: 9999;
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
  width: 100%;
}
</style>
