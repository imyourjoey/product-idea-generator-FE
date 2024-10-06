<template>
  <div v-if="showMenuIcon">
    <n-tooltip placement="left" trigger="hover">
      <template #trigger>
        <LayoutTextSidebar
          class="position absolute right-4 cursor-pointer hover:scale-[1.1]"
          style="top: 65"
          width="30"
          height="30"
          @click="showDrawer = true"
        />
      </template>
      <span> Menu </span>
    </n-tooltip>
  </div>

  <n-space justify="space-between" class="px-4 py-2 bg-slate-950">
    <div
      class="flex items-center select-none cursor-pointer"
      @click="!userName ? navigateTo('/') : navigateTo('/product-gen')"
    >
      <img :src="innoBatLogoNoBg" alt="" width="40" class="me-1 my-1" />
      <span class="text-lg md:text-2xl">
        <n-gradient-text
          gradient="linear-gradient(90deg, #FEAC5E, #C779D0, #4BC0C8)"
          class="font-bold"
        >
          innoBAT.ai
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

  <n-drawer v-model:show="showDrawer" width="340" placement="right">
    <n-drawer-content>
      <div
        class="text-3xl font-bold cursor-pointer hover:text-[#8a2be1]"
        @click="
          showDrawer = false;
          navigateTo('/dashboard');
        "
      >
        Dashboard
      </div>
      <div class="flex items-center mt-2" @click="showSubmenu = !showSubmenu">
        <div class="text-3xl font-bold cursor-pointer hover:text-[#8a2be1]">
          Product Idea
        </div>

        <IconChevronDown
          class="ms-2"
          :class="{
            'rotate-180': showSubmenu,
            'rotate-0': !showSubmenu,
            'transition-transform duration-300': true,
          }"
        />
      </div>

      <n-collapse-transition :show="showSubmenu">
        <div
          class="text-2xl font-bold cursor-pointer hover:text-[#8a2be1]"
          @click="
            showDrawer = false;
            navigateTo('/product-gen');
          "
        >
          Generate
        </div>
        <div
          class="text-2xl font-bold cursor-pointer hover:text-[#8a2be1]"
          @click="
            showDrawer = false;
            navigateTo('/history');
          "
        >
          History
        </div>
      </n-collapse-transition>
      <div class="cursor-pointer mt-2">
        <a
          class="text-3xl font-bold hover:text-[#8a2be1]"
          href="mailto:joeylim016@gmail.com"
          >Contact Us</a
        >
      </div>
      <div
        class="text-3xl mt-2 font-bold cursor-pointer hover:text-[#8a2be1]"
        @click="
          showDrawer = false;
          navigateTo('/tnc');
        "
      >
        Terms of Service
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ref, onMounted } from "vue";
import {
  NSpace,
  NGradientText,
  NButton,
  NTooltip,
  NDrawer,
  NDrawerContent,
  NCollapseTransition,
} from "naive-ui";
import innoBatLogoNoBg from "@/assets/icons/innobat-removebg-logo.png";
import useNavigateTo from "../../utils/router";
import axios from "@/utils/axios.js";
import LayoutTextSidebar from "../../svgicons/LayoutTextSidebar.vue";
import IconChevronDown from "@/svgicons/IconChevronDown.vue";

const navigateTo = useNavigateTo();

const showDrawer = ref(false);
const showSubmenu = ref(false);

const userName = ref(null);
const showMenuIcon = ref(false);

const getNameFromLocalStorage = () => {
  const name = localStorage.getItem("name");
  if (name) {
    userName.value = name;
    showMenuIcon.value = true;
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

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
.rotate-0 {
  transform: rotate(0deg);
}
.transition-transform {
  transition-property: transform;
}
.duration-300 {
  transition-duration: 300ms;
}
</style>
