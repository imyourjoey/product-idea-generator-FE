<template>
  <div :id="props.collapseId" :class="props.display" :aria-labelledby="props.headingId">

    <div class="p-5 border border-y-0 border-gray-200" :class="props.utils">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headingId: {
    type: String,
    default: 'accordion-collapse-heading-1'
  },
  collapseId: {
    type: String,
    default: 'accordion-collapse-body-1'
  },
  utils: {
    type: String,
    default: ''
  },
  display: {
    type: String,
    default: 'hidden'
  }
})
</script>
