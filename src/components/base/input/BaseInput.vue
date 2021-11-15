<template>
  <div class="input-wrap">
    <input
      v-if="type != 'date'"
      class="misa-input"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
      :type="type"
      :class="[isValidate ? '' : 'border-error']"
      :placeholder="[placeholder ? placeholder : '']"
      :maxlength="maxlength"
      :readonly="readonly"
      @focus="isValidate = true"
      @blur="blurHandler"
      @input="filterHandler"
      ref="baseInput"
    />

    <!-- Date -->
    <datepicker
      v-if="type == 'date'"
      v-model="dateValue"
      :format="'DD/MM/YYYY'"
      :value-type="'YYYY-MM-DDThh:mm:ss'"
      :disabled-date="(date) => date >= new Date()"
      placeholder=""
    ></datepicker>

    <div class="input-password-icon" v-if="type == 'password'">
      <div class="icon-eye"></div>
    </div>

    <div class="icon-wrap" v-if="!isValidate">
      <div
        class="misa-icon icon-validate"
        :class="[isValidate ? '' : 'tooltip']"
      >
        <div class="tooltip-text" v-show="!isValidate">{{ tooltipText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Format from "../../../common/format.js";
import { VALIDATE_INPUT } from "../../../common/const.js";

export default {
  name: "BaseInput",

  data() {
    return {
      // Có đúng định dạng chưa
      isValidate: true,

      // Nội dung cảnh báo validate
      tooltipText: "",

      dateValue: null,
    };
  },

  props: {
    // Tên của input
    name: {
      type: String,
      default: "",
    },

    // Giá trị input
    value: {
      type: String,
      default: "",
    },

    // Loại input
    type: {
      type: String,
      default: "text",
    },

    // Placeholder
    placeholder: {
      type: String,
      default: "",
    },

    // Có bắt buộc không
    required: {
      type: Boolean,
      default: false,
    },

    // Độ dài tối đa input
    maxlength: {
      type: String,
      default: "",
    },

    email: {
      type: Boolean,
      default: false,
    },

    number: {
      type: Boolean,
      default: false,
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    // Sự kiện lọc dữ liệu
    filterHandler: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    /**
     * Hàm validate form
     * @param {any} value
     * Author: dxviet (06/08/2021)
     */
    validateData(value) {
      if (!value && this.required) {
        this.setError(VALIDATE_INPUT.CANT_BE_NULL);
      } else {
        if (value && this.email && !Format.validateEmail(value)) {
          this.setError(VALIDATE_INPUT.INVALID_EMAIL);
        } else {
          this.resetValidate();
        }
      }
    },

    /**
     * Gán lỗi cho input
     */
    setError(error) {
      this.isValidate = false;
      this.tooltipText = error;
    },

    /**
     * Bỏ cảnh báo validate
     */
    resetValidate() {
      this.isValidate = true;
      this.tooltipText = "";
    },

    /**
     * Sự kiện focus vào input
     */
    focusInput() {
      this.$nextTick(() => {
        this.$refs.baseInput.focus();
      });
    },

    /**
     * Sự kiện blur
     */
    blurHandler() {
      this.validateData(this.value);
      this.$emit("blur", this.value);
    },
  },

  watch: {
    value: function () {
      if (this.type == "date") {
        this.dateValue = this.value;
      }
    },

    dateValue: function (date) {
      this.$emit("input", date);
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>