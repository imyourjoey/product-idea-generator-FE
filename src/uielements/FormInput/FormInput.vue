<template>
  <input
    type="text"
    class="border border-gray-300 text-gray-900 text-sm rounded-xl focus:border-blue-600 w-full p-3 focus:ring-0 ring-offset-0"
    :value="props.modelValue"
    :class="{ 'bg-[#f1f1f1]': props.disabled }"
    :disabled="props.disabled"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>
