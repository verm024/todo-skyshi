<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <base-text _as="h4" :font-weight="700">Activity</base-text>
    <base-button icon="bi bi-plus-lg" @click="handleAdd()">Tambah</base-button>
  </div>
  <activity-list
    :activities="activities"
    :on-add="handleAdd"
    :on-delete="(activityId, title) => handleOpenModal(activityId, title)"
    :on-title-click="(activityId) => handleClickActivity(activityId)"
  />
  <modal-delete-activity
    :is-open="isModalDeleteOpen"
    :on-close="handleCloseModal"
    :on-confirm="handleDelete"
    :title="modalDeleteData?.title || ''"
  />
  <base-alert
    text="Activity berhasil dihapus"
    icon="bi bi-exclamation-circle"
    icon-color="#00A790"
    :is-open="isAlertDeleteOpen"
  />
</template>

<script>
import { BaseText } from "@/components/atom";
import { BaseButton, BaseAlert } from "@/components/molecules";
import { ActivityList, ModalDeleteActivity } from "@/components/organism";
import api from "@/utils/api";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "DashboardView",
  components: {
    BaseText,
    BaseButton,
    ActivityList,
    ModalDeleteActivity,
    BaseAlert,
  },
  setup() {
    const activities = ref([]);
    const fetchActivities = async () => {
      try {
        const res = await api().get(
          "/activity-groups?email=jamievardy%40gmail.com"
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
          email: "jamievardy@gmail.com",
        });
        await fetchActivities();
      } catch (error) {
        console.error(error);
      }
    };

    const isModalDeleteOpen = ref(false);
    const modalDeleteData = ref(null);
    const isAlertDeleteOpen = ref(false);
    const handleOpenModal = (activityId, title) => {
      isModalDeleteOpen.value = true;
      modalDeleteData.value = { activityId, title };
    };
    const handleCloseModal = () => {
      isModalDeleteOpen.value = false;
      modalDeleteData.value = null;
    };
    const handleDelete = async () => {
      try {
        await api().delete(
          `/activity-groups/${modalDeleteData.value.activityId}`
        );
        await fetchActivities();
        isAlertDeleteOpen.value = true;
        setTimeout(() => {
          isAlertDeleteOpen.value = false;
        }, 2000);
      } catch (error) {
        console.error(error);
      } finally {
        handleCloseModal();
      }
    };

    const router = useRouter();
    const handleClickActivity = (activityId) => {
      router.push(`/detail/${activityId}`);
    };

    return {
      activities,
      handleAdd,
      handleOpenModal,
      isModalDeleteOpen,
      handleCloseModal,
      handleDelete,
      modalDeleteData,
      isAlertDeleteOpen,
      handleClickActivity,
    };
  },
};
</script>

<style scoped></style>
