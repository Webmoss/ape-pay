<template>
  <div id="about" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="left-side">
        <div class="card">
          <h3>ApeSafe</h3>
          <p>This is some text</p>
          <p>a form will live here</p>
          <div class="button-container">
            <button v-if="!account" @click="signup">Signup</button>
            <button class="blue-button">Wallet</button>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="description">
          <h1>ApePay</h1>
          <p>
            ApePay offers a safe &amp; secure online portal for merchants and
            institutions that wish to offer ApeCoin as a preferred payment
            option<br />
            <a
              class="link"
              href="https://apecoin.com/"
              target="_blank"
              alt="About ApeCoin "
              >About ApeCoin →
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import MiniMenu from "./MiniMenu.vue";

const store = useStore();
const { account } = storeToRefs(store);

const signup = async () => {
  console.log("Safe Signup");
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
  background: $white;
  background-image: url("../assets/images/GreySwirlBG.png"),
    url("../assets/images/Safe_Logos_H-Lockup_Black.png"),
    url("../assets/images/mobile_yellow.png");
  background-size: contain, 200px, auto;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position:
    top right,
    top 4em left 2em,
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
    border-radius: 30px;
    border: 1px solid $grey-100;
    color: $black;
    background: $grey-20;
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
