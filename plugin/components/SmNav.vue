<template>
  <nav id="SmNav">
    <router-link to="/" class="SmNavLink">
      {{ title }}
    </router-link>
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.route"
      class="SmNavLink"
    >
      <SmIcon :name="link.icon" size="s" />
    </router-link>
  </nav>
</template>

<script>
import SmIcon from "./SmIcon.vue";

export default {
  name: "SmApp",
  components: { SmIcon },
  props: {
    /** The title of your app. Appears in the top left of the nav bar. */
    title: {
      type: String,
      required: true
    },
    /** All of the links in your nav bar specified as an array of objects with keys `icon` and `route` */
    links: {
      type: Array,
      required: false,
      validator: function(value) {
        for (let link of value) {
          if (!link.icon || !link.route) {
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
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 0 8px;
  font-size: 14px;
  letter-spacing: 8%;
  font-weight: 600;
  display: flex;
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
  transition: border 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.SmNavLink:hover {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}
</style>
