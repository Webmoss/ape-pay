<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

onMounted(async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});
</script>
