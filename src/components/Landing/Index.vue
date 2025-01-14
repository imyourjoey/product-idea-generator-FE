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
      </div>
      <div class="mt-6 md:mt-8 text-sm md:border-0 border-b-2 pb-6">
        <div class="font-semibold">This is a demo website</div>
        <div class="font-semibold">Use the credentials below to sign in</div>
        <div class="text-gray-800">Email: tester@gmail.com</div>
        <div class="text-gray-800">Password: password</div>
      </div>
    </div>
  </div>
  <div class="md:my-20 md:text-4xl text-3xl font-bold md:text-center mt-6 mb-3">
    Watch a 1-minute video to get started!
  </div>
  <div class="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-xl">
    <iframe
      class="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/--PAX3v9gpk?si=opLEXRmAdl25yXx7"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import Hero from "@/assets/hero/hero.webp";
import useNavigateTo from "../../utils/router";
const navigateTo = useNavigateTo();
</script>
