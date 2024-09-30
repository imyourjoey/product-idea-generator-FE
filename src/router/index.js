// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Joey from "@/Joey.vue";
import Login from "@/components/Auth/Login.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
