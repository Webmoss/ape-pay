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
            <button v-if="!wallet" class="green-button" @click="signIn">
              Connect
            </button>
            <button v-if="wallet" class="grey-button" @click="signOut">
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
<script setup>
import { ethers } from "ethers";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import MiniMenu from "./MiniMenu.vue";
import {
  safeSignIn,
  createSafeWallet,
  safeSignOut,
} from "../services/safeWallet.js";

const store = useStore();
const { wallet } = storeToRefs(store);

const signIn = async () => {
  store.setLoading(true);
  try {
    const safeWallet = await safeSignIn();
    console.log("Safe Wallet Sign In", safeWallet);

    if (safeWallet) {
      store.setWallet(safeWallet);
      console.log("Wallet :", wallet.value);
      store.setConnected(true);
    }
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
  }
};

const signUp = async () => {
  store.setLoading(true);
  try {
    const newWallet = await createSafeWallet();
    console.log("Safe Wallet Created", newWallet);

    if (newWallet) {
      store.setWallet(newWallet);
      console.log("Wallet :", wallet.value);
      store.setConnected(true);
    }
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
  }
};

const signOut = async () => {
  store.setLoading(true);
  try {
    const walletLog = await safeSignOut();
    console.log("Safe Wallet Signed Out", walletLog);

    store.setWallet(null);
    console.log("Wallet :", wallet.value);
    store.setConnected(false);
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
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
    console.log("Safe Owner", safeOwner);

    if (safeOwner) {
      store.setConnected(true);
    }
  } catch (error) {
    console.log("Error", error);
  } finally {
    store.setLoading(false);
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
  background-position:
    top right,
    bottom 2em left 1em;
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
