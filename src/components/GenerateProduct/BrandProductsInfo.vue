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
      :key="index"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-semibold">Product {{ index + 1 }}</div>

        <n-button @click="editProduct(product)" text size="small">
          <IconPen />
        </n-button>
      </div>

      <div class="text-gray-500">Name</div>
      <div class="mb-2">{{ product.name }}</div>

      <div class="text-gray-500">Description</div>
      <div class="mb-2">{{ product.description }}</div>
    </div>
  </div>

  <n-modal v-model:show="modalVisible" title="My Modal">
    <EditProductModal
      :productInfo="selectedProduct"
      @update-successful="handleUpdateSuccessful"
    />
  </n-modal>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import { NButton, NModal } from "naive-ui";
import IconPen from "../../svgicons/IconPen.vue";
import EditProductModal from "./EditProductModal.vue";

const modalVisible = ref(false);

// Define props to accept brandProducts
const props = defineProps({
  brandProducts: {
    type: Object,
    default: {},
    required: false,
  },
});

const selectedProduct = ref({});

const editProduct = (product) => {
  modalVisible.value = true;
  selectedProduct.value = product;
};

const emits = defineEmits(["update-successful"]);

function handleUpdateSuccessful() {
  modalVisible.value = false;
  emits("update-successful");
}
</script>
