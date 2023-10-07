<template>
  <div id="about" class="container">
    <div class="mini-menu">
      <MiniMenu />
    </div>
    <div class="intro">
      <div class="description">
        <div class="slogan">ApePay</div>
        <p>
          ApePay offers a secure online portal for merchants and institutions
          that wish to offer $APE as a preferred payment option
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
</template>
<script setup>
import MiniMenu from "./MiniMenu.vue";
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
    url("../assets/images/mobile_yellow.png");
  background-size: contain, auto;
  background-repeat: no-repeat, no-repeat;
  background-position:
    top right,
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

.description {
  width: 40%;
  margin: 115px 0 145px;
  padding-right: 50px;
}
</style>
