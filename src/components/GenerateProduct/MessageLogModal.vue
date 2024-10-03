<template>
  <div class="card" style="width: 480px; height: 400px">
    <div class="flex justify-center align-center">
      <div class="text-2xl font-semibold text-center my-2">Message Logs</div>
      <IconArrowDownLeft class="w-7 h-7 mt-2 ms-2" />
    </div>
    <div
      class="text-center h-3/4 flex items-center justify-center"
      v-if="props.messageLogs.length === 0"
    >
      <div>No message to show.</div>
    </div>
    <n-scrollbar style="max-height: 300px" v-else>
      <div
        class="card mt-4"
        v-for="message in props.messageLogs"
        :key="message.id"
      >
        <div class="text-sm text-gray-500">Question</div>
        <div class="text-justify text-sm">
          {{ message.question }}
        </div>

        <div class="text-sm text-gray-500 mt-4">Answer</div>

        <div class="text-sm text-justify p-0">{{ message.answer }}</div>

        <div class="text-xs text-end mt-4 text-gray-500">
          {{ formatDate(message.created_at) }}
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { NScrollbar } from "naive-ui";
import IconArrowDownLeft from "../../svgicons/IconArrowDownLeft.vue";
import { formatDate } from "@/helper/dateHelper.js";

const props = defineProps({
  messageLogs: {
    type: Array,
    default: [],
    required: false,
  },
});
</script>

<style>
/* For Webkit-based browsers (Chrome, Safari, Edge) */
*::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

*::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background of the scrollbar track */
}

*::-webkit-scrollbar-thumb {
  background-color: #888; /* Scrollbar thumb color */
  border-radius: 30px; /* Roundness of the scroll thumb */
  border: 2px solid #f1f1f1;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Thumb color on hover */
}

/* For Firefox */
* {
  scrollbar-width: thin; /* Make scrollbar thin */
  scrollbar-color: #888 #f1f1f1; /* Scrollbar thumb and track colors */
}

.n-collapse-item__content-inner {
  padding: 0 !important;
}
</style>
