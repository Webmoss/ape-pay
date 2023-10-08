<template>
  <div id="about" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="card">
          <h3>Safe {Wallet}</h3>
          <p>This is some text</p>
          <p>a form will live here</p>
          <div class="button-container">
            <button v-if="!wallet" @click="signup">Signup</button>
            <button class="green-button">Wallet</button>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="description">
          <h1>ApeSafe</h1>
          <p>
            ApePay offers you a Safe and secure online portal to make ApeCoin
            the preferred payment option for your online store or businesses.
          </p>
          <p>
            Uses Safe {{ "{WALLET}" }} to create and securely manage users and
            multi-sig crypto wallets.
          </p>
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
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import MiniMenu from "./MiniMenu.vue";

const store = useStore();
const { wallet } = storeToRefs(store);

const signup = async () => {
  console.log("Safe Signup");
};

const checkSafeWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log(`Please connect wallet to continue!`);
      return;
    }
    const safeWallet = await ethereum.request({ method: "eth_accounts" });
    if (safeWallet.length !== 0) {
      store.setWallet(safeWallet);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await checkSafeWallet();
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
    url("../assets/images/Safe_Logos_H-Lockup_Black.png");
  background-size: contain, 200px;
  background-repeat: no-repeat, no-repeat;
  background-position:
    top right,
    bottom 2em left 2em;
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
}

.left-side {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  .card {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    padding: 2em;
    border-radius: 16px;
    color: $white;
    border: 2px solid $safe-green;
    background: $black;

    h3 {
      font-family: "TWKEverett";
      font-style: normal;
      font-weight: 400;
      font-size: 30px;
      line-height: 36px;
      text-align: left;
      margin: 0 0 15px;
      padding: 5px 10px;
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
        margin: 0 0 15px;
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
  .description {
    margin: 0 auto;
    padding: 30px;
  }
}
</style>
