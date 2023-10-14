<template>
  <div id="crypto-card" class="card">
    <form v-if="tab === 'multi-sig'">
      <div class="input-row">
        <label for="addressOne">1. Multi-Sig Wallet</label>
        <input
          v-model="multiSigs.addressOne"
          name="addressOne"
          type="text"
          class="address-input"
          placeholder="First address"
        />
      </div>
      <div class="input-row">
        <label for="addressTwo">2.Multi-Sig Wallet</label>
        <input
          v-model="multiSigs.addressTwo"
          name="addressTwo"
          type="text"
          class="address-input"
          placeholder="Second address"
        />
      </div>
      <div class="input-row">
        <label for="addressThree">3.Multi-Sig Wallet</label>
        <input
          v-model="multiSigs.addressThree"
          name="addressThree"
          type="text"
          class="address-input"
          placeholder="Third address"
        />
      </div>
      <div class="input-row">
        <label for="addressFour">4.Multi-Sig Wallet</label>
        <input
          v-model="multiSigs.addressFour"
          name="addressFour"
          type="text"
          class="address-input"
          placeholder="Fourth address"
        />
      </div>
      <div class="button-container-end margin-top">
        <button class="blue-button-sml" @click="swtichTab('payment')">Next</button>
      </div>
    </form>
    <form v-if="tab === 'payment'">
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
      <div class="button-container">
        <button v-if="connected" class="grey-button-sml" @click="swtichTab('multi-sig')">
          Back
        </button>
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

  const multiSigs = ref({
    addressOne: "",
    addressTwo: "",
    addressThree: "",
    addressFour: "",
  });

  const form = ref({
    address: "",
    amount: "",
    message: "",
    fees: true,
  });

  const tab = ref("multi-sig");

  const swtichTab = (type: string) => {
    tab.value = type;
  };

  // const cancel = async () => {
  //   console.log("cancel");
  //   multiSigs.value = {
  //     addressOne: "",
  //     addressTwo: "",
  //     addressThree: "",
  //     addressFour: "",
  //   };
  //   form.value = {
  //     address: "",
  //     amount: "",
  //     message: "",
  //     fees: true,
  //   };
  // };

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
  .margin-top {
    margin-top: 10px;
  }
</style>
