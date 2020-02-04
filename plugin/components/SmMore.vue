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
      :class="{ borderCut: expanded, borderFull: !expanded }"
      @click="expanded = !expanded"
    ></SmButton>
    <div v-if="expanded" class="options">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="option pv1"
        @click="
          $emit(option.replace(' ', '_').toLowerCase()), (expanded = false)
        "
      >
        <div class="ph2">{{ option }}</div>
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

.icon:focus {
  outline: none;
}

.borderFull,
.icon:hover {
  border: 1px solid white;
}

.borderFull:hover {
  border: 1px solid black;
}
.borderFull:focus {
  border: 1px solid black;
  outline-style: solid;
  outline-color: #0038ff;
  outline-width: 2px;
}

.borderCut,
.borderCut:hover {
  border-radius: 2px 2px 0px 0px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid white;
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
  min-height: 28px;
  cursor: pointer;
  line-height: 28px;
}

.option:hover {
  background: #0038ff;
  color: white;
}

.SmMore {
  position: relative;
  min-width: 128px;
}
</style>
