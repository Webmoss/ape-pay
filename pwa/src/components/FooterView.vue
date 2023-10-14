<template>
  <footer id="faqs" class="footer">
    <div class="footer-container">
      <div class="row">
        <div class="footer-card">
          <div class="footer-left">
            <p>
              <img src="../assets/images/ApeCoinPowered.png" alt="ApeCoin Powered" height="80" />
            </p>
          </div>
        </div>
        <div class="footer-card">
          <div class="footer-right">
            <ul class="social-links">
              <li>
                <a href="https://twitter.com/webmoss" alt="Twitter" target="_blank">Twitter →</a>
              </li>
              <li>
                <a
                  href="https://ethglobal.com/showcase/apepay-vr5js"
                  alt="EthGlobal Showcase"
                  target="_blank"
                  >Showcase →</a
                >
              </li>
              <li>
                <a href="https://github.com/Webmoss/ape-pay" alt="Github" target="_blank"
                  >Github →</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-card">
          <ul class="site-links mobile-hidden">
            <li @click="navigateAndScroll('home')">Home →</li>
            <li @click="navigateAndScroll('about')">About →</li>
            <li @click="navigateAndScroll('payments')">Payments →</li>
            <li @click="navigateAndScroll('transactions')">Transactions →</li>
          </ul>
        </div>
        <div class="footer-card">
          <button class="scroll-to-top" @click.prevent="scrollPageToTop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#000000"
              class="arrow-up"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </button>
          <button class="mobile-button" @click.prevent="scrollPageToTop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#000000"
              class="arrow-up"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  const navigateAndScroll = (to: string) => {
    if (route.name === to) {
      scrollPageToTop();
    } else {
      scrolltoId(to);
    }
  };

  const scrolltoId = (to: string) => {
    const access = document.getElementById(to);
    if (access) access.scrollIntoView({ behavior: "smooth" });
  };

  const scrollPageToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .footer {
    font-family: "TWKEverett";
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    text-decoration: none;
    background-color: $black;
    color: $grey-20;
    a {
      color: $grey-20;
      text-decoration: none;
    }
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    text-align: left;
    max-width: $max-width;
    padding: 4rem 0 2rem;
    margin: 0 auto;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    background-image: url("../assets/images/YellowCircle.png");
    background-size: 200px;
    background-repeat: no-repeat;
    background-position: right 150px top 0;
    @include breakpoint($break-sm) {
      height: auto;
      flex-direction: column;
      padding: 20px;
    }
    @include breakpoint($break-md) {
      flex-direction: row;
      padding: 20px;
    }
    @include breakpoint($break-lg) {
      padding: 4rem 100px;
    }
  }
  .footer-left {
    p {
      font-family: "TWKEverett";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      text-align: left;
      margin: 0 0 20px;
    }
  }
  ul {
    margin: 0;
  }
  .footer-right {
    display: flex;
    flex-direction: column;
  }

  .social-links {
    padding-left: 30px;
    list-style: none;
    font-family: "TWKEverett";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-decoration-line: underline;
    text-underline-offset: 3px;
  }
  .social-links li {
    padding-bottom: 0.5rem;
    @include breakpoint($break-md) {
      padding-right: 20px;
    }
    @include breakpoint($break-lg) {
      padding-right: 0;
    }
  }

  .container {
    color: $black;
    background: $white;
    margin: 0 auto;
    padding: 0 100px 50px;

    @include breakpoint($break-md) {
      padding: 0 30px 30px 30px;
    }
    @include breakpoint($break-lg) {
      padding: 0 100px 55px;
    }
    @include breakpoint($break-xl) {
      padding: 0 0 50px;
    }
  }
  .row {
    display: flex;
    width: 100%;
    margin: 0;
    justify-content: space-between;
    @include breakpoint($break-sm) {
      display: block;
    }
  }
  .row .footer-card {
    text-align: left;
    width: 20%;
    @include breakpoint($break-sm) {
      width: 100%;
    }
  }

  .site-links {
    list-style: none;
    font-family: "TWKEverett";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-decoration-line: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
  .site-links li {
    padding-bottom: 0.5rem;
  }

  .footer .scroll-to-top {
    background-color: $white;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    padding: 20px;

    &:hover {
      border-color: $ape-blue;
    }
  }
  .footer .scroll-to-top .arrow-up {
    fill: $black;
  }
  .scroll-to-top {
    margin-left: unset;
    display: flex;
    @include breakpoint($break-sm) {
      display: none;
      border: none;
      height: 60px;
      width: 60px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: auto;
      align-items: center;
      justify-content: center;
    }
  }

  .mobile-hidden {
    display: block;
    font-weight: bold;
    a {
      text-decoration: none;
    }
    @include breakpoint($break-sm) {
      display: none;
    }
  }

  .mobile-button {
    display: none;
    margin-left: unset;
    @include breakpoint($break-sm) {
      background-color: $grey-30;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      height: 60px;
      width: 60px;
      border-radius: 4px;
      margin: -85px 0 0 auto;
      cursor: pointer;
    }
  }
</style>
