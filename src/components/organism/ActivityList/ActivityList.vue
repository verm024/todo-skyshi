<template>
  <div class="row container">
    <div
      v-for="activity in activities"
      :key="activity?.id"
      class="col-12 col-md-6 col-xl-3 d-flex justify-content-center mt-3 mb-3"
    >
      <activity-card
        :title="activity?.title"
        :date="activity.created_at"
        :on-title-click="onTitleClick(activity?.id)"
        :on-delete="onDelete(activity?.id)"
      />
    </div>
  </div>
</template>

<script>
import { ActivityCard } from "@/components/molecules";

export default {
  name: "ActivityList",
  components: {
    ActivityCard,
  },
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
    onTitleClick: {
      type: Function,
      default: () => null,
    },
    onDelete: {
      type: Function,
      default: () => null,
    },
  },
};
</script>

<style scoped></style>
