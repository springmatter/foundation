<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="SmIcon"
    :class="size"
    v-html="iconCode"
  ></svg>
</template>

<script>
import feather from "feather-icons";

export default {
  props: {
    /** The name of the feather icon you'd like to use */
    name: {
      type: String,
      required: true,
    },
    /** size of the icon (s|m|l) */
    size: {
      type: String,
      default: "m",
      required: false,
      validator: function(value) {
        return ["s", "m", "l"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    iconCode: function() {
      return feather.icons[this.name].toString();
    },
  },
};
</script>

<style scoped>
.SmIcon {
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: inherit;
  display: inline;
}

.SmIcon.s {
  width: 16px;
  height: 16px;
}

.SmIcon.m {
  width: 20px;
  height: 20px;
}

.SmIcon.l {
  width: 24px;
  height: 24px;
}
</style>
