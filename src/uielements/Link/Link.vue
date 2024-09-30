<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a
    :href="props.href ? props.href : '#'"
    class="font-medium"
    :class="[
      props.utils ? props.utils : '',
      props.type === 'button' ? linkBtn : linkStyle,
      isVariant
    ]"
  >
    <slot></slot>
  </a>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  href: {
    type: String
  },
  type: {
    type: String,
    default: 'link' //link or button
  },
  variant: {
    type: String,
    default: 'primary' //primary or mulah
  },
  utils: {
    type: String
  }
})

const linkStyle = 'text-blue-600 hover:underline'
const linkBtn = 'focus:ring-4 rounded-lg text-sm px-5 py-2.5 focus:outline-none'
const linkBtnBlue = 'text-white bg-blue-700 hover:bg-blue-800  focus:ring-blue-300'

const isVariant = computed(() => {
  return props.type === 'button' && props.variant === 'primary' ? linkBtnBlue : ''
})
</script>
