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
  import { Web3AuthConfig, Web3AuthEventListener, Web3AuthModalPack } from "@safe-global/auth-kit";
  import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
  // import type { IProvider } from "@web3auth/base";
  import { ADAPTER_EVENTS, CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
  import { Web3AuthOptions } from "@web3auth/modal";
  import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
  import { ethers } from "ethers";
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";

  import { useStore } from "@/store";

  const store = useStore();
  const { connected, wallet, safes, balance, apecoinBalance } = storeToRefs(store);

  // const provider = ref<IProvider | any>(false);

  const clientId =
    "BBfk8wSH3Kn6HREZ2PQ41USY9PzLvR56q0PJ9fxDxD8TuiFjfWIw-rrbjGynxx4GkRc2vg8lm2UPvSk-WnDunI4";

  /* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
  // const options: Web3AuthOptions = {
  //   clientId: clientId,
  //   web3AuthNetwork: "testnet",
  //   chainConfig: {
  //     chainNamespace: CHAIN_NAMESPACES.EIP155,
  //     chainId: "0x5",
  //     rpcTarget: "https://rpc.ankr.com/eth_goerli",
  //   },
  //   uiConfig: {
  //     appName: "ApePay",
  //     theme: "dark",
  //     loginMethodsOrder: ["google", "facebook"],
  //   },
  // };

  /* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
  const options: Web3AuthOptions = {
    clientId: clientId,
    web3AuthNetwork: "mainnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
    },
    uiConfig: {
      appName: "ApePay",
      theme: "dark",
      loginMethodsOrder: ["google", "facebook"],
    },
  };

  /* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters */
  const modalConfig = {
    [WALLET_ADAPTERS.TORUS_EVM]: {
      label: "torus",
      showOnModal: false,
    },
    [WALLET_ADAPTERS.METAMASK]: {
      label: "metamask",
      showOnDesktop: true,
      showOnMobile: false,
    },
  };

  /* https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization */
  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: "mandatory",
    },
    adapterSettings: {
      clientId: clientId,
      uxMode: "popup",
      whiteLabel: {
        name: "ApePay",
      },
    },
  });

  const web3AuthConfig: Web3AuthConfig = {
    txServiceUrl: "https://safe-transaction-goerli.safe.global",
  };

  const connectedHandler: Web3AuthEventListener = (data) => console.log("CONNECTED", data);
  const disconnectedHandler: Web3AuthEventListener = (data) => console.log("DISCONNECTED", data);
  const erroredHandler: Web3AuthEventListener = (data) => console.log("ERRORED", data);

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

  const signTxn = async () => {
    store.setLoading(true);
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error();
      }

      /* Instantiate and initialize the pack */
      const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      const provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider());
      const signer = provider.getSigner();

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer || provider,
      });

      const safeOwner = web3AuthModalPack.getSafes("0");

      const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress,
      });

      // Create a Safe transaction with the provided parameters
      const safeTransactionData: MetaTransactionData = {
        to: "0x",
        data: "0x",
        value: ethers.utils.parseUnits("0.0001", "ether").toString(),
      };

      const safeTransaction = await safeSDK.createTransaction({
        safeTransactionData,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
      store.setLoading(false);
    }
  };

  const sendTransaction = async () => {
    console.log("sendTransaction");
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error();
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const safeOwner = provider.getSignerSafeApiKit(0);
      console.log("Safe Owner", safeOwner);

      /* Instantiate an EthAdapter */
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner,
      });

      // Initialize the Safe API Kit
      const txServiceUrl = "https://safe-transaction-goerli.safe.global";
      const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });

      const serviceInfo: SafeServiceInfoResponse = await safeService.getServiceInfo();
      console.log("serviceInfo", serviceInfo);

      const ownerAddress = (await safeOwner.getAddress()).toString();
      const safes: OwnerResponse = await safeService.getSafesByOwner(ownerAddress);
      console.log("safes", safes);

      /* Initialize the Protocol Kit */
      const safeFactory = await SafeFactory.create({ ethAdapter });
      const safeSdk = await Safe.create({ ethAdapter, safeAddress });

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
