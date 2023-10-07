<template>
  <div id="payments" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="description">
          <div class="slogan">Payments</div>
          <p>Connect your safe wallet, and make payment</p>
          <button v-if="!account" class="connect-button" @click="connectWallet">
            Connect
          </button>
        </div>
      </div>
      <div class="right-side">
        <p>This is some text</p>
        <p>a form will live here</p>

        <div class="button-container">
          <button v-if="account" class="connect-button" @click="makePayment">
            Pay Now
          </button>
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
}

.right-side {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.description {
  margin: 0 0 50px 50px;

  @include breakpoint($break-xl) {
    margin: 64px 0 0;
    width: 70%;
  }
}
</style>
