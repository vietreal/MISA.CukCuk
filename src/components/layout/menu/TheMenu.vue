<template>
  <div class="menu">
    <div class="menu-header flex flex-align-center">
      <div class="icon-left-header">
        <div class="menu-navbar-icon icon-toggle"></div>
      </div>
      <div class="misa-logo"></div>
    </div>

    <div class="menu-navbar">
      <div class="navbar-item">
        <div class="navbar-item-left">
          <div class="menu-navbar-icon icon-overview"></div>
        </div>
        <div class="navbar-item-text">Tổng quan</div>
      </div>

      <div class="navbar-item">
        <div class="navbar-item-left">
          <div class="menu-navbar-icon icon-report"></div>
        </div>
        <div class="navbar-item-text">Báo cáo</div>
      </div>

      <div class="navbar-item">
        <div class="navbar-item-left">
          <div class="menu-navbar-icon icon-view-cart"></div>
        </div>
        <div class="navbar-item-text">Mua hàng</div>
      </div>

      <div class="navbar-item">
        <div class="navbar-item-left">
          <div class="menu-navbar-icon icon-stock"></div>
        </div>
        <div class="navbar-item-text">Kho</div>
      </div>

      <div class="navbar-item">
        <div class="navbar-item-left">
          <div class="menu-navbar-icon icon-dictionary"></div>
        </div>
        <div class="navbar-item-text">Nhân viên</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheMenu",
};
</script>

<style scoped>
@import "./index.css";
</style>

