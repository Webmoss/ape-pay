<template>
  <Header />
  <Intro />
  <About />
  <Payments />
  <Transactions />
  <Footer />
</template>
<script setup lang="ts">
  import Header from "@/components/HeaderView.vue";
  import Intro from "@/components/IntroductionView.vue";
  import About from "@/components/AboutView.vue";
  import Payments from "@/components/PaymentsView.vue";
  import Transactions from "@/components/TransactionsView.vue";
  import Footer from "@/components/FooterView.vue";
</script>
