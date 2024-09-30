<template>
  <n-space justify="space-between" class="px-4 py-2 bg-slate-950">
    <div
      class="flex items-center select-none cursor-pointer"
      @click="navigateTo('/')"
    >
      <img :src="ProduckLogoNoBg" alt="" width="40" />
      <span class="text-2xl">
        <n-gradient-text
          gradient="linear-gradient(90deg, #FEAC5E, #C779D0, #4BC0C8)"
          class="font-bold"
        >
          produck.ai
        </n-gradient-text>
      </span>
    </div>

    <div class="flex items-center h-full">
      <n-button color="#8a2be2" class="text-lg" @click="navigateTo('/login')"
        ><span class="font-medium">Sign In</span></n-button
      >
    </div>
  </n-space>
</template>
<script setup>
import { NSpace, NGradientText, NButton } from "naive-ui";
import ProduckLogoNoBg from "@/assets/icons/produck-logo-no-bg.png";
import useNavigateTo from "../../utils/router";
const navigateTo = useNavigateTo();
</script>
