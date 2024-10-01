// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Joey from "@/Joey.vue";
import Login from "@/components/Auth/Login.vue";
import Register from "@/components/Auth/Register.vue";
import Products from "@/components/Products/Index.vue";
import Landing from "@/components/Landing/Index.vue";
import GenerateProduct from "@/components/GenerateProduct/Index.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/joey",
    name: "Joey",
    component: Joey,
  },
  {
    path: "/product-gen",
    name: "Generate Product",
    component: GenerateProduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if ((to.name == "Login" || to.name == "Register") && token) {
    next({ name: "Generate Product" });
  } else if (to.name == "Generate Product" && !token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
