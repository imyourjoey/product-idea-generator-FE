<template>
  <div class="p-4">
    <div class="text-3xl font-bold mb-4">Product Idea History</div>
    <n-data-table :columns="columns" :data="history" :pagination="pagination" />
  </div>

  <n-modal v-model:show="modalVisible" title="My Modal">
    <AskAiModal :ideaData="selectedIdea" />
  </n-modal>

  <n-modal v-model:show="messageLogModalVisible" title="My Modal">
    <MessageLogModal :messageLogs="messageLogs" />
  </n-modal>
</template>

<script setup>
import { ref, h, onMounted } from "vue";
import { NButton, NDataTable, NModal } from "naive-ui";
import axios from "@/utils/axios.js";
import { getCapitalizedCategory } from "@/helper/productCategory.js";
import AskAiModal from "./AskAiModal.vue";
import MessageLogModal from "./MessageLogModal.vue";
import { formatDate } from "@/helper/dateHelper.js";

const modalVisible = ref(false);
const messageLogModalVisible = ref(false);

// Define columns for the table
function createColumns(sendMail, showMessageLogs) {
  return [
    {
      title: "Product Name",
      key: "product_name",
      width: 200, // Set the width to 200px for product name
      align: "top",
    },
    {
      title: "Category",
      key: "category",
      width: 150, // Set the width to 150px for category
      align: "top",
      render: (row) => getCapitalizedCategory(row.category),
    },
    {
      title: "Estimated Cost",
      key: "estimated_cost",
      width: 150, // Set the width to 150px for estimated cost
      render: (row) => `$${row.estimated_cost.toFixed(2)}`, // Format to currency
    },
    {
      title: "Estimated Selling Price",
      key: "estimated_selling_price",
      width: 180, // Set the width to 180px for selling price
      render: (row) => `$${row.estimated_selling_price.toFixed(2)}`, // Format to currency
    },
    {
      title: "Feasibility Score",
      key: "feasibility_score",
      width: 100, // Set the width to 150px for feasibility score
      render: (row) => `${row.feasibility_score}/10`,
    },
    {
      title: "Est. Units Sold Per Month",
      key: "estimated_units_sold_per_month",
      width: 150, // Set the width to 150px for feasibility score
      render: (row) => `${row.estimated_units_sold_per_month} units`,
    },
    {
      title: "Brand",
      key: "brand_name",
      width: 150, // Set the width to 150px for brand name
    },
    {
      title: "Actions",
      key: "actions",
      width: 180, // Set the width to 120px for action buttons
      render: (row) =>
        h(
          "div", // Wrap buttons in a div or fragment
          null,
          [
            h(
              NButton,
              {
                size: "small",
                class: "bg-white me-2 ",
                onClick: () => sendMail(row),
              },
              { default: () => "Ask AI" }
            ),
            h(
              NButton,
              {
                size: "small",
                class: "bg-white",
                onClick: () => showMessageLogs(row), // Replace with your action function
              },
              { default: () => " Message Log" } // Button label
            ),
          ]
        ),
    },
    {
      type: "expand",
      expandable: (rowData) => rowData.product_name !== "", // Change condition as needed
      renderExpand: (rowData) => {
        return h("div", { class: "p-2" }, [
          h("p", { class: "text-gray-500 text-sm" }, "Description"),
          h("p", { class: "text-sm" }, rowData.description),
          h(
            "p",
            { class: "text-gray-500 text-sm mt-4" },
            "Unique Selling Point"
          ),
          h("p", { class: "text-sm" }, rowData.unique_selling_point),
          h("p", { class: "text-gray-500 text-sm mt-4" }, "Target Market"),
          h("p", { class: "text-sm" }, rowData.target_market),

          h("p", { class: "text-gray-500 text-sm mt-4" }, "Date Created"),
          h("p", { class: "text-sm" }, formatDate(rowData.created_at)),
        ]);
      },
    },
  ];
}

// Send mail handler
const selectedIdea = ref({});
function sendMail(rowData) {
  console.log(`send mail to ${rowData.product_name}`);
  modalVisible.value = true;
  selectedIdea.value = rowData;
}

// Initialize the history data
const history = ref([]);
const pagination = ref({
  pageSize: 10,
});

// Fetch the data from the API
const getHistory = async () => {
  try {
    const response = await axios.get("/api/generated-product-ideas");
    history.value = response.data.map((item, index) => ({
      key: index, // Assign a unique key for each row
      product_name: item.product_name,
      category: item.category,
      description: item.description,
      estimated_cost: item.estimated_cost,
      estimated_selling_price: parseFloat(item.estimated_selling_price), // Ensure it's a number
      feasibility_score: item.feasibility_score,
      brand_name: item.brand_name || "-", // Default to '-' if null
      unique_selling_point: item.unique_selling_point, // Make sure this exists in the API response
      estimated_units_sold_per_month: item.estimated_units_sold_per_month, // Add these properties if needed
      target_market: item.target_market,
      created_at: item.created_at,
      generated_product_idea_id: item.id,
    }));
  } catch (err) {
    alert(err.response.data.message);
  }
};

const messageLogs = ref([]);
// get message logs
const getMessageLogs = async () => {
  try {
    const response = await axios.get(
      "/api/generated-product-ideas/" +
        selectedIdea.value.generated_product_idea_id +
        "/ai-message-logs"
    );

    messageLogs.value = response.data.map((log) => ({
      id: log.id,
      question: log.question,
      answer: log.answer,
      generatedProductIdeaId: log.generated_product_idea_id, // This line is optional if you don't need it
      created_at: log.created_at,
    }));

    messageLogModalVisible.value = true;
  } catch (err) {
    alert(err.response.data.message);
  }
};

onMounted(() => {
  getHistory();
});

// Define columns for the table
const columns = createColumns(sendMail, showMessageLogs);

function showMessageLogs(row) {
  selectedIdea.value = row;
  getMessageLogs();
}
</script>

<style>
.n-data-table-thead {
  vertical-align: top;
}

.n-data-table-th {
  background: #8a2be1 !important;
  color: white;
}
.n-data-table-td {
  vertical-align: top;
  border: 1px solid #aaaaaa;
}

.n-data-table-td--expand {
  vertical-align: middle !important;
}
.n-data-table-th__title {
  color: white;
  font-weight: 600;
}

.n-data-table-base-table {
  border: 1px solid #aaaaaa;
}

.n-data-table-tr {
  border: 1px solid #aaaaaa !important;
}

.n-data-table
  .n-data-table-tr:not(.n-data-table-tr--summary):hover
  > .n-data-table-td {
  background-color: #dedede !important;
}
</style>
