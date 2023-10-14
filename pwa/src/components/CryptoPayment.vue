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
  import SafeApiKit, { OwnerResponse, SafeServiceInfoResponse } from "@safe-global/api-kit";
  import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
  import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
  // import type { IProvider } from "@web3auth/base";
  import { ethers } from "ethers";
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, wallet, balance, apecoinBalance } = storeToRefs(store);

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
    console.log("cancel");
    form.value = {
      address: "",
      amount: "",
      message: "",
      fees: true,
    };
  };

  // const makePayment = async () => {
  //   console.log("makePayment");
  //   try {
  //     const { ethereum } = window;
  //     if (!ethereum) {
  //       throw Error();
  //     }
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const signer = provider.getSigner();

  //     const destination = form.value.address;

  //     /* Convert 1 ether to wei */
  //     // const amount = ethers.utils.parseEther("0.001");
  //     const amount = ethers.utils.parseEther(form.value.amount);

  //     /* Submit transaction to the blockchain */
  //     const tx = await signer.sendTransaction({
  //       to: destination,
  //       value: amount,
  //       maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
  //       maxFeePerGas: "6000000000000", // Max fee per gas
  //     });

  //     /* Wait for transaction to be mined */
  //     const receipt = await tx.wait();

  //     clearForm();
  //     return receipt;
  //   } catch (error) {
  //     return error as string;
  //   }
  // };

  const makePayment = async () => {
    console.log("sendTransaction");
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
      const ownerAddress = (await safeOwner.getAddress()).toString();
      console.log("ownerAddress", ownerAddress);
      const safes: OwnerResponse = await safeService.getSafesByOwner(wallet.value);
      console.log("Safes", safes.safes[0]);

      const serviceInfo: SafeServiceInfoResponse = await safeService.getServiceInfo();
      console.log("serviceInfo", serviceInfo);

      // const safeFactory = await SafeFactory.create({ ethAdapter });
      const safeSdk = await Safe.create({ ethAdapter, safeAddress: ownerAddress });

      const destination = form.value.address;
      const amount = ethers.utils.parseEther(form.value.amount).toString();

      const safeTransactionData: SafeTransactionDataPartial = {
        to: destination,
        data: ownerAddress,
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
        senderAddress: ownerAddress,
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

      return;
    } catch (error) {
      return error as string;
    }
  };

  onMounted(async () => {
    // await checkSafeWalletConnected();
  });
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
