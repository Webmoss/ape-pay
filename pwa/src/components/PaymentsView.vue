<template>
  <div id="payments" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="description">
          <h2>ApeCoin<br />Payments</h2>
          <p>
            1. Connect your Safe {Wallet}<br />
            2. Select your payment method<br />
            3. Use ApeCoin for transaction fees<br />
            4. Optimise your gas costs off-chain
          </p>
          <p>
            <a class="link" href="https://apecoin.com/" target="_blank" alt="About ApeCoin"
              >ApeCoin Powered →
            </a>
            <br />
            <a class="link" href="https://tableland.xyz/" target="_blank" alt="About Tableland"
              >Tableland NFT Receipts →
            </a>
            <br />
            <a class="link" href="https://xmtp.org/" target="_blank" alt="About XMTP Chat"
              >XMTP Messaging →
            </a>
          </p>
        </div>
      </div>
      <div class="right-side">
        <div class="button-container">
          <button
            class="tab-button"
            :class="tab === 'crypto' ? 'active' : ''"
            @click="swtichTab('crypto')"
          >
            Crypto Payment
          </button>
          <button
            class="tab-button"
            :class="tab === 'multi-sig' ? 'active' : ''"
            @click="swtichTab('multi-sig')"
          >
            Multi-Sig
          </button>
          <button
            class="tab-button"
            :class="tab === 'credit' ? 'active' : ''"
            @click="swtichTab('credit')"
          >
            Credit Card
          </button>
        </div>
        <CryptoPayment v-if="tab === 'crypto'" />
        <MultiSig v-if="tab === 'multi-sig'" />
        <CreditCard v-if="tab === 'credit'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";

  import CreditCard from "./CreditCard.vue";
  import CryptoPayment from "./CryptoPayment.vue";
  import MiniMenu from "./MiniMenu.vue";
  import MultiSig from "./MultiSig.vue";

  const tab = ref("crypto");

  const swtichTab = (type: string) => {
    tab.value = type;
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";
  .container {
    display: flex;
    flex-direction: column;
    height: 55rem;
    color: $black;
    background: $safe-stone;
    background-image: url("../assets/images/large_blue_graphic.png"),
      url("../assets/images/GreySwirlBG.png");
    background-size: auto, contain;
    background-repeat: no-repeat, no-repeat;
    background-position: top 10em left -3em, right 0 top 0;
    padding: 0;

    @include breakpoint($break-sm) {
      height: auto;
      flex-direction: column;
      background-image: url("../assets/images/large_blue_graphic.png");
      background-size: auto;
      background-repeat: no-repeat;
      background-position: top 5em left;
      padding: 32px 30px 55px 30px;
    }
  }

  .intro {
    display: flex;
    flex-direction: row;
    @include breakpoint($break-sm) {
      width: 100%;
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

    @include breakpoint($break-sm) {
      width: 100%;
    }

    .description {
      margin: 0 auto;
      padding: 30px;

      h2 {
        font-family: "TWKEverett";
        font-style: normal;
        font-weight: 400;
        font-size: 78px;
        line-height: 86px;
        text-align: left;
        margin: 50px 0 30px;
        @include breakpoint($break-sm) {
          font-size: 34px;
          margin: 0 0 26px;
        }
        @include breakpoint($break-md) {
          font-size: 48px;
          line-height: 74px;
          margin: 30px 0;
        }
      }

      p {
        font-size: 26px;
        line-height: 30px;
        text-align: left;
        margin: 0 0 30px;
      }
    }
  }

  .right-side {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;

    @include breakpoint($break-sm) {
      width: 100%;
    }
    .tab-button {
      color: $black;
      background: transparent;
      font-size: 20px;
      line-height: 22px;
      font-weight: 600;
      font-style: normal;
      text-align: center;
      text-decoration: none;
      text-decoration-line: none;
      margin: 5px;
      border: 0;
      padding-bottom: 0.25rem;
      transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
      cursor: pointer;

      &:hover,
      &:active {
        color: $black;
        text-decoration: line-through;
        cursor: pointer;
      }
      &:active {
        color: $black;
        text-decoration: line-through;
        cursor: pointer;
      }
      &:focus,
      &:focus-visible {
        outline: none;
      }
    }

    .tab-button.active {
      color: $black;
      text-decoration: line-through;
      cursor: pointer;
    }
  }
  .mobile-hidden {
    display: block;
    @include breakpoint($break-sm) {
      display: none;
    }
  }
</style>
