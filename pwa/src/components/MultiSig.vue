<template>
  <div id="crypto-card" class="card">
    <div v-if="tab === 'multi-sig'" class="payment-form">
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
    </div>
    <div v-if="tab === 'payment'" class="payment-form">
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
      <div class="button-container">
        <button v-if="connected" class="grey-button-sml" @click="swtichTab('multi-sig')">
          Back
        </button>
        <button v-if="connected" class="green-button-sml" :disabled="disabled" @click="makePayment">
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SafeApiKit, { OwnerResponse, SafeServiceInfoResponse } from "@safe-global/api-kit";
  import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
  import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
  // import type { IProvider } from "@web3auth/base";
  import { ethers } from "ethers";
  import { Notyf } from "notyf";
  import { storeToRefs } from "pinia";
  import { ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, wallet, ethBalance, apecoinBalance } = storeToRefs(store);

  const txServiceUrl =
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? "https://safe-transaction-goerli.safe.global"
      : "https://safe-transaction-mainnet.safe.global";

  /* Create an instance of Notyf */
  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: "center",
      y: "bottom",
    },
    types: [
      {
        type: "loading",
        background: "orange",
        duration: 15000,
        dismissible: false,
        icon: {
          className: "icon icon-loading",
          tagName: "i",
        },
      },
      {
        type: "success",
        background: "green",
        duration: 20000,
        dismissible: false,
        icon: {
          className: "icon icon-success",
          tagName: "i",
        },
      },
      {
        type: "error",
        background: "indianred",
        duration: 10000,
        dismissible: false,
        icon: {
          className: "icon icon-error",
          tagName: "i",
        },
      },
    ],
  });

  const disabled = ref(false);
  const tab = ref("multi-sig");

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

  const swtichTab = (type: string) => {
    tab.value = type;
  };

  const clearForm = async () => {
    multiSigs.value = {
      addressOne: "",
      addressTwo: "",
      addressThree: "",
      addressFour: "",
    };
    form.value = {
      address: "",
      amount: "",
      message: "",
      fees: false,
    };
  };

  const makePayment = async () => {
    /* Init loading indicator */
    const loadingIndicator = notyf.open({
      type: "loading",
      message: "⏳ Processing payment now...please wait!",
    });

    /* Disable our Pay Now button */
    disabled.value = true;

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
      const safeAddress = (await safeOwner.getAddress()).toString();
      console.log("safeAddress", safeAddress);

      const safes: OwnerResponse = await safeService.getSafesByOwner(wallet.value);
      console.log("Safes", safes.safes[0]);

      const serviceInfo: SafeServiceInfoResponse = await safeService.getServiceInfo();
      console.log("serviceInfo", serviceInfo);

      // const safeFactory = await SafeFactory.create({ ethAdapter });
      const safeSdk = await Safe.create({ ethAdapter, safeAddress: safeAddress });

      const destination = form.value.address;
      console.log("destination", destination);

      const amount = ethers.utils.parseUnits(form.value.amount, "ether").toHexString();
      console.log("amount", amount);

      const message = form.value.message;
      console.log("message", message);

      const safeTransactionData: SafeTransactionDataPartial = {
        to: destination,
        data: safeAddress,
        value: amount,
        // operation, // Optional
        // safeTxGas, // Optional
        // baseGas, // Optional
        // gasPrice, // Optional
        // gasToken, // Optional
        // refundReceiver, // Optional
        // nonce, // Optional
      };

      const safeTransaction = await safeSdk.createTransaction({ safeTransactionData });
      const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
      const senderSignature = await safeSdk.signTransactionHash(safeTxHash);

      await safeService.proposeTransaction({
        safeAddress: safes.safes[0],
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: safeAddress,
        senderSignature: senderSignature.data,
        origin,
      });
      const pendingTransactions = await safeService.getPendingTransactions(safes.safes[0]);

      /* Assumes that the first pending transaction is the transaction you want to confirm */
      const transaction = pendingTransactions[0];
      const safeTxnHash = transaction.safeTxHash;
      const safeTxn = await safeService.getTransaction(safeTxnHash);
      const executeTxResponse = await safeSdk.executeTransaction(safeTxn);
      const receipt = await executeTxResponse.transactionResponse?.wait();

      console.log("Transaction executed:");
      console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`);

      const afterBalance = await safeSdk.getBalance();
      console.log(
        `The final balance of the Safe: ${ethers.utils.formatUnits(afterBalance, "ether")} ETH`
      );

      /* Remove loading indicator and show success notification */
      notyf.dismiss(loadingIndicator);
      notyf.open({
        type: "success",
        message: `Payment successful`,
      });

      const paymentDate = new Date();
      const paymentDateTimestamp = paymentDate.getTime();
      const paymentDateString = paymentDateTimestamp.toString();
      console.log("Payment Date :", paymentDateString);

      /* Update our Balances */
      store.checkApecoinBalance(safeAddress);
      store.checkETHBalance(safeAddress);

      /* Clear Form */
      clearForm();
      /* Enable our Pay Now button */
      disabled.value = false;
      return;
    } catch (error) {
      notyf.dismiss(loadingIndicator);
      notyf.error("❌ Error processing payment!");
      /* Enable our Pay Now button */
      disabled.value = false;
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
  .margin-top {
    margin-top: 10px;
  }
</style>
