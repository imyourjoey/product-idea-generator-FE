<template>
  <div class="card" style="width: 480px">
    <div class="text-2xl font-semibold">
      {{ props.ideaData.product_name }}
    </div>
    <div class="text-gray-500">
      Uncover valuable insights about the product!
    </div>

    <div class="mt-6 font-semibold text-lg">
      Ask

      <n-gradient-text
        gradient="linear-gradient(90deg, #D68A3C, #A05FAE, #3BA2A9)"
        class="font-bold"
      >
        innoBAT.ai</n-gradient-text
      >
    </div>
    <n-input
      placeholder="Enter your prompt"
      v-model:value="userInput"
    ></n-input>
    <div v-if="aiResponse">
      <div class="font-semibold text-lg mt-4">AI Respond</div>
      <div class="text-gray-500">
        Access past AI responds through the message log
      </div>
      <n-scrollbar style="max-height: 200px" class="card ps-3 text-justify">
        {{ aiResponse }}
      </n-scrollbar>
    </div>
    <n-button
      v-if="!aiResponse"
      block
      type="primary"
      class="mt-2"
      @click="handleSubmit"
      :disabled="!userInput"
      >Submit</n-button
    >
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { NInput, NGradientText, NButton, NScrollbar } from "naive-ui";
import axios from "@/utils/axios.js";

const userInput = ref("");

const props = defineProps({
  ideaData: {
    type: Object,
    default: {},
    required: false,
  },
});

const aiResponse = ref("");

const handleSubmit = async () => {
  try {
    // Prepare the data to send

    const requestData = {
      userInput: userInput.value,
      ideaData: props.ideaData,
    };

    // Send POST request to the backend
    const response = await axios.post("/api/ask-ai", requestData);

    aiResponse.value = response.data.response;
  } catch (error) {
    alert(error);
  }
};
</script>

<style scoped></style>
