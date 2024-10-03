// categoryHelper.js

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

// Create a lookup object
const categoryLookup = productTypeOptions.reduce((acc, option) => {
  acc[option.value] = option.label; // Map lowercase value to capitalized label
  return acc;
}, {});

// Helper function to get capitalized category label
export function getCapitalizedCategory(category) {
  return categoryLookup[category] || category; // Return capitalized label or original category
}
