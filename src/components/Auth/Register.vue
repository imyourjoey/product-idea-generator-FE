<template>
  <n-form
    ref="formRef"
    :label-width="100"
    :model="formValue"
    :rules="rules"
    :size="size"
    class="w-full md:w-1/2"
  >
    <n-form-item label="Name" path="name" class="mb-4">
      <n-input v-model:value="formValue.name" placeholder="Input Name" />
    </n-form-item>

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

    <n-form-item label="Confirm Password" path="c_password" class="mb-4">
      <n-input
        v-model:value="formValue.c_password"
        type="password"
        placeholder="Confirm Password"
      />
    </n-form-item>

    <n-button @click="register" color="#8a2be2">Register</n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/utils/axios.js";
import { NFormItem, NForm, NInput, NButton } from "naive-ui";

// Form data with name, email, password, and confirmed password fields
const emptyFormValue = {
  name: "",
  email: "",
  password: "",
  c_password: "",
};

const formValue = ref({
  name: "",
  email: "",
  password: "",
  c_password: "",
});

// Ref for form element
const formRef = ref(null);

// Register function to validate the form and submit data
const register = async () => {
  try {
    // Validate the form before submitting
    formRef.value.validate((errors) => {
      if (errors) {
        // Return early if there are validation errors
        return;
      }

      // Proceed with the submission if the form is valid
      axios
        .post("/api/register", formValue.value)
        .then((response) => {
          alert("Registration successful!");
        })
        .catch((err) => {
          alert(err.response.data.message);
          formValue.value = emptyFormValue;
        });
    });
  } catch (err) {
    alert("Something went wrong:", err);
  }
};

// Validation rules
const rules = {
  name: {
    required: true,
    message: "Please input your name",
    trigger: "blur",
  },
  email: {
    required: true,
    trigger: "blur",
    validator: (rule, value) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        return new Error("Please enter a valid email address");
      }
      return true;
    },
  },
  password: {
    required: true,
    trigger: "blur",
    validator: (rule, value) => {
      if (value.length < 8) {
        return new Error("Password must be at least 8 characters long");
      }
      return true;
    },
  },
  c_password: {
    required: true,
    trigger: "blur",
    validator: (rule, value) => {
      if (value !== formValue.value.password) {
        return new Error("Passwords do not match");
      }
      return true;
    },
  },
};

// Example size property for form components
const size = ref("medium");
</script>
