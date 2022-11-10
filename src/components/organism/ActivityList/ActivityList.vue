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
        :on-title-click="() => onTitleClick(activity?.id)"
        :on-delete="() => onDelete(activity?.id, activity?.title)"
      />
    </div>
    <div
      v-if="activities.length === 0"
      class="d-flex justify-content-center pt-5"
      role="button"
      data-cy="activity-empty-state"
      @click="onAdd"
    >
      <img
        class="w-80"
        src="@/assets/activity-empty-state.png"
        alt="Buat activity pertamamu"
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
    onAdd: {
      type: Function,
      default: () => null,
    },
  },
};
</script>

<style scoped></style>
