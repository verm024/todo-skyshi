<script>
import { BaseText } from "@/components/atom";
import { BaseButton } from "@/components/molecules";
import { ActivityList } from "@/components/organism";

export default {
  name: "DashboardView",
  components: {
    BaseText,
    BaseButton,
    ActivityList,
  },
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <base-text _as="h4" :font-weight="700">Activity</base-text>
    <base-button icon="bi bi-plus-lg">Tambah</base-button>
  </div>
  <activity-list
    :activities="[
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13617,
        title: 'coba 1',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13618,
        title: 'coba 2',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13619,
        title: 'coba 3',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13620,
        title: 'coba 4',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13621,
        title: 'coba 4',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13622,
        title: 'coba 4',
        email: 'test@gmail.com',
      },
      {
        created_at: '2022-11-08T12:34:25.240Z',
        updated_at: '2022-11-08T12:34:25.240Z',
        id: 13623,
        title: 'coba 4',
        email: 'test@gmail.com',
      },
    ]"
  />
</template>

<style scoped></style>
