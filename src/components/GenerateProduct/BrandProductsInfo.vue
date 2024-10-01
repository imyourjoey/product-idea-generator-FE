<template>
  <div class="card px-6 pb-6">
    <div class="text-xl font-semibold mb-2">Brand Profile</div>

    <div class="text-gray-500">Name</div>
    <div class="mb-2">{{ props.brandProducts.brand.name }}</div>

    <div class="text-gray-500">Description</div>
    <div class="mb-2">{{ props.brandProducts.brand.description }}</div>

    <div
      class="card mt-5"
      v-for="(product, index) in props.brandProducts.products"
    >
      <div class="text-lg font-semibold mb-2">Product {{ index + 1 }}</div>
      <div class="text-gray-500">Name</div>
      <div class="mb-2">{{ product.name }}</div>
      <div class="text-gray-500">Description</div>
      <div class="mb-2">{{ product.description }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  brandProducts: {
    type: Object,
    default: {},
    required: false,
  },
});
</script>
