<template>
  <h2 :id="props.headingId">
    <button
      type="button"
      class="flex items-center w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl bg-inherit focus:outline-none"
      :class="props.utils"
      :data-accordion-target="'#' + props.collapseId"
      data-accordion-toggle="true"
      aria-expanded="false"
      :aria-controls="props.collapseId"
    >
      <span class="text-primary-black font-bold">
        <slot></slot>
      </span>
      <svg
        data-accordion-icon
        class="w-3 h-3 shrink-0 transition ease-in-out duration-300 focus:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="#717171"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>
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
  }
})
</script>
