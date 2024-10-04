<template>
  <div class="card" style="width: 480px">
    <div class="text-2xl font-semibold text-center">Edit Product Detail</div>
    <div class="mt-4">Name</div>
    <n-input
      v-model:value="input.name"
      placeholder="Enter Product Name"
    ></n-input>
    <div class="mt-4">Description</div>

    <n-input
      v-model:value="input.description"
      type="textarea"
      placeholder="Enter Description"
    ></n-input>

    <n-button
      block
      type="primary"
      class="mt-4"
      :disabled="
        input.name == props.productInfo.name &&
        input.description == props.productInfo.description
      "
      @click="editProductDetail"
      >Edit</n-button
    >
  </div>
</template>

<script setup>
import { NInput, NButton } from "naive-ui";
import axios from "@/utils/axios.js";

import { ref, defineProps, watch, defineEmits } from "vue";

const input = ref({
  name: "",
  description: "",
});

const props = defineProps({
  productInfo: {
    type: Object,
    default: {},
    required: false,
  },
});

watch(
  () => props.productInfo,
  (newProductInfo) => {
    input.value.name = newProductInfo.name || "";
    input.value.description = newProductInfo.description || "";
  },
  { immediate: true }
);

const emits = defineEmits(["update-successful"]);

const editProductDetail = async () => {
  try {
    // Send POST request to the backend
    const response = await axios.put(
      "/api/products/" + props.productInfo.id,
      input.value
    );

    if (response.data.success) {
      emits("update-successful");
    }
  } catch (error) {
    alert(error);
  }
};
</script>
