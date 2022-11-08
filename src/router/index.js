import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("@/views/DetailView.vue"),
  },
  {
    path: "*",
    name: "Unavailable",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
