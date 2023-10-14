<template>
  <div id="about" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="card">
          <h3>Safe {Wallet}</h3>
          <p v-if="!connected">
            Use Safe {{ "{WALLET}" }} to create, access and securely manage user accounts and
            multi-sig crypto wallets
          </p>
          <p v-else>
            <span class="wallet-address"
              ><span class="wallet-label">Safe {Wallet}</span> {{ safes[0] }}</span
            >
            <span class="wallet-address"
              ><span class="wallet-label">EOA {Wallet}</span> {{ wallet }}</span
            >
            <span class="account-balance">
              <span class="account-label">{ApeCoin}</span>
              <div class="account-total">
                <span class="account-icon">
                  <img src="@/assets/images/Apecoin-Icon.png" height="24" />
                </span>
                {{
                  apecoinBalance
                    ? parseFloat(apecoinBalance).toFixed(4)
                    : parseFloat("0").toFixed(4)
                }}
              </div>
            </span>
            <span class="account-balance">
              <span class="account-label">{Ethereum}</span>
              <div class="account-total">
                <span class="account-icon circle">
                  <img src="@/assets/images/eth-diamond-black.png" height="20" />
                </span>
                {{ balance ? parseFloat(balance).toFixed(4) : parseFloat("0").toFixed(4) }}
              </div>
            </span>
          </p>
          <div v-if="!connected" class="button-container">
            <button class="green-button" @click="signIn">Connect</button>
          </div>
          <div v-if="connected" class="button-container">
            <button class="grey-button-sml" @click="signOut">Logout</button>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="description">
          <h1>ApeSafe</h1>
          <p>
            ApePay offers you a Safe and secure online portal to accept ApeCoin as the preferred
            payment option for your business
          </p>
          <p></p>
          <p>
            <a class="link" href="https://safe.global/" target="_blank" alt="About Safe Wallet"
              >About Safe Wallet →
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import SafeApiKit, { OwnerResponse } from "@safe-global/api-kit";
  import { Web3AuthConfig, Web3AuthEventListener, Web3AuthModalPack } from "@safe-global/auth-kit";
  import { EthersAdapter } from "@safe-global/protocol-kit";
  import { ADAPTER_EVENTS, CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
  import { Web3AuthOptions } from "@web3auth/modal";
  import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
  import { ethers } from "ethers";
  import { storeToRefs } from "pinia";
  import { onMounted } from "vue";

  import apecoinAbi from "@/abi/ethereum-ape-token-abi.json";
  import apecoinGoerliAbi from "@/abi/goerli-ape-token-abi.json";
  import { useStore } from "@/store";

  import MiniMenu from "./MiniMenu.vue";

  /* Ape Token Contract Addresses */
  const apecoinAddress = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
  const apecoinGoerliAddress = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";
  const apecoinContract =
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? apecoinGoerliAddress
      : apecoinAddress;
  const apecoinABI = process.env.NODE_ENV === "development" ? apecoinGoerliAbi.abi : apecoinAbi.abi;

  const clientId =
    "BBfk8wSH3Kn6HREZ2PQ41USY9PzLvR56q0PJ9fxDxD8TuiFjfWIw-rrbjGynxx4GkRc2vg8lm2UPvSk-WnDunI4";
  const txServiceUrl =
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? "https://safe-transaction-goerli.safe.global"
      : "https://safe-transaction-mainnet.safe.global";

  const store = useStore();
  const { connected, balance, apecoinBalance, wallet, safes } = storeToRefs(store);

  const web3AuthConfig: Web3AuthConfig = {
    txServiceUrl: txServiceUrl,
  };

  /* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
  const options: Web3AuthOptions = {
    clientId: clientId,
    web3AuthNetwork: "testnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x5",
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
    },
    uiConfig: {
      appName: "ApePay",
      theme: "dark",
      loginMethodsOrder: ["google", "facebook"],
    },
  };

  const styles = ["color: black", "background: #12ff80"].join(";");
  console.log("%c 🐵 Environment:  %s ", styles, process.env.NODE_ENV);

  /* https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments */
  // const options: Web3AuthOptions = {
  //   clientId: clientId,
  //   web3AuthNetwork: "mainnet",
  //   chainConfig: {
  //     chainNamespace: CHAIN_NAMESPACES.EIP155,
  //     chainId: "0x1",
  //     rpcTarget: "https://rpc.ankr.com/eth",
  //   },
  //   uiConfig: {
  //     appName: "ApePay",
  //     theme: "dark",
  //     loginMethodsOrder: ["google", "facebook"],
  //   },
  // };

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
        appName: "ApePay",
      },
    },
  });

  const connectedHandler: Web3AuthEventListener = (data) => console.log("CONNECTED", data);
  const disconnectedHandler: Web3AuthEventListener = (data) => console.log("DISCONNECTED", data);
  const erroredHandler: Web3AuthEventListener = (data) => console.log("ERRORED", data);

  const signIn = async () => {
    store.setLoading(true);
    try {
      /* Instantiate and initialize the pack */
      const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      /* Subscribe to Safe web3AuthModalPack events */
      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);
      web3AuthModalPack.subscribe(ADAPTER_EVENTS.ERRORED, erroredHandler);

      const signInInfo = await web3AuthModalPack.signIn();

      // AuthKitSignInData {
      //   eoa: string // The safe signer
      //   safes?: string[] // The list of associated Safe addresses
      // }

      if (signInInfo) {
        store.setWallet(signInInfo.eoa);
        store.setSafes(signInInfo.safes);
        await checkApecoinBalance(signInInfo.eoa);
        await checkETHBalance(signInInfo.eoa);
        store.setConnected(true);
      }

      const userInfo = await web3AuthModalPack.getUserInfo();
      if (userInfo) {
        store.setUser(userInfo);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      store.setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });
      await web3AuthModalPack.signOut();
      store.setWallet(null);
      store.setSafes(null);
      store.setUser(null);
      store.setConnected(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const checkETHBalance = async (account: string) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log(`Please connect web3 wallet to continue!`);
        return;
      }
      const store = useStore();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const wei = await provider.getBalance(account);
      const ethBalance = ethers.utils.formatEther(wei);
      store.setBalance(ethBalance);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const checkApecoinBalance = async (account: string) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log(`Please connect web3 wallet to continue!`);
        return;
      }
      const store = useStore();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = new ethers.Contract(apecoinContract, apecoinABI, provider);
      const balance = await contract.balanceOf(account);
      const apecoinBalance = ethers.utils.formatUnits(balance, 18);
      store.setApecoinBalance(apecoinBalance);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const checkSafeWalletConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw Error();
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const safeOwner = provider.getSigner(0);
      const ownerAddress = (await safeOwner.getAddress()).toString();

      if (ownerAddress) {
        store.setWallet(ownerAddress);
        await checkApecoinBalance(ownerAddress);
        await checkETHBalance(ownerAddress);
        store.setConnected(true);

        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: safeOwner,
        });

        const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });
        const safes: OwnerResponse = await safeService.getSafesByOwner(ownerAddress);
        store.setSafes(safes.safes);
      }
      return;
    } catch (error) {
      console.log("Error", error);
    }
  };

  onMounted(async () => {
    await checkSafeWalletConnected();
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
      height: auto;
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
      flex-direction: column-reverse;
      padding-bottom: 50px;
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
        margin: 0 0 10px;
        padding: 6px 8px 8px;
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
        min-height: 90px;
        font-size: 26px;
        line-height: 30px;
        text-align: center;
        margin: 0 0 30px;

        .wallet-address {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          line-height: 20px;
          text-align: left;
          margin: 10px 0 0;
          span.wallet-label {
            width: 96px;
            padding: 2px 4px 4px;
            border-radius: 5px;
            color: $black;
            background: $safe-stone;
            margin-right: 8px;
            text-align: center;
          }
        }
        .account-balance {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          line-height: 20px;
          text-align: left;
          margin: 10px 0 0;

          .account-icon {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            img,
            svg {
              background: transparent;
              object-fit: contain;
              overflow: hidden;
              margin-right: 4px;
              margin-bottom: -2px;
            }
          }
          .account-icon.circle {
            width: 20px;
            height: 20px;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background: $white;
            margin-right: 8px;
            margin-bottom: 0;
            img,
            svg {
              display: block;
              height: 18px;
              object-fit: cover;
              overflow: hidden;
              margin: 0 auto;
              padding: 0;
            }
          }

          span.account-label {
            width: 96px;
            padding: 2px 4px 4px;
            border-radius: 5px;
            color: $black;
            background: $safe-stone;
            margin-right: 8px;
            text-align: center;
          }

          .account-separator {
            display: inline-flex;
            width: 1px;
            height: 18px;
            margin: 0 8px;
            background-color: rgba(255, 255, 255, 0.5);
          }
          .account-total {
            font-size: 18px;
            line-height: 20px;
            text-align: left;
            margin: 10px 0 0;
            width: auto;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
          }
        }
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

      h1 {
        font-family: "TWKEverett";
        font-style: normal;
        font-weight: 400;
        font-size: 60px;
        line-height: 68px;
        text-align: left;
        margin: 50px 0 20px;
        @include breakpoint($break-sm) {
          font-size: 30px;
          line-height: 34px;
          margin: 0 0 26px;
        }
        @include breakpoint($break-md) {
          font-size: 40px;
          line-height: 48px;
          margin: 30px 0;
        }
      }

      p {
        font-family: "TWKEverett";
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
        line-height: 42px;
        text-align: left;
        margin: 0 0 30px;
      }
    }
  }
</style>
