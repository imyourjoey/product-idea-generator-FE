<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
    class="w-full md:w-1/2"
  >
    <n-form-item label="Email" path="email" class="mb-4">
      <n-input v-model:value="formValue.email" placeholder="Input Email" />
    </n-form-item>
    <n-form-item label="Password" path="password" class="mb-4">
      <n-input
        v-model:value="formValue.password"
        type="password"
        placeholder="Input Password"
      />
    </n-form-item>
  </n-form>

  <n-button @click="login" color="#8a2be2">Submit</n-button>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/utils/axios.js";
import { NFormItem, NForm, NInput, NButton } from "naive-ui";

// Form data with email and password fields
const formValue = ref({
  email: "",
  password: "",
});

// To store response data
const responseData = ref(null);

// Ref for form element
const formRef = ref(null);

// Login function to validate the form and submit data
const login = async () => {
  try {
    // Validate the form before submitting
    formRef.value.validate((errors) => {
      if (errors) {
        // Return early if there are validation errors
        return;
      }

      // Proceed with the submission if the form is valid
      axios
        .post("/api/login", formValue.value)
        .then((response) => {
          responseData.value = response.data;
          localStorage.setItem("token", response.data.data.token);
          alert("Login successful!");
        })
        .catch((err) => {
          alert("Error submitting data:", err);
        });
    });
  } catch (err) {
    alert("Something went wrong:", err);
  }
};

// Validation rules
const rules = {
  email: {
    required: true,
    message: "Please input your email",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "Please input your password",
    trigger: "blur",
  },
};

// Example size property for form components
const size = ref("medium");
</script>
