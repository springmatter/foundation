<template>
  <div class="SmModal">
    <div class="SmModalWindow">
      <slot></slot>
      <SmButton
        kind="icon"
        icon="x"
        class="SmModalClose"
        @click="$emit('close')"
      />
    </div>
    <div class="SmModalOverlay"></div>
  </div>
</template>

<script>
import SmButton from "./SmButton.vue";
export default {
  components: { SmButton }
};
</script>

<style scoped>
.SmModalOverlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: black;
  opacity: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  z-index: 990;
}

.SmModalWindow {
  position: fixed;
  margin: 0 auto;
  padding: 32px;
  left: 0;
  right: 0;
  top: 20%;
  min-width: 320px;
  max-width: 480px;
  min-height: 208px;
  max-height: 560px;
  background: white;
  z-index: 999;
}

.SmModalClose,
.SmModalClose:hover {
  border: 0;
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px;
}
</style>
