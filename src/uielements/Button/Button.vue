<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    type="button"
    class="btn"
    :class="[
      props.utils ? props.utils : '',
      isSize,
      isVariant,
      isDisabled,
      props.vertical ? 'flex-col' : ''
    ]"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md' //xs, sm, md, lg, xl
  },
  variant: {
    type: String,
    default: 'primary' //primary, custom or mulah
  },
  utils: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: [Boolean, String],
    default: false
  },
})

const isSize = computed(() => {
  if (props.variant === 'custom') return ''
  else if (props.size === 'xs') return 'text-xs px-3 py-2'
  else if (props.size === 'sm') return 'px-3 py-2 text-sm'
  else if (props.size === 'md') return 'px-5 py-2.5 text-sm'
  else if (props.size === 'lg') return 'px-5 py-3 text-base'
  else return 'px-5 py-3.5 text-base'
})

const isVariant = computed(() => {
  if (props.variant === 'primary') return 'btn-primary'
  else if (props.variant === 'mulah') return 'btn-mulah '
  else if (props.variant === 'custom') return ''
  else if (props.variant === 'outline') return 'btn-outline'
  else if (props.variant === 'outline-primary') return 'btn-outline-primary'
  else if (props.variant === 'outline-mulah') return 'btn-outline-mulah'
  else if (props.variant === 'outline-secondary') return 'btn-outline-secondary'
  else if (props.variant === 'outline-tertiary') return 'btn-outline-tertiary'
  else return ''
})

const isDisabled = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
})
</script>
