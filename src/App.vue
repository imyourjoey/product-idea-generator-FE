<template>
  <Navbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar/Index.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const appClass = computed(() => {
  return route.path === "/" ? "full-width" : "max-width";
});
</script>

<style scoped>
.container {
  max-width: 1040px;
  margin: auto;
  padding: 0.5rem 2rem;
}
</style>
