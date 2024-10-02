<template>
  {{ aiResponse }}
  <div class="md:w-1/2">
    <template v-if="!fullPromptResponse">
      <div class="font-bold text-3xl my-4">
        Unlock Your Next Product Idea with the Power of
        <n-gradient-text
          gradient="linear-gradient(90deg, #D68A3C, #A05FAE, #3BA2A9)"
          class="font-bold"
        >
          produck.ai!</n-gradient-text
        >
      </div>
      <div class="flex items-center">
        <div class="text-lg font-bold">Use Existing Brand Profile</div>
        <n-switch
          v-model:value="useBrandProfile"
          size="small"
          class="ms-auto"
        />
      </div>
      <n-collapse-transition :show="useBrandProfile">
        <n-select
          v-model:value="selectedBrand"
          :options="brandOptions"
          placeholder="Select a Brand"
        />
        <n-button type="primary" class="mt-2" @click="showModal">
          Create New Brand
        </n-button>

        <n-collapse-transition :show="selectedBrand != null">
          <BrandProductsInfo :brand-products="brandProducts" class="mt-4" />
        </n-collapse-transition>
      </n-collapse-transition>
      <div class="mt-4">
        <div class="text-lg font-bold">
          Describe the Product You Want to Create!
        </div>
        <div class="text-gray-500">
          Be brief and clear in your description. You can include features,
          benefits, target audience, and any specific requirements.
        </div>
        <n-input
          v-model:value="userPrompt"
          type="textarea"
          placeholder="Insert Prompt"
        />
      </div>

      <div class="mt-4">
        <div class="text-lg font-bold">Product Category</div>
        <div class="text-gray-500">
          Choose the category that aligns with your brand's current offerings or
          explore new categories that you wish to pursue.
        </div>
        <n-select
          v-model:value="selectedProductCategory"
          :options="productTypeOptions"
          placeholder="Select Category"
          clearable
        ></n-select>
      </div>

      <n-button
        type="primary"
        size="large"
        class="my-10"
        block
        :disabled="!canGenerate"
        @click="generateIdea"
        >Generate Idea
      </n-button>
    </template>
    <template v-else-if="fullPromptResponse && !loading">
      <div class="text-3xl font-bold my-3">Your Product Idea is Ready!</div>
      <div class="card typingEffect">
        <div v-html="fullPromptResponse"></div>
        <img
          :src="pollinationUrl"
          alt="Generating Image..."
          class="rounded-lg px-8 py-5"
        />
      </div>

      <n-button @click="reset" block type="primary" class="my-4"
        >Generate a New Product Idea</n-button
      >
    </template>
    <template v-else-if="loading">
      <img :src="MrBeanWaiting" alt="" />
      <div class="text-2xl font-bold">
        We Appreciate Your Patience as We Prepare Your New Product Idea!
      </div>
    </template>
  </div>

  <n-modal v-model:show="modalVisible" title="My Modal">
    <CreateNewBrandModal @create-brand-success="handleCreateBrandSuccess" />
  </n-modal>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import {
  NSelect,
  NButton,
  NModal,
  NInput,
  NSwitch,
  NCollapseTransition,
  NGradientText,
} from "naive-ui";
import axios from "@/utils/axios.js";
import CreateNewBrandModal from "./CreateNewBrandModal.vue";
import BrandProductsInfo from "./BrandProductsInfo.vue";
import MrBeanWaiting from "@/assets/gif/mr-bean-waiting.gif";

const loading = ref(false);

const pollinationUrl = computed(() => {
  return "https://image.pollinations.ai/prompt/" + shortPromptResponse.value;
});

const canGenerate = computed(() => {
  if (useBrandProfile.value) {
    return (
      brandProducts.value != defaultBrandProducts &&
      selectedProductCategory.value !== null &&
      userPrompt.value !== ""
    );
  } else {
    return selectedProductCategory.value !== null && userPrompt.value !== "";
  }
});

