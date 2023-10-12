<template>
  <div id="crypto-card" class="card">
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
        <label for="message">Optional Message</label>
        <textarea
          v-model="form.message"
          name="message"
          type="text"
          class="message-input"
          placeholder="Add a message to your transaction"
        />
      </div>
      <div class="checkbox-row">
        <input
          v-model="form.fees"
          name="fees"
          type="checkbox"
          class="checkbox-input"
        />
        <label for="fees" class="checkbox-label">Pay fees with ApeCoin</label>
      </div>
      <div class="button-container">
        <button class="grey-button" @click="cancel">Clear</button>
        <button v-if="connected" class="green-button" @click="makePayment">
          Pay Now
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { storeToRefs } from "pinia";
  import { useStore } from "@/store";
  import { ethers } from "ethers";

  const store = useStore();
  const { connected } = storeToRefs(store);

  const form = ref({
    address: "",
    amount: "",
    message: "",
    fees: true,
  });

  const cancel = async () => {
    console.log("cancel");
    form.value = {
      address: "",
      amount: "",
      message: "",
      fees: true,
    };
  };

  const makePayment = async () => {
    // console.log("makePayment");
    // try {
    //   const { ethereum } = window;
    //   if (!ethereum) {
    //     throw Error();
    //   }
    //   const provider = new ethers.providers.Web3Provider(ethereum);
    //   const signer = provider.getSigner();
    //   const destination = form.value.address;

    //   /* Convert 1 ether to wei */
    //   // const amount = ethers.utils.parseEther("0.001");
    //   const amount = ethers.utils.parseEther(form.value.amount);

    //   /* Submit transaction to the blockchain */
    //   const tx = await signer.sendTransaction({
    //     to: destination,
    //     value: amount,
    //     maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
    //     maxFeePerGas: "6000000000000", // Max fee per gas
    //   });

    //   /* Wait for transaction to be mined */
    //   const receipt = await tx.wait();

    //   return receipt;
    // } catch (error) {
    //   return error as string;
    // }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .card {
    width: 405px;
    height: 470px;
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
