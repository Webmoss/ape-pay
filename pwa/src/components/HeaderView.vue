<template>
  <header id="header">
    <nav class="top-nav">
      <router-link to="/" class="logo-link" @click="state.toggleMenu = false">
        <img src="../assets/images/Apecoin-Icon.png" alt="ApePay" height="50" />
        ApePay
      </router-link>
      <input id="menu-toggle" v-model="state.toggleMenu" type="checkbox" />
      <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button-black menu-button"></div>
      </label>
      <ul class="menu-black menu">
        <li class="link-black" @click="navigateAndScroll('home')">Home</li>
        <li class="link-black" @click="navigateAndScroll('about')">About</li>
        <li class="link-black" @click="navigateAndScroll('payments')">
          Payments
        </li>
        <li class="link-black" @click="navigateAndScroll('transactions')">
          Transactions
        </li>
        <li class="link-black" @click="navigateAndScroll('faqs')">Faqs</li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
  import { reactive } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const state = reactive({
    toggleMenu: false,
  });

  function scrollPageToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function scrolltoId(to: string) {
    const access = document.getElementById(to);
    if (access) access.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function navigateAndScroll(to: string) {
    if (route.name === to) {
      scrollPageToTop();
    } else {
      scrolltoId(to);
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .top-nav {
    max-width: $max-width;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    @include breakpoint($break-sm) {
      padding: 5px 10px 0;
    }
    @include breakpoint($break-md) {
      padding: 10px 20px 0;
    }
  }

  .logo-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-family: "TWKEverett";
    color: $black;
    font-size: 38px;
    font-weight: 900;
    text-decoration: none;
    margin-bottom: -5px;
    margin-left: 20px;
    @include breakpoint($break-sm) {
      margin: -5px 0 0 0;
    }
  }

  .menu {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    z-index: 999999;
    li.link-black {
      color: $grey-100;
      cursor: pointer;
    }
  }
  .menu > li {
    margin: 0 1rem;
    overflow: hidden;
    color: $grey-100;
    text-decoration: none;
  }
  .menu-button-container {
    display: none;
    height: 100%;
    width: 30px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #menu-toggle {
    display: none;
  }

  .menu-button-black,
  .menu-button-black::before,
  .menu-button-black::after {
    background-color: $grey-100;
  }

  .menu-button,
  .menu-button::before,
  .menu-button::after {
    display: block;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }

  .menu-button::before {
    content: "";
    margin-top: -8px;
  }

  .menu-button::after {
    content: "";
    margin-top: 8px;
  }

  #menu-toggle:checked + .menu-button-container .menu-button {
    background: rgba(255, 255, 255, 0);
  }

  #menu-toggle:checked + .menu-button-container .menu-button::before {
    margin-top: 0px;
    transform: rotate(405deg);
  }

  #menu-toggle:checked + .menu-button-container .menu-button::after {
    margin-top: 0px;
    transform: rotate(-405deg);
  }

  @media (max-width: 700px) {
    .menu-button-container {
      display: flex;
    }

    .menu {
      position: absolute;
      top: 0;
      margin-top: 74px;
      left: 0;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    #menu-toggle ~ .menu li {
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    #menu-toggle:checked ~ .menu li {
      display: flex;
      align-items: center;
      height: 2.5em;
      padding: 0.5em;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    #menu-toggle:checked ~ .menu-white li {
      border-top: 1px solid $grey-100;
    }

    #menu-toggle:checked ~ .menu-black li {
      border-top: 1px solid $black;
    }

    .menu > li {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0.5em 0;
      width: 100%;
    }

    .menu-black {
      background-color: $safe-stone;
      border-bottom: 1px solid $black;
    }
  }
</style>
