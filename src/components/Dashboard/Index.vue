<template>
  <div class="px-4 md:px-12 pt-5">
    <div class="text-3xl font-semibold">Dashboard</div>
    <div class="md:flex md:gap-x-10">
      <div class="md:w-1/4 card shadow-md mt-4">
        <n-statistic label="Total Ideas Generated">
          <div class="text-2xl font-semibold">1,233</div>
        </n-statistic>
      </div>
      <div class="md:w-1/4 card shadow-md mt-4">
        <n-statistic label="Most Generated Product Category">
          <div class="text-2xl font-semibold">Digital Products</div>
        </n-statistic>
      </div>
      <div class="md:w-1/4 card shadow-md mt-4">
        <n-statistic label="Most Generated Brand">
          <div class="text-2xl font-semibold">British American Tabacco</div>
        </n-statistic>
      </div>
      <div class="md:w-1/4 card shadow-md mt-4">
        <n-statistic label="Average Estimated Profit Margin">
          <div class="text-2xl font-semibold">25.2%</div>
        </n-statistic>
      </div>
    </div>

    <div class="md:flex md:gap-x-10 mt-10">
      <div class="md:w-1/2 card">
        <div class="text-xl font-semibold my-2">
          Top 3 Highest Estimated Revenue Ideas (per month, in USD)
        </div>
        <BarChart :chart-data="chartData" :chart-option="chartOptions" />
      </div>
      <div class="md:w-1/2 card">
        <div class="text-xl font-semibold my-2">
          Top 3 Highest Profit Margin Ideas (%)
        </div>
        <BarChart :chart-data="chartData2" :chart-option="chartOptions2" />
      </div>
    </div>
  </div>

  <n-modal v-model:show="modalVisible" title="My Modal">
    <WorkInProgressModal @dismiss-modal="modalVisible = false" />
  </n-modal>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { NStatistic, NModal } from "naive-ui";
import WorkInProgressModal from "./WorkInProgressModal.vue";

const modalVisible = ref(false);

import BarChart from "@/uielements/Chart/BarChart.vue";

const chartData = computed(() => {
  return {
    labels: ["Airpods ", "Airpods Pro", "Airpods Max"],
    datasets: [
      {
        type: "bar",
        data: [20000, 16000, 23000],
        backgroundColor: ["#696969", "black", "#DF0000"],
        borderColor: ["#696969", "black", "#DF0000"],
        barPercentage: 90,
        categoryPercentage: 0.01,
      },
    ],
  };
});

const chartData2 = computed(() => {
  return {
    labels: ["Milo", "Horlicks", "Nestum"],
    datasets: [
      {
        type: "bar",
        data: [50.11, 54.22, 23.2],
        backgroundColor: ["#696969", "black", "#DF0000"],
        borderColor: ["#696969", "black", "#DF0000"],
        barPercentage: 90,
        categoryPercentage: 0.01,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: false,
        text: "Costs",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 3,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw; // Get the value
          return `USD ${value}`; // Add the percent sign
        },
      },
    },
  },
};

const chartOptions2 = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: false,
        text: "Costs",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 3,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw; // Get the value
          return `${value}%`; // Add the percent sign
        },
      },
    },
  },
};
onMounted(() => {
  modalVisible.value = true;
});
</script>
