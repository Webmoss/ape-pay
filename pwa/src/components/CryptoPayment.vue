<template>
  <div id="crypto-card" class="card">
    <div class="payment-form">
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
            {{ ethBalance ? parseFloat(ethBalance).toFixed(4) : parseFloat("0").toFixed(4) }}
          </div>
        </span>
      </div>
      <div class="checkbox-row">
        <input v-model="form.fees" name="fees" type="checkbox" class="checkbox-input" />
        <label for="fees" class="checkbox-label">Pay fees with ApeCoin</label>
      </div>
      <div class="button-container-end">
        <button v-if="connected" class="green-button-sml" :disabled="sending" @click="makePayment">
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SafeApiKit, { OwnerResponse } from "@safe-global/api-kit";
  import { EthersAdapter } from "@safe-global/protocol-kit";
  import { ethers } from "ethers";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, wallet, ethBalance, apecoinBalance } = storeToRefs(store);

  const txServiceUrl =
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? "https://safe-transaction-goerli.safe.global"
      : "https://safe-transaction-mainnet.safe.global";

  const form = ref({
    address: "",
    amount: "",
    message: "",
    fees: true,
  });

  const clearForm = async () => {
    form.value = {
      address: "",
      amount: "",
      message: "",
      fees: true,
    };
  };

  const sending = ref(false);

  const makePayment = async () => {
    console.log("makePayment");
    sending.value = true;
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error();
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const safeOwner = provider.getSigner(0);

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });

      const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
      const safes: OwnerResponse = await safeService.getSafesByOwner(wallet.value);
      console.log("Safes", safes.safes[0]);

      const safeAddress = (await safeOwner.getAddress()).toString();
      console.log("safeAddress", safeAddress);

      const destination = form.value.address;
      console.log("destination", destination);

      const amount = ethers.utils.parseUnits(form.value.amount, "ether").toHexString();
      console.log("amount", amount);

      const message = form.value.message;
      console.log("message", message);

      const transactionParameters = {
        to: destination,
        value: amount,
      };

      const tx = await safeOwner.sendTransaction(transactionParameters);

      console.log(`Transaction Hash: https://goerli.etherscan.io/tx/${tx.hash}`);
      console.log(`Transaction Hash: https://etherscan.io/tx/${tx.hash}`);

      /* Wait for transaction to be mined */
      const receipt = await tx.wait();
      console.log("Receipt", receipt);

      /* Update our Balances */
      store.checkApecoinBalance(safeAddress);
      store.checkETHBalance(safeAddress);

      /* Clear Form */
      clearForm();
      sending.value = false;
      return;
    } catch (error) {
      return error as string;
    }
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
