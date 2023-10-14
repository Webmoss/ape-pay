<template>
  <div id="transactions" class="container">
    <div class="header">
      <div class="left-side">
        <div class="button-container">
          <button
            class="tab-button"
            :class="tab === 'transactions' ? '' : 'active'"
            @click="swtichTab('transactions')"
          >
            Transactions
          </button>
          <button
            class="tab-button"
            :class="tab === 'notifications' ? '' : 'active'"
            @click="swtichTab('notifications')"
          >
            Notifications
          </button>
        </div>
      </div>
      <div class="right-side">
        <div class="mini-menu">
          <MiniMenu />
        </div>
      </div>
    </div>
    <div class="table">
      <div class="full-width">
        <Transactions v-if="tab === 'transactions'" />
        <Notifications v-if="tab === 'notifications'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";

  import MiniMenu from "./MiniMenu.vue";
  import Notifications from "./NotificationsHistory.vue";
  import Transactions from "./TransactionsHistory.vue";

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
    background-image: url("../assets/images/BlueLine.png");
    background-size: auto;
    background-repeat: no-repeat;
    background-position: left 0 top 10%;
    padding: 0;

    @include breakpoint($break-sm) {
      height: auto;
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
      height: 190px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: flex-start;
      justify-content: flex-end;

      @include breakpoint($break-sm) {
        width: 100%;
        height: auto;
        flex-direction: column;
        justify-content: flex-start;
      }

      .button-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: flex-start;
        margin-left: 60px;
        @include breakpoint($break-sm) {
          width: 100%;
          justify-content: center;
          margin: 0 auto;
        }
      }
      .tab-button {
        color: $white;
        background: transparent;
        font-size: 30px;
        line-height: 32px;
        font-weight: 600;
        font-style: normal;
        text-align: center;
        text-decoration: none;
        text-decoration-line: none;
        margin: 0 40px 0 0;
        border: 0;
        padding-bottom: 0.25rem;
        transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
        cursor: pointer;

        &:hover,
        &:active {
          color: $white;
          text-decoration: line-through;
          cursor: pointer;
        }
        &:focus,
        &:focus-visible {
          outline: none;
        }
      }
      .tab-button.active {
        color: $white;
        text-decoration: line-through;
        cursor: pointer;
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
  }
  .mobile-hidden {
    display: block;
    @include breakpoint($break-sm) {
      display: none;
    }
  }
</style>
