<template>
  this is Products.vue
  <hr />
  <br />
  {{ responseData }}
</template>

<script setup>
import axios from "@/utils/axios.js";
import { ref, onMounted } from "vue";
const responseData = ref(null);

const getProducts = async () => {
  axios
    .get("/api/products", {})
    .then((response) => {
      responseData.value = response.data.data;
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

onMounted(() => {
  getProducts();
});
</script>
