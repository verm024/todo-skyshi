<script setup>
import { NavigationBar, ActivityCard } from "@/components/molecules";
import { BaseButton } from "@/components/atom";
</script>

<template>
  <navigation-bar />
  <div class="page-container container">
    <router-view />
  </div>
  <activity-card title="test title"></activity-card>
  <base-button icon="bi bi-plus-lg" @click="window.alert('Hello World')"
    >Hapus</base-button
  >
</template>

<style scoped>
.page-container {
  padding-top: 145px;
}
</style>
