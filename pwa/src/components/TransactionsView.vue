<template>
  <div id="transactions" class="container">
    <div class="header">
      <div class="left-side">
        <h2>Transactions</h2>
      </div>
      <div class="right-side">
        <div class="mini-menu">
          <MiniMenu />
        </div>
      </div>
    </div>
    <div class="table">
      <div class="full-width">
        <div class="button-container">
          <button class="tab-button" @click="swtichTab('transactions')">
            Transactions
          </button>
          <button class="tab-button" @click="swtichTab('notifications')">
            Notifications
          </button>
        </div>
        <Transactions v-if="tab === 'transactions'" />
        <Notifications v-if="tab === 'notifications'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MiniMenu from "./MiniMenu.vue";
import Transactions from "./TransactionsHistory.vue";
import Notifications from "./NotificationsHistory.vue";

const tab = ref("transactions");

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
  color: $white;
  background: $black;
  background-image: url("../assets/images/YellowCircle.png"),
    url("../assets/images/BlueLine.png");
  background-size: auto, auto;
  background-repeat: no-repeat, no-repeat;
  background-position:
    right 5em top 1em,
    left 0 top 10%;
  padding: 0;

  @include breakpoint($break-sm) {
    flex-direction: column;
    background-image: url("../assets/images/mobile_yellow.png");
    background-size: auto;
    background-repeat: no-repeat;
    background-position: left 0 bottom 0;
    padding: 32px 30px 55px 30px;
  }
}

.header {
  display: flex;
  flex-direction: row;
  padding-top: 100px;
  .left-side {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: flex-start;
    justify-content: flex-start;

    h2 {
      margin: 40px 0 10px 50px;
    }

    p {
      margin-left: 5%;
    }

    @include breakpoint($break-sm) {
      width: 100%;
    }
  }

  .right-side {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;

    @include breakpoint($break-sm) {
      width: 100%;
    }
  }

  @include breakpoint($break-sm) {
    width: 100%;
    flex-direction: column;
  }
}

.table {
  display: flex;
  flex-direction: row;
  @include breakpoint($break-sm) {
    width: 100%;
    flex-direction: column;
  }
}

.full-width {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  @include breakpoint($break-sm) {
    width: 100%;
  }
  .tab-button {
    color: $white;
    background: transparent;
    font-size: 24px;
    line-height: 22px;
    font-weight: 600;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    text-decoration-line: none;
    margin: 20px auto;
    border: 0;
    padding-bottom: 0.25rem;
    transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
    margin: 0;

    &:hover {
      color: $white;
      text-decoration: line-through;
      cursor: pointer;
    }
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
}
.mobile-hidden {
  display: block;
  @include breakpoint($break-sm) {
    display: none;
  }
}
</style>
