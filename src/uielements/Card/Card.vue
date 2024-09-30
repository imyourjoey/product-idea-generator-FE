<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card" :class="props.utils">
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  utils: {
    type: String,
    default: ''
  }
})
</script>
