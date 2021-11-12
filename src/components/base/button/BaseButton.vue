<template>
  <button v-bind="$attrs" class="misa-btn" @click="clickHandler">
    <div class="icon-button" v-if="icon">
      <div class="misa-icon" :class="icon"></div>
    </div>

    <div v-if="$slots.default" class="misa-btn-text"><slot /></div>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    icon: {
      type: String,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>