<template>
  <div
    class="flex md:flex-row flex-col md:space-x-10 lg:space-x-10 w-full md:mt-12"
  >
    <div class="mt-4 md:mt-0 w-full md:w-1/2">
      <img :src="Hero" alt="" width="750" class="rounded-xl md:shadow-xl" />
    </div>
    <div class="md:card md:p-5 w-full md:w-1/2 md:rounded-xl md:shadow-xl">
      <div class="md:text-5xl text-3xl font-bold mt-4 md:mt-0">
        Unlock Infinite Innovation with AI
      </div>
      <div class="text-lg md:text-xl mt-4">
        Generate product ideas in seconds!
      </div>

      <div>
        <div class="text-lg md:text-xl mt-1">
          <span
            class="underline cursor-pointer"
            style="color: #8a2be2"
            @click="navigateTo('/register')"
            >Create an Account</span
          >
          to Try Out Now!
        </div>
        <div class="card md:w-1/2 mt-4 shadow">
          <div class="font-bold">Demo Account</div>
          <div>email: tester@gmail.com</div>
          <div>password: password</div>
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
