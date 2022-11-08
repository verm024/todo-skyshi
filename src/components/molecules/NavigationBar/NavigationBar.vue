<template>
  <nav class="main-navbar navbar fixed-top">
    <div class="container">
      <base-text _as="h5" :fontWeight="700" color="white"
        >TO DO LIST APP</base-text
      >
    </div>
  </nav>
</template>

<script>
import { BaseText } from "@/components/atom";

export default {
  name: "NavigationBar",
  components: { BaseText },
};
</script>

<style scoped>
.main-navbar {
  padding: 38px 0 31px 0;
  background: #16abf8;
}
</style>
