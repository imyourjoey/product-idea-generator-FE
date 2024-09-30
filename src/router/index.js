// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/HelloWorld.vue";
import Joey from "@/Joey.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
