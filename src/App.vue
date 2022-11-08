<script setup>
import { NavigationBar } from "@/components/molecules";
import { BaseButton } from "@/components/atom";
import { ActivityList } from "@/components/organism";
</script>

<template>
  <navigation-bar />
  <div class="page-container container">
    <router-view />
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
    ></activity-list>
  </div>
  <base-button icon="bi bi-plus-lg" @click="window.alert('Hello World')"
    >Hapus</base-button
  >
</template>

<style scoped>
.page-container {
  padding-top: 145px;
}
</style>
