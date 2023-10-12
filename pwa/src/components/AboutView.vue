<template>
  <div id="about" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="card">
          <h3>Safe {Wallet}</h3>
          <p>
            Use Safe {{ "{WALLET}" }} to create, access and securely manage user
            accounts and multi-sig crypto wallets
          </p>
          <div class="button-container">
            <button v-if="!wallet" @click="signUp">Signup</button>
            <button v-if="!connected" class="green-button" @click="signIn">
              Connect
            </button>
            <button v-if="connected" class="grey-button" @click="signOut">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="description">
          <h1>ApeSafe</h1>
          <p>
            ApePay offers you a Safe and secure online portal to accept ApeCoin
            as the preferred payment option for your business
          </p>
          <p></p>
          <p>
            <a
              class="link"
              href="https://safe.global/"
              target="_blank"
              alt="About Safe Wallet"
              >About Safe Wallet →
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store/index";
import type { IProvider } from "@web3auth/base";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { Web3AuthOptions } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthModalPack, Web3AuthConfig, Web3AuthEventListener } from '@safe-global/auth-kit';
// import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

// import SafeApiKit, {
//   SafeServiceInfoResponse,
//   OwnerResponse,
// } from "@safe-global/api-kit";

import MiniMenu from "./MiniMenu.vue";

const store = useStore();
const { connected, wallet } = storeToRefs(store);

const provider = ref<IProvider | any>(false);
const web3AuthModalPack = ref();
// const safeAuthSignInResponse = ref();

const clientId = "BBfk8wSH3Kn6HREZ2PQ41USY9PzLvR56q0PJ9fxDxD8TuiFjfWIw-rrbjGynxx4GkRc2vg8lm2UPvSk-WnDunI4"
console.log("clientId",clientId);


const styles = ["color: black", "background: #12ff80"].join(";");
console.log("%c 🐵 Environment:  %s ", styles, process.env.NODE_ENV );

/* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
// const options: Web3AuthOptions = {
//   clientId: clientId,
//   web3AuthNetwork: 'testnet',
//   chainConfig: {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: '0x5',
//     rpcTarget: 'https://rpc.ankr.com/eth_goerli'
//   },
//   uiConfig: {
//     appName: "ApePay",
//     theme: 'dark',
//     loginMethodsOrder: ['google', 'facebook']
//   }
// }

/* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
const options: Web3AuthOptions = {
  clientId: clientId,
  web3AuthNetwork: 'mainnet',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: 'https://rpc.ankr.com/eth_goerli'
  },
  uiConfig: {
    appName: "ApePay",
    theme: 'dark',
    loginMethodsOrder: ['google', 'facebook']
  }
}


/* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters */
const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: 'torus',
    showOnModal: false
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: 'metamask',
    showOnDesktop: true,
    showOnMobile: false
  }
}

/* https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization */
const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: 'mandatory'
  },
  adapterSettings: {
    clientId: clientId,
    uxMode: 'popup',
    whiteLabel: {
      name: 'ApePay'
    }
  },
})

const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: 'https://safe-transaction-goerli.safe.global'
}

const connectedHandler: Web3AuthEventListener = (data) => console.log("CONNECTED", data);
const disconnectedHandler: Web3AuthEventListener = (data) => console.log("DISCONNECTED", data);
const erroredHandler: Web3AuthEventListener = (data) => console.log("ERRORED", data);

const signIn = async () => {
  store.setLoading(true);
  try {
    if (!web3AuthModalPack.value) return;
    console.log("web3AuthModalPack.value",web3AuthModalPack.value);

    const signInInfo = await web3AuthModalPack.value.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    // AuthKitSignInData {
    //   eoa: string // The safe signer
    //   safes?: string[] // The list of associated Safe addresses
    // }

    const userInfo = await web3AuthModalPack.value.getUserInfo();
    console.log("USER INFO: ", userInfo);

    if (userInfo) {
      store.setWallet(signInInfo.eoa);
      store.setSafes(signInInfo.safes);
      store.setUser(userInfo);
      console.log("Wallet: ", wallet.value);
      store.setConnected(true);
    }
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
  }
};

const signUp = async () => {
  // store.setLoading(true);
  // try {
  //   const newWallet = await createSafeWallet();
  //   console.log("Safe Wallet Created", newWallet);
  //   if (newWallet) {
  //     store.setWallet(newWallet);
  //     console.log("Wallet :", wallet.value);
  //     store.setConnected(true);
  //   }
  // } catch (error) {
  //   console.log("Error", error);
  // } finally {
  //   store.setLoading(false);
  // }
};

const signOut = async () => {
  try {
    await web3AuthModalPack.value.signOut();
    store.setWallet({});
    store.setConnected(false);
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
  }
};

// const signTxn = async () => {
//   store.setLoading(true);
//   try {
//     const provider = new ethers.providers.Web3Provider(
//       web3AuthModalPack.value.getProvider()
//     );
//     const signer = provider.getSigner();

