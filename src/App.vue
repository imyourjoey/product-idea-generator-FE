<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <Navbar :key="currentRouteKey" />
    <div class="container">
      <router-view></router-view>
    </div>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from "naive-ui";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const currentRouteKey = computed(() => {
  return route.path;
});

import Navbar from "@/components/Navbar/Index.vue";

const themeOverrides = {
  common: {
    primaryColor: "#8A2BE2",
    primaryColorHover: "#9B42F5",
    primaryColorPressed: "#6E23B7",
  },
};
</script>

<style scoped>
.container {
  max-width: 1040px;
  margin: auto;
  padding: 0.5rem 2rem;
}
</style>
