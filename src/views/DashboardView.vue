<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <base-text _as="h4" :font-weight="700">Activity</base-text>
    <base-button icon="bi bi-plus-lg">Tambah</base-button>
  </div>
  <activity-list :activities="activities" />
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

    return {
      activities,
    };
  },
};
</script>

<style scoped></style>
