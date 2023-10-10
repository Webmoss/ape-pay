<template>
  <RouterView />
</template>
<script setup lang="ts">
  import { onMounted } from "vue";
  import { RouterView } from "vue-router";
  onMounted(async () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
</script>
