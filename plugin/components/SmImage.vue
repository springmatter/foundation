<template>
  <img
    :src="src"
    class="SmImage"
    @load="srcLoading = false"
    :class="{ SmImageLoading: srcLoading || loading }"
    @click="$emit('click', $event)"
  />
</template>

<script>
export default {
  data: function() {
    return {
      srcLoading: true,
      outlineWidth: 1000
    };
  },
  props: {
    src: {
      required: true,
      type: String
    },
    loading: {
      required: false,
      type: Boolean
    }
  }
};
</script>

<style scoped>
.SmImageLoading {
  animation: glow 1s ease-in-out infinite alternate;
  outline-width: 1000px;
  outline-color: var(--gray);
  outline-style: solid;
  outline-offset: -1000px;
  padding: 0px;
}

@keyframes glow {
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.3;
  }
}
</style>
