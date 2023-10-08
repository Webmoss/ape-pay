<template>
  <div id="payments" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="description">
          <h2>Payments</h2>
          <p>
            Connect your safe wallet and select your preferred payment method.
          </p>
        </div>
      </div>
      <div class="right-side">
        <div class="card">
          <h3>ApeSafe</h3>
          <p>This is some text</p>
          <p>a form will live here</p>
          <div class="button-container">
            <button class="grey-button" v-if="!account" @click="connectWallet">
              Connect
            </button>
            <button class="blue-button" @click="makePayment">Pay Now</button>
          </div>
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
const { account } = storeToRefs(store);

const makePayment = async () => {
  console.log("makePayment");
};

const connectWallet = async () => {
  store.setLoading(true);
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please connect wallet to continue!");
      return;
    }
    const [accountAddress] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("accountAddress", accountAddress);

    if (accountAddress) {
      store.setAccount(accountAddress);
      store.setLoading(false);
    }
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
};

const checkIfWalletIsConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log(`Please connect wallet to continue!`);
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      store.setAccount(accounts[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await checkIfWalletIsConnected();
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
  background: $grey-20;
  background-image: url("../assets/images/large_blue_graphic.png"),
    url("../assets/images/YellowCircle.png");
  background-size: auto, auto;
  background-repeat: no-repeat, no-repeat;
  background-position:
    top 10em left -3em,
    right 8em bottom 6em;
  padding: 0;

  @include breakpoint($break-sm) {
    flex-direction: column;
    background-image: url("../assets/images/large_blue_graphic.png"),
      url("../assets/images/mobile_yellow.png");
    background-size: auto, auto;
    background-repeat: no-repeat, no-repeat;
    background-position:
      top 5em left,
      right 1em bottom 1em;
    padding: 32px 30px 55px 30px;
  }
}

.intro {
  display: flex;
  flex-direction: row;
  @include breakpoint($break-sm) {
    flex-direction: column;
    padding-top: 50px;
  }
}
.left-side {
  width: 40%;
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

.right-side {
  width: 60%;
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
    border-radius: 30px;
    border: 1px solid $grey-100;
    color: $black;
    background: $white;
  }
}
</style>
