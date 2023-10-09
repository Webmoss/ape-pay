<template>
  <div id="multi-sig-card" class="card">
    <h3>Multi-Sig Payment</h3>
    <p>This is some text</p>
    <p>a form will live here</p>
    <div class="button-container">
      <button class="grey-button" @click="cancel">Cancel</button>
      <button class="blue-button" @click="makePayment">Pay Now</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
// import { useStore } from "@/store";

// const store = useStore();
// const { connected } = storeToRefs(store);

const cancel = async () => {
  console.log("makePayment");
};

const makePayment = async () => {
  console.log("makePayment");
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.card {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 2em;
  border-radius: 30px;
  border: 1px solid $grey-100;
  color: $black;
  background: $white;
}
</style>
