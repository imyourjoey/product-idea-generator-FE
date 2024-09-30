<template>
  <div>
    <p>email</p>
    <input type="text" v-model="formData.email" />
    <p>password</p>
    <input type="text" v-model="formData.password" />
  </div>
  <br />
  <button
    @click="login"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Submit
  </button>

  <br />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios.js";
const formData = ref({
  email: "your-email@example.com",
  password: "yourpassword",
});
const responseData = ref(null);

const login = async () => {
  try {
    const response = await axios.post("/api/login", formData.value);
    responseData.value = response.data;
    localStorage.setItem("token", response.data.data.token);
  } catch (err) {
    console.error("Error submitting data:", err);
  }
};
</script>
