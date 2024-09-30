<template>
  <div :id="props.accordianId" data-accordion="collapse">
    <slot></slot>
  </div>
</template>
<script setup>
import { initFlowbite } from 'flowbite'
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  accordianId: {
    type: String,
    default: 'accordion-1'
  }
})

onMounted(() => {
  initFlowbite()
})
</script>
