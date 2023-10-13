<template>
  <div id="credit-card" class="card">
    <form>
      <div class="input-row">
        <label for="address">Send To</label>
        <input
          v-model="form.address"
          name="address"
          type="text"
          class="address-input"
          placeholder="Sent to address"
        />
      </div>
      <div class="input-row">
        <label for="amount">Amount</label>
        <input
          v-model="form.amount"
          name="amount"
          type="text"
          class="amount-input"
          placeholder="Enter an amount"
        />
      </div>
      <div class="input-row">
        <label for="message">Message</label>
        <textarea
          v-model="form.message"
          name="message"
          type="text"
          class="message-input"
          placeholder="Add an optional message"
        />
      </div>
      <div class="balance-container">
        <span class="account-balance">
          <div class="account-total">
            <span class="account-icon">
              <img src="@/assets/images/Apecoin-Icon.png" height="24" />
            </span>
            {{
              apecoinBalance ? parseFloat(apecoinBalance).toFixed(4) : parseFloat("0").toFixed(4)
            }}
          </div>
        </span>
        <span class="account-balance">
          <div class="account-total">
            <span class="account-icon circle">
              <img src="@/assets/images/eth-diamond-black.png" height="24" />
            </span>
            {{ balance ? parseFloat(balance).toFixed(4) : parseFloat("0").toFixed(4) }}
          </div>
        </span>
      </div>
      <div class="checkbox-row">
        <input v-model="form.fees" name="fees" type="checkbox" class="checkbox-input" />
        <label for="fees" class="checkbox-label">Pay fees with ApeCoin</label>
      </div>
      <div class="button-container-end">
        <button v-if="connected" class="green-button-sml" @click="makePayment">Pay Now</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  // import { ethers } from "ethers";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, balance, apecoinBalance } = storeToRefs(store);

  const form = ref({
    address: "",
    amount: "",
    message: "",
    fees: true,
  });

  // const cancel = async () => {
  //   console.log("cancel");
  //   form.value = {
  //     address: "",
  //     amount: "",
  //     message: "",
  //     fees: true,
  //   };
  // };

  const makePayment = async () => {
    console.log("makePayment");
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .card {
    width: 405px;
    height: 440px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    padding: 2em 2em 0;
    border-radius: 16px;
    border: 1px solid $grey-100;
    color: $white;
    background: $black;
  }
</style>
