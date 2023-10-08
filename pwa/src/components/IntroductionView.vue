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
            Safe<br class="mobile-hidden" />
            ApeCoin<br class="mobile-hidden" />
            Payment<br class="mobile-hidden" />
            Solutions
          </div>
        </div>
        <div>
          <div class="slogan">
            Open up your business to new customers from around the world with
            Safe {Wallet} solutions and ApeCoin payment options
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";
import { onMounted } from "vue";

onMounted(async () => {
  const scrollTracker = document.querySelector(".scroll-tracker");
  // eslint-disable-next-line no-undef
  const scrollTrackingTimeline = new ScrollTimeline({
    source: document.scrollingElement,
    orientation: "block",
    scrollOffsets: [CSS.percent(0), CSS.px(700)],
  });

  scrollTracker.animate(
    { transform: ["scaleX(0)", "scaleX(1)"] },
    { duration: 1, timeline: scrollTrackingTimeline },
  );
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
    height: 35rem;
  }
  @include breakpoint($break-md) {
    height: 50rem;
  }
}

.scroll-container {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
}

.scroll-tracker {
  background: $grey-20;
  transform-origin: left;
  height: 100%;
  width: 50%;
}

.grey-div {
  background-image: url("../assets/images/BlueLine.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: left 0 top 51%;
  width: 80%;
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
    margin: 80px 30px 0 0;
  }

  @include breakpoint($break-md) {
    font-size: 48px;
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
    font-size: 22px;
    margin: 35px 30px 0 0;
  }

  @include breakpoint($break-md) {
    font-size: 30px;
    line-height: 36px;
    max-width: 550px;
    margin: 60px 33px 96px 0;
  }
}

.mobile-hidden {
  display: block;
  @include breakpoint($break-sm) {
    display: none;
  }
}
</style>
