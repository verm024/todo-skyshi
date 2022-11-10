import { createWebHistory, createRouter } from "vue-router";

import api from "@/utils/api";

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
    beforeEnter: async (to, from, next) => {
      try {
        const res = await api().get(`/activity-groups/${to.params.id}`);
        if (res.status === 200) {
          next();
        } else {
          next("/");
        }
      } catch (error) {
        next("/");
        console.error(error);
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Unavailable",
    beforeEnter: (to, from, next) => {
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
