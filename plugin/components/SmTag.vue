<template>
  <div class="SmTag" :style="{ border: '1px solid ' + hexColor }">
    <span class="SmTagDot" :style="{ background: hexColor }"></span>
    <small>
      <slot></slot>
    </small>
  </div>
</template>

<script>
export default {
  name: "SmTag",
  props: {
    /** The background color of the tag. Must be a valid hex color in one of the following forms: #123456, #123, 12345, or 123 */
    color: {
      type: String,
      required: true,
      validator: function(value) {
        return /(^#?[0-9A-Fa-f]{6}$)|(^#?[0-9A-Fa-f]{3}$)/i.test(value);
      }
    }
  },
  computed: {
    hexColor: function() {
      return this.color.charAt(0) === "#" ? this.color : "#" + this.color;
    }
  }
};
</script>

<style scoped>
.SmTag {
  border-radius: 100px;
  white-space: nowrap;
  padding: 4px 8px 4px 8px;
  display: inline-flex;
  align-items: center;
}

.SmTagDot {
  width: 8px;
  height: 8px;
  border-radius: 100px;
  margin-right: 8px;
}
</style>
