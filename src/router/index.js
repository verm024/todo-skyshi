import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("@/views/DetailView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Unavailable",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
