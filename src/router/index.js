// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Joey from "@/Joey.vue";
import Login from "@/components/Auth/Login.vue";
import Register from "@/components/Auth/Register.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