//     const ethAdapter = new EthersAdapter({
//       ethers,
//       signerOrProvider: signer || provider,
//     });

//     const safeSDK = await Safe.create({
//       ethAdapter,
//       safeAddress,
//     });
//     // Create a Safe transaction with the provided parameters
//     const safeTransactionData: MetaTransactionData = {
//       to: "0x",
//       data: "0x",
//       value: ethers.utils.parseUnits("0.0001", "ether").toString(),
//     };

//     const safeTransaction = await safeSDK.createTransaction({
//       safeTransactionData,
//     });
//   } catch (error) {
//     console.log("Error", error);
//   } finally {
//     store.setLoading(false);
//   }
// };


  const checkSafeWalletConnected = async () => {
    try {
      // const { ethereum } = window;
      // if (!ethereum) {
      //   throw Error();
      // }
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const safeOwner = provider.getSigner(0);
      // console.log("Safe Owner", safeOwner);

      /* Instantiate and initialize the pack */
      const newweb3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
      await newweb3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      web3AuthModalPack.value = newweb3AuthModalPack;

      web3AuthModalPack.value.subscribe(
        ADAPTER_EVENTS.CONNECTED,
        connectedHandler
      );
      web3AuthModalPack.value.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );
      web3AuthModalPack.value.subscribe(ADAPTER_EVENTS.ERRORED, erroredHandler);

      // Instantiate an EthAdapter
      // const ethAdapter = new EthersAdapter({
      //   ethers,
      //   signerOrProvider: safeOwner,
      // });

      // Initialize the Safe API Kit
      // const txServiceUrl = "https://safe-transaction-goerli.safe.global";
      // const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
      // const serviceInfo: SafeServiceInfoResponse =
      //   await safeService.getServiceInfo();
      // console.log("serviceInfo", serviceInfo);

      // const ownerAddress = (await safeOwner.getAddress()).toString();
      // const safes: OwnerResponse = await safeService.getSafesByOwner(
      //   ownerAddress
      // );
      // console.log("safes", safes);

      // Initialize the Protocol Kit
      // const safeFactory = await SafeFactory.create({ ethAdapter });
      // const safeSdk = await Safe.create({ ethAdapter, ownerAddress });

      // if (safeOwner) {
      //   store.setConnected(true);
      // }
    } catch (error) {
      console.log("Error", error);
    } finally {
      store.setLoading(false);
    }
  };

  onMounted(async () => {
    await checkSafeWalletConnected();
  });

  onUnmounted(async () => {
    if(web3AuthModalPack.value){
      web3AuthModalPack.value.unsubscribe(
        ADAPTER_EVENTS.CONNECTED,
        connectedHandler
      );
      web3AuthModalPack.value.unsubscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );
      web3AuthModalPack.value.unsubscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );
    }
  });

</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .container {
    display: flex;
    flex-direction: column;
    height: 55rem;
    color: $black;
    background: $white;
    background-image: url("../assets/svgs/safe.svg"),
      url("../assets/images/Safe_Logos_Symbol_Black.png");
    background-size: contain, 160px;
    background-repeat: no-repeat, no-repeat;
    background-position: top right, bottom 2em left 1em;
    padding: 0;

    @include breakpoint($break-sm) {
      flex-direction: column;
      background-image: url("../assets/images/mobile_grey.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: top 0 right;
      padding: 32px 30px 0 30px;
    }
  }

  .intro {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0;
    @include breakpoint($break-sm) {
      width: 100%;
    }
  }

  .left-side {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 100%;
    }
    @include breakpoint($break-md) {
      width: 100%;
    }

    .card {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      padding: 4em 2em 3em;
      border-radius: 16px;
      color: $white;
      border: 5px solid $safe-green;
      background: $black;

      @include breakpoint($break-sm) {
        margin-top: 20px;
        padding: 1em;
        margin: 0 auto;
        width: 90%;
      }

      h3 {
        font-family: "TWKEverett";
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 42px;
        text-align: left;
        margin: 0 0 40px;
        padding: 4px 8px 8px;
        border-radius: 5px;
        color: $black;
        background: $safe-green;

        @include breakpoint($break-sm) {
          font-size: 20px;
          line-height: 24px;
          margin: 0 0 15px;
        }

        @include breakpoint($break-md) {
          font-size: 22px;
          line-height: 26px;
          margin: 0 0 20px;
        }
      }

      p {
        font-size: 26px;
        line-height: 30px;
        text-align: center;
        margin: 0 0 30px;
      }
    }
  }

  .right-side {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 100%;
    }
    @include breakpoint($break-md) {
      width: 100%;
    }

    .description {
      margin: 0 auto;
      padding: 30px;

      @include breakpoint($break-sm) {
        padding: 20px;
      }

      p {
        text-align: center;
      }
    }
  }
</style>
