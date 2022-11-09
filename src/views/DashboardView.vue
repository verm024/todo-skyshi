<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <base-text _as="h4" :font-weight="700">Activity</base-text>
    <base-button icon="bi bi-plus-lg" @click="handleAdd()">Tambah</base-button>
  </div>
  <activity-list :activities="activities" :on-add="handleAdd" />
</template>

<script>
import { BaseText } from "@/components/atom";
import { BaseButton } from "@/components/molecules";
import { ActivityList } from "@/components/organism";
import api from "@/utils/api";

import { ref, onMounted } from "vue";

export default {
  name: "DashboardView",
  components: {
    BaseText,
    BaseButton,
    ActivityList,
  },
  setup() {
    const activities = ref([]);
    const fetchActivities = async () => {
      try {
        const res = await api().get(
          "/activity-groups?email=muhnaufal251%40gmail.com"
        );
        const { data } = res.data;
        activities.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => fetchActivities());

    const handleAdd = async () => {
      try {
        await api().post("/activity-groups", {
          title: "New Activity",
          email: "muhnaufal251@gmail.com",
        });
        await fetchActivities();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      activities,
      handleAdd,
    };
  },
};
</script>

<style scoped></style>
