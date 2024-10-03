<template>
  <div class="text-3xl font-bold mt-3">Your Product Idea is Ready!</div>
  <div
    class="text-sm text-gray-500 mb-3 mt-2 text-right flex justify-end align-center"
  >
    - crafted with <IconHeartFill class="mx-1" width="14" /> by the Produck.ai
    team
  </div>

  <div class="card">
    <div class="text-gray-500">Product Name</div>
    <div class="mb-4">{{ props.response.productName }}</div>

    <div class="text-gray-500">Description</div>
    <div class="mb-4">{{ props.response.description }}</div>

    <div class="text-gray-500">Unique Selling Point</div>
    <div class="mb-4">{{ props.response.uniqueSellingPoint }}</div>

    <div class="text-gray-500">Target Market</div>
    <div class="mb-4">{{ props.response.targetMarket }}</div>

    <div class="text-gray-500">Estimated Manufacturing Cost (Per Unit)</div>
    <div class="mb-4">USD {{ props.response.estimatedCost }}</div>

    <div class="text-gray-500">Estimated Selling Price (Per Unit)</div>
    <div class="mb-4">USD {{ props.response.estimatedSellingPrice }}</div>

    <div class="text-gray-500">Estimated Units Sold Per Month</div>
    <div class="mb-4">
      {{ props.response.estimatedUnitsSoldPerMonth }} units
    </div>

    <div class="text-gray-500">Product Image</div>
    <div class="mb-4" style="min-height: 100px">
      <div v-if="isLoadingImage" class="flex justify-center items-center h-64">
        <n-spin size="large">
          <template #description>
            <div class="text-center">
              <div class="text-md text-[#8a2be1]">Hang in there...</div>
              <div class="text-md text-[#8a2be1]">
                We are generating your product image!
              </div>
            </div>
          </template>
        </n-spin>
      </div>
      <img
        :src="imageUrl"
        alt="Generating Image..."
        class="rounded-xl"
        @load="handleImageLoaded"
        @error="handleImageError"
      />
    </div>
  </div>

  <n-button @click="reset" block type="primary" class="my-4"
    >Generate a New Product Idea</n-button
  >
</template>

<script setup>
import { NButton, NSpin } from "naive-ui";
import { defineProps, defineEmits, ref } from "vue";
import IconHeartFill from "../../svgicons/IconHeartFill.vue";

const emits = defineEmits(["reset"]);

const props = defineProps({
  response: {
    type: Object,
    default: {},
    required: false,
  },
  imageUrl: {
    type: String,
    default: "",
    required: false,
  },
});

function reset() {
  emits("reset");
}
const isLoadingImage = ref(true);

function handleImageLoaded() {
  isLoadingImage.value = false;
}

function handleImageError() {
  isLoadingImage.value = false;
  console.error("Failed to load image");
}
</script>
