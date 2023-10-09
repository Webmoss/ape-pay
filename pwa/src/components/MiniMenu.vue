<template>
  <ul class="site-links mobile-hidden">
    <li @click="navigateAndScroll('home')">Home →</li>
    <li @click="navigateAndScroll('about')">About →</li>
    <li @click="navigateAndScroll('payments')">Payments →</li>
    <li @click="navigateAndScroll('faqs')">Faqs →</li>
  </ul>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const scrollPageToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

const scrolltoId = (to: string) => {
  var access = document.getElementById(to);
  if(access) access.scrollIntoView({ behavior: "smooth" });
}

function navigateAndScroll(to: string) {
  if (route.name === to) {
    scrollPageToTop();
  } else {
    scrolltoId(to);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.site-links {
  list-style: none;
  font-size: 20px;
  line-height: 22px;
  font-weight: 600;
  font-style: normal;
  text-align: left;
  text-decoration-line: none;
  margin-top: 50px;
  padding-left: 0;
  @include breakpoint($break-md) {
    padding-right: 10px;
  }
}
.site-links li {
  padding-bottom: 0.25rem;
  transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
  &:hover,
  &:active,
  &:focus {
    text-decoration: line-through;
    cursor: pointer;
  }
}

.mobile-hidden {
  display: block;
  @include breakpoint($break-sm) {
    display: none;
  }
}
</style>
