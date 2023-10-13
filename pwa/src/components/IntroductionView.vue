<template>
  <div id="home" class="main-container">
    <div class="scroll-container">
      <div class="grey-div"></div>
      <div class="scroll-tracker"></div>
    </div>
    <div class="row">
      <div class="container">
        <div>
          <div class="title">
            Safe<br />
            ApeCoin<br />
            Payment<br />
            Solutions
          </div>
        </div>
        <div>
          <div class="slogan">
            Open up your business to new customers from around the world with Safe {Wallet}
            solutions and ApeCoin payment options
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted } from "vue";

  onMounted(async () => {
    const scrollTracker = document.querySelector(".scroll-tracker");
    const scrollTrackingTimeline = new ScrollTimeline({
      source: document.scrollingElement,
      orientation: "block",
      scrollOffsets: [CSS.percent(0), CSS.px(700)],
    });
    if (scrollTracker) {
      scrollTracker.animate(
        { transform: ["scaleX(0)", "scaleX(1)"] },
        { duration: 1, timeline: scrollTrackingTimeline }
      );
    }
  });
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";
  .main-container {
    position: relative;
    width: 100%;
    height: 50rem;
    top: 0;
    padding: 0;
    margin: 0 auto;
    background-image: url("../assets/images/ApeCoin-Rings-Blue-BG.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top right;
    transform-origin: left;

    @include breakpoint($break-sm) {
      height: 85dvh;
      background-image: none;
    }
    @include breakpoint($break-md) {
      height: 95dvh;
    }
  }

  .scroll-container {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .scroll-tracker {
    background: $safe-stone;
    transform-origin: left;
    height: 100%;
    width: 50%;
    @include breakpoint($break-sm) {
      display: none;
    }
  }

  .grey-div {
    background-image: url("../assets/images/BlueLine.png");
    background-size: auto;
    background-repeat: no-repeat;
    background-position: left 0 top 51%;
    width: 80%;
    @include breakpoint($break-sm) {
      width: 100%;
    }
  }
  .container {
    justify-content: space-evenly;
    position: absolute;
    top: 0;
  }

  .title {
    font-family: "TWKEverett";
    font-style: normal;
    text-align: left;
    max-width: 900px;
    font-size: 84px;
    line-height: 86px;
    text-align: left;
    margin: 200px 0 0 50px;
    color: $grey-100;

    @include breakpoint($break-sm) {
      font-weight: 400;
      font-size: 34px;
      line-height: 40px;
      margin: 50px 0 0 10px;
    }

    @include breakpoint($break-md) {
      font-size: 48px;
      line-height: 54px;
      max-width: 650px;
    }
  }
  .slogan {
    max-width: 700px;
    color: $grey-100;
    font-family: "TWKEverett";
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 42px;
    text-align: left;
    margin: 50px 50px 196px 50px;

    @include breakpoint($break-sm) {
      font-size: 20px;
      line-height: 28px;
      margin: 15px 0 0 0;
    }

    @include breakpoint($break-md) {
      font-size: 30px;
      line-height: 36px;
      max-width: 550px;
      margin: 30px 10px 0 10px;
    }
  }

  .mobile-hidden {
    display: block;
    @include breakpoint($break-sm) {
      display: none;
    }
  }
</style>
