<template>
  <n-space justify="space-between" class="px-4 py-2 bg-slate-950">
    <div
      class="flex items-center select-none cursor-pointer"
      @click="!userName ? navigateTo('/') : navigateTo('/product-gen')"
    >
      <img :src="ProduckLogoNoBg" alt="" width="40" />
      <span class="text-lg md:text-2xl">
        <n-gradient-text
          gradient="linear-gradient(90deg, #FEAC5E, #C779D0, #4BC0C8)"
          class="font-bold"
        >
          produck.ai
        </n-gradient-text>
      </span>
    </div>

    <div class="flex items-center h-full">
      <n-button
        color="#8a2be2"
        class="text-lg"
        @click="navigateTo('/login')"
        v-if="!userName"
        ><span class="font-medium">Sign In</span></n-button
      >
      <div v-else class="text-white md:text-base text-xs">
        Signed in as {{ userName }} |
        <span class="underline cursor-pointer" @click="logout">Sign Out</span>
      </div>
    </div>
  </n-space>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { NSpace, NGradientText, NButton } from "naive-ui";
import ProduckLogoNoBg from "@/assets/icons/produck-logo-no-bg.png";
import useNavigateTo from "../../utils/router";
import axios from "@/utils/axios.js";

const navigateTo = useNavigateTo();

const userName = ref(null);

const getNameFromLocalStorage = () => {
  const name = localStorage.getItem("name");
  if (name) {
    userName.value = name;
  }
};

onMounted(() => {
  getNameFromLocalStorage();
});

const logout = async () => {
  try {
    // Optionally, make an API call to logout on the server
    await axios.post(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    // Clear the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    userName.value = null;
    navigateTo("/");
  }
};
</script>
