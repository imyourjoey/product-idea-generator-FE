<template>
  <FlexRow class="justify-center mt-3 mb-3">
    <Button
      variant="custom"
      class="border border-r-0 border-gray-300 rounded-r-none text-icon-grey basis-1/3 text-sm"
      :class="pointsCount > 1 ? 'text-mulah-red' : ''"
      @click="subtractNumber"
    >
      <IconMinus />
    </Button>

    <div
      class="border border-l-0 border-r-0 border-gray-300 text-gray-900 basis-1/3 text-md text-center py-4 px-1"
    >
      {{ pointsCount }}
    </div>

    <Button
      variant="custom"
      class="border-l-0 border border-gray-300 rounded-l-none text-icon-grey basis-1/3 text-sm"
      :class="allowedIncrease ? 'text-mulah-red' : ''"
      @click="addNumber"
    >
      <IconAdd />
    </Button>
  </FlexRow>
</template>

<script setup>
import FlexRow from '@/components/layout/FlexRow.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import Button from './Button.vue'

import { ref, defineProps, watch } from 'vue'

const pointsCount = ref(Math.floor(props.redeemablePoints / props.rewardPoints))
const allowedIncrease = ref(false)

const props = defineProps({
  redeemablePoints: Number,
  rewardPoints: Number
})

function addNumber() {
  if ((pointsCount.value + 1) * props.rewardPoints <= props.redeemablePoints) {
    pointsCount.value += 1
  }
}

function subtractNumber() {
  if (pointsCount.value > 1) {
    pointsCount.value -= 1
  }
}

watch(pointsCount, (newValue) => {
  if ((newValue + 1) * props.rewardPoints <= props.redeemablePoints) {
    allowedIncrease.value = true
  } else {
    allowedIncrease.value = false
  }
})
</script>
