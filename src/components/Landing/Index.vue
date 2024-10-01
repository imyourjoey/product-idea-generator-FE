<template>
  <div class="justify-center items-center md:text-center md:mt-16"></div>
  <div class="flex md:flex-row flex-col md:space-x-10 lg:space-x-20">
    <div class="mt-4 md:mt-0"><img :src="Hero" alt="" width="750" /></div>
    <div>
      <div class="md:text-5xl text-4xl font-bold mt-4 md:mt-0">
        Craft Your Dream Product with AI!
      </div>

      <div>
        <div class="text-xl mt-2">
          <span
            class="underline cursor-pointer"
            style="color: #8a2be2"
            @click="navigateTo('/register')"
            >Create an Account</span
          >
          to Try Out Now!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from "@/assets/hero/hero.webp";
import useNavigateTo from "../../utils/router";
const navigateTo = useNavigateTo();
</script>
