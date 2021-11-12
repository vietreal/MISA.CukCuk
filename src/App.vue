<template>
  <div id="app">
    <TheMenu />
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheMenu from "./components/layout/menu/TheMenu.vue";
import TheHeader from "./components/layout/header/TheHeader.vue";
import TheContent from "./components/layout/content/TheContent.vue";

export default {
  name: "App",
  components: {
    TheMenu,
    TheHeader,
    TheContent,
  },
};
</script>

<style>
@import "./app.css";
</style>
