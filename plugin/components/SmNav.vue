<template>
  <nav id="SmNav">
    <router-link
      to="/"
      class="SmNavLink"
      :class="{ SmNavLinkCurrent: $route.path === '/' }"
    >
      {{ title }}
    </router-link>
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.route"
      class="SmNavLink"
      :class="{ SmNavLinkCurrent: $route.path.includes(link.route) }"
    >
      <SmIcon :name="link.icon" size="s" />
      <small class="SmNavLinkTooltip">{{ link.tooltip }}</small>
    </router-link>
  </nav>
</template>

<script>
import SmIcon from "./SmIcon.vue";

export default {
  components: { SmIcon },
  props: {
    /** The title of your app. Appears in the top left of the nav bar. */
    title: {
      type: String,
      required: true
    },
    /** All of the links in your nav bar specified as an array of objects with keys for `icon`, `route`, `tooltip` */
    links: {
      type: Array,
      required: false,
      validator: function(value) {
        for (let link of value) {
          if (!link.icon || !link.route || !link.tooltip) {
            return false;
          }
        }

        return true;
      }
    }
  }
};
</script>

<style scoped>
#SmNav {
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
}

.SmNavLink {
  height: 40px;
  min-width: 40px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  border-radius: 0;
  transition: transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
}

.SmNavLink:hover {
  color: var(--primary);
  transform: translateY(-2px);
}

.SmNavLinkTooltip {
  min-height: 32px;
  white-space: nowrap;
  padding: 0 8px;
  background: black;
  color: white;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: none;
  bottom: -30px;
  font-weight: 400;
  z-index: 10000;
}

.SmNavLinkTooltip::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
  border-radius: 0;
}

.SmNavLink:hover .SmNavLinkTooltip {
  display: flex;
}

.SmNavLinkCurrent {
  border-bottom: 1px solid black;
}
</style>
