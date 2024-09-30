<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex w-full" v-for="(rowButtons, rowIndex) in buttons" :key="rowIndex">
      <button
        v-for="button in rowButtons"
        :key="button.label"
        class="py-4 basis-1/3 text-xl leading-relaxed bg-white text-gray-700 button-border"
        :class="button.class"
        :disabled="button.disabled"
        @click="
          button.label === ''
            ? emits('remove-last-character')
            : emits('number-clicked', button.label)
        "
      >
        <template v-if="button.rawHTML">
          <IconBackspace class="mx-auto" />
        </template>
        <template v-else>
          {{ button.label }}
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
import IconBackspace from '@/components/icons/IconBackspace.vue'
import { ref, defineEmits } from 'vue'
const buttons = ref([
  [
    { class: 'border-top border-left border-one', label: 1, disabled: false },
    { class: 'border-top', label: 2, disabled: false },
    { class: 'border-top border-right border-three', label: 3, disabled: false }
  ],
  [
    { class: 'border-left', label: 4, disabled: false },
    { class: '', label: 5, disabled: false },
    { class: 'border-right', label: 6, disabled: false }
  ],
  [
    { class: 'border-left border-bottom border-seven', label: 7, disabled: false },
    { class: '', label: 8, disabled: false },
    { class: 'border-right border-bottom border-nine', label: 9, disabled: false }
  ],
  [
    { class: 'special-border', label: '', disabled: true },
    { class: 'border-left border-right border-bottom border-zero', label: 0, disabled: false },
    { class: 'special-border', label: '', rawHTML: true, disabled: false }
  ]
])

const emits = defineEmits(['number-clicked', 'remove-last-character'])
</script>

<style scoped>
.bg-button {
  border: 0.6px solid #b7b7b7;
  color: black;
}

.bg-button-special {
  border: none;
}

.custom-width {
  width: 110px;
  font-size: 20px;
}

.special-border {
  border: none !important;
}

.border-top {
  border-top-width: 0.7px !important;
}

.border-left {
  border-left-width: 0.7px !important;
}

.border-bottom {
  border-bottom-width: 0.7px !important;
}

.border-right {
  border-right-width: 0.7px !important;
}

.border-one {
  border-top-left-radius: 8px;
}

.border-three {
  border-top-right-radius: 8px;
}

.border-seven {
  border-bottom-left-radius: 8px;
}

.border-nine {
  border-bottom-right-radius: 8px;
}

.border-zero {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.button-border {
  border: 0.3px solid rgb(179, 177, 177);
}
</style>
