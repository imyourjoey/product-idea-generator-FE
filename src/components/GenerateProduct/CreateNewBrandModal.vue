<template>
  <div class="card md:w-1/2 w-11/12">
    <div class="text-2xl font-semibold mb-4">Create New Brand</div>

    <n-form ref="formRef" :label-width="80" :model="formModel" :rules="rules">
      <n-form-item label="Brand Name" path="name" class="mb-2">
        <n-input
          v-model:value="formModel.name"
          placeholder="Enter brand name"
        />
      </n-form-item>

      <n-form-item label="Brand Description" path="description" class="mb-2">
        <n-input
          type="textarea"
          v-model:value="formModel.description"
          placeholder="Enter brand description"
          :rows="4"
        />
      </n-form-item>

      <div
        v-for="(product, index) in formModel.products"
        :key="index"
        class="mb-2 card"
      >
        <div style="margin-left: 2px">Product {{ index + 1 }}</div>
        <n-form-item label="Name" class="mb-1">
          <n-input
            v-model:value="product.name"
            placeholder="Enter product name"
          />
        </n-form-item>

        <n-form-item label=" Description" class="mb-1">
          <n-input
            type="textarea"
            v-model:value="product.description"
            placeholder="Enter product description"
            :rows="2"
          />
        </n-form-item>
      </div>

      <div class="mb-4">
        <n-button @click="addProduct" type="default" size="small">
          Add Product
        </n-button>
      </div>
    </n-form>

    <n-button @click="submitForm" type="primary" size="large">
      <span class="font-medium text-lg">Create Brand</span>
    </n-button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "@/utils/axios.js";
import { NForm, NFormItem, NInput, NButton } from "naive-ui";

// Reactive form model
const formModel = ref({
  name: "",
  description: "",
  products: [], // Initialize products as an empty array
});

// Validation rules
const rules = {
  name: {
    required: true,
    message: "Brand name is required",
    trigger: "blur",
  },
  description: {
    required: true,
    message: "Brand description is required",
    trigger: "blur",
  },
};

// Form reference
const formRef = ref(null);

// Method to add a new product field
const addProduct = () => {
  formModel.value.products.push({
    name: "",
    description: "",
  });
};

// Submit form handler with validation for products
const submitForm = async () => {
  try {
    // Check if any product fields are empty
    const hasEmptyFields = formModel.value.products.some(
      (product) => !product.name || !product.description
    );

    if (hasEmptyFields) {
      // Alert the user and stop form submission
      alert(
        "Make sure all product fields are filled in, or remove unwanted products."
      );
      return;
    }

    // Validate the form before submitting
    formRef.value.validate((errors) => {
      if (errors) {
        // Return early if there are validation errors
        return;
      }

      // Proceed with the submission if the form is valid
      axios
        .post("/api/brands", formModel.value)
        .then((response) => {
          alert("Brand created successfully!");
          emits("create-brand-success");
          // Optionally reset the form after successful creation
          formModel.value.name = "";
          formModel.value.description = "";
          formModel.value.products = []; // Reset products array
        })
        .catch((err) => {
          alert("Error creating brand:", err);
        });
    });
  } catch (err) {
    alert("Something went wrong:", err);
  }
};

// dismiss modal
const emits = defineEmits(["create-brand-success"]);
</script>
