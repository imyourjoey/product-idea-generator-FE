<template>
  <div class="w-full bg-gray-200 rounded-full h-2.5">
    <div
      class="h-2.5 rounded-full"
      style="background-color: #ff0000"
      :style="{ width: getWidth }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 100
  }
})

const getWidth = computed(() => {
  return props.width + '%'
})
</script>
