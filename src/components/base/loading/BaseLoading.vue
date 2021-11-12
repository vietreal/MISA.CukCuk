<template>
  <div class="base-loading" v-show="vShow">
    <!-- Modal -->
    <div
      class="loading-modal"
      :style="{ top: top, right: right, bottom: bottom, left: left }"
    ></div>

    <div class="loading">
      <div class="icon-loading"></div>
      <div class="loading-text">Đang lấy dữ liệu...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLoading",
  props: {
    vShow: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
    },
    right: {
      type: String,
    },
    bottom: {
      type: String,
    },
    left: {
      type: String,
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>