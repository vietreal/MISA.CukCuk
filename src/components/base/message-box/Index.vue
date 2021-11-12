<template>
  <div class="message-box">
    <div class="message-box-modal"></div>
    <div class="message-box-content">
      <div class="form-header">
        <div class="form-title">{{ title }}</div>
      </div>
      <div class="form-body flex">
        <div class="message-icon">
          <div class="icon-popup" :class="icon"></div>
        </div>
        <div class="message-content">
          <span><slot></slot></span>
        </div>
      </div>
      <div class="mess-footer">
        <div class="left" v-if="btnLeft">
          <base-button
            :class="leftClass"
            :icon="iconLeft"
            type="primary"
            :click-handler="btnLeftClick"
          >
            {{ btnLeft }}
          </base-button>
        </div>
        <div class="middle" v-if="btnMiddle">
          <base-button
            :class="middleClass"
            :icon="iconMiddle"
            type="primary"
            :click-handler="btnMiddleClick"
          >
            {{ btnMiddle }}
          </base-button>
        </div>

        <div class="right-second" v-if="btnRightSecond">
          <base-button
            :class="rightSecondClass"
            :icon="iconRightSecond"
            type="primary"
            :click-handler="btnRightSecondClick"
          >
            {{ btnRightSecond }}
          </base-button>
        </div>

        <div class="right-first" v-if="btnRightFirst">
          <base-button
            :class="rightFirstClass"
            :icon="iconRightFirst"
            type="primary"
            :click-handler="btnRightFirstClick"
          >
            {{ btnRightFirst }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseMessageBox",
  data() {
    return {
      isShow: false,
    };
  },

  props: {
    title: {
      type: String,
      default: "MISA eShop",
    },

    icon: {
      type: String,
    },

    // Button trái
    btnLeft: {
      type: String,
      default: "",
    },
    leftClass: {
      type: String,
      default: "",
    },
    iconLeft: {
      type: String,
      default: "",
    },
    btnLeftClick: {
      type: Function,
      default: () => {},
    },

    // Button giữa
    btnMiddle: {
      type: String,
      default: "",
    },
    middleClass: {
      type: String,
      default: "",
    },
    iconMiddle: {
      type: String,
      default: "",
    },

    btnMiddleClick: {
      type: Function,
      default: () => {},
    },

    // Button phải
    btnRightFirst: {
      type: String,
      default: "",
    },
    rightFirstClass: {
      type: String,
      default: "",
    },
    iconRightFirst: {
      type: String,
      default: "",
    },
    btnRightFirstClick: {
      type: Function,
      default: () => {},
    },

    btnRightSecond: {
      type: String,
      default: "",
    },
    rightSecondClass: {
      type: String,
      default: "",
    },
    iconRightSecond: {
      type: String,
      default: "",
    },

    btnRightSecondClick: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>