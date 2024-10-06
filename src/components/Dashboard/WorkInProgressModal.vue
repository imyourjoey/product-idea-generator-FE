<template>
  <div class="card" style="width: 480px">
    <IconCross
      @click="emits('dismiss-modal')"
      class="cursor-pointer"
      style="position: absolute; right: 12; top: 12"
      width="25"
      height="25"
    />
    <WorkInProgress width="300" height="200" class="mx-auto" />
    <div class="text-2xl font-semibold text-center mt-1">
      Work in progress...
    </div>

    <div class="text-center mt-2 mb-4 px-2 text-gray-500">
      What you see here is a demo UI showcasing the feature design, but it
      doesn't have any functionality just yet. Stay Tuned!
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import WorkInProgress from "./WorkInProgress.vue";
import IconCross from "../../svgicons/IconCross.vue";

const emits = defineEmits(["dismiss-modal"]);
</script>
