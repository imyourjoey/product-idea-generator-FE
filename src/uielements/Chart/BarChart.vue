<template>
  <Bar :data="chartData" :options="chartOption" />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { ref, computed, watch } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOption: {
    type: Object,
    required: true,
  },
});
</script>
