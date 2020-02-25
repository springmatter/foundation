<template>
  <div class="SmLoading" :class="{ small: small }"></div>
</template>

<script>
export default {
  props: {
    /** Makes the spinner small for use inside other components */
    small: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.SmLoading:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  margin-top: -16px;
  margin-left: -16px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #000;
  animation: spinner 0.6s linear infinite;
}

.SmLoading.small:before {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
}
</style>
