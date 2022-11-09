<script setup>
import { NavigationBar } from "@/components/molecules";
</script>

<template>
  <navigation-bar />
  <div class="page-container container">
    <router-view />
  </div>
</template>

<style scoped>
.page-container {
  padding-top: 145px;
  padding-bottom: 100px;
}
</style>
