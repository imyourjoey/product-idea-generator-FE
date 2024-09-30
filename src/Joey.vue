<template>
  <div>
    <p class="mt-10">email</p>
    <input type="text" v-model="formData.email" />
    <p>password</p>
    <input type="text" v-model="formData.password" />
  </div>
  <br />
  <button @click="submitData">Submit</button>

  <br />
  Login Successful : {{ loginSuccessful }}
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios.js";
const formData = ref({
  email: "your-email@example.com",
  password: "yourpassword",
});
const responseData = ref(null);

const loginSuccessful = ref(false);

const submitData = async () => {
  try {
    const response = await axios.post("/api/login", formData.value);
    responseData.value = response.data;
  } catch (err) {
    console.error("Error submitting data:", err);
  }
};
</script>