const modalVisible = ref(false);

const showModal = () => {
  modalVisible.value = true;
};

const productTypeOptions = [
  { label: "Physical Products", value: "physical products" },
  { label: "Digital Products", value: "digital products" },
  { label: "Services", value: "services" },
  { label: "Food and Beverage", value: "food and beverage" },
  { label: "Automotive", value: "automotive" },
  { label: "Home and Garden", value: "home and garden" },
  { label: "Health and Wellness", value: "health and wellness" },
  { label: "Pet Products", value: "pet products" },
  { label: "Leisure and Entertainment", value: "leisure and entertainment" },
  { label: "Sports", value: "sports" },
];

const brandOptions = ref([]);

// USER SELECTION //
const useBrandProfile = ref(false);
const selectedBrand = ref(null);
const selectedProductCategory = ref(null);
const userPrompt = ref("");
const brandProducts = ref({
  brand: {
    brand_id: "",
    name: "",
    description: "",
  },
  products: [],
});
// USER SELECTION //

const defaultBrandProducts = {
  brand: {
    brand_id: "",
    name: "",
    description: "",
  },
  products: [],
};

const getBrands = async () => {
  axios
    .get("/api/brands", {})
    .then((response) => {
      console.log(response.data.data);

      const brands = response.data.data.map((brand) => ({
        value: brand.id,
        label: brand.name,
      }));

      brandOptions.value.push(...brands);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

const getProducts = async () => {
  axios
    .get("/api/products", {
      params: {
        brand_id: selectedBrand.value,
      },
    })
    .then((response) => {
      brandProducts.value = response.data.data; // Access the response data
    })
    .catch((err) => {
      alert(err.response.data.message); // Handle the error message
    });
};

watch(selectedBrand, (newValue) => {
  if (newValue != null) {
    getProducts();
  }
});

watch(useBrandProfile, (newValue) => {
  if (!newValue) {
    brandProducts.value = defaultBrandProducts;
    selectedBrand.value = null;
  }
});

onMounted(() => {
  getBrands();
});

function handleCreateBrandSuccess() {
  getBrands();
  modalVisible.value = false;
}

const fullPromptResponse = ref("");
const shortPromptResponse = ref("");

const aiResponse = ref({
  description: "",
  estimatedCost: 0,
  estimatedSellingPrice: 0,
  estimatedUnitsSoldPerMonth: 0,
  productName: "",
  targetMarket: "",
  uniqueSellingPoint: "",
});

const generateIdea = async () => {
  try {
    // Prepare the data to send

    loading.value = true;
    const requestData = {
      useBrandProfile: useBrandProfile.value,
      selectedProductCategory: selectedProductCategory.value,
      userPrompt: userPrompt.value,
      brandProducts: brandProducts.value,
    };

    // Send POST request to the backend
    const response = await axios.post("/api/prompt", requestData);

    fullPromptResponse.value = response.data.fullResponse;
    shortPromptResponse.value = response.data.shortResponse;

    aiResponse.value = {
      description: response.data.description,
      estimatedCost: response.data.estimatedCost,
      estimatedSellingPrice: response.data.estimatedSellingPrice,
      estimatedUnitsSoldPerMonth: response.data.estimatedUnitsSoldPerMonth,
      productName: response.data.productName,
      targetMarket: response.data.targetMarket,
      uniqueSellingPoint: response.data.uniqueSellingPoint,
    };

    setTimeout(() => {
      loading.value = false;
    }, 10000);
  } catch (error) {
    alert(error);
  }
};

//reset everything
function reset() {
  useBrandProfile.value = false;
  selectedBrand.value = null;
  selectedProductCategory.value = null;
  userPrompt.value = null;
  brandProducts.value = defaultBrandProducts;
  fullPromptResponse.value = "";
  shortPromptResponse.value = "";
}
</script>
