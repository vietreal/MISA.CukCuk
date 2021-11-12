<template>
  <div
    class="context-menu"
    :style="{
      top: top,
      left: left,
    }"
    ref="menuFunction"
  >
    <div class="body-wrap">
      <div class="menu-body">
        <div class="menu-item flex" @click="addOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-add"></div>
          </div>
          <div class="menu-item-text">Thêm</div>
        </div>

        <div class="menu-item flex" @click="cloneOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-clone"></div>
          </div>
          <div class="menu-item-text">Nhân bản</div>
        </div>

        <div class="line-bottom"></div>

        <div class="menu-item flex" @click="editOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-search"></div>
          </div>
          <div class="menu-item-text">Xem</div>
        </div>

        <div class="menu-item flex" @click="editOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-edit"></div>
          </div>
          <div class="menu-item-text">Sửa</div>
        </div>

        <div class="menu-item flex" @click="deleteOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-delete"></div>
          </div>
          <div class="menu-item-text">Xóa</div>
        </div>

        <div class="line-bottom"></div>

        <div class="menu-item flex" @click="refreshOnClick">
          <div class="menu-item-icon">
            <div class="misa-icon icon-refresh"></div>
          </div>
          <div class="menu-item-text">Nạp</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHover: false,
    };
  },

  props: {
    top: {
      type: String,
      default: "",
    },
    left: {
      type: String,
      default: "",
    },
    addOnClick: {
      type: Function,
      default: () => {},
    },
    cloneOnClick: {
      type: Function,
      default: () => {},
    },
    editOnClick: {
      type: Function,
      default: () => {},
    },
    deleteOnClick: {
      type: Function,
      default: () => {},
    },
    refreshOnClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>