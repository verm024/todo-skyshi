<script setup>
import { NavigationBar } from "@/components/molecules";
import { BaseButton } from "@/components/atom";
</script>

<template>
  <navigation-bar />
  <div class="page-container container">
    <router-view />
  </div>
  <base-button @click="window.alert('Hello World')">Hapus</base-button>
</template>

<style scoped>
.page-container {
  padding-top: 145px;
}
</style>
