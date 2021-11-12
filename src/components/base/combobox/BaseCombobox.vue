<template>
  <div class="misa-cbo">
    <!-- Phần input và icon -->
    <div
      class="cbo-header"
      :class="{ 'item-active': isActive || isOpen }"
      @keydown.tab="selectItem"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="selectItem"
      @blur="selectItem"
      @click="setPositionBody"
      ref="cboHeader"
    >
      <!-- Phần input text -->
      <div class="cbo-input">
        <input
          type="text"
          v-model="cboValue"
          :readonly="readonly"
          :placeholder="placeholder"
          @focus="isActive = true"
          @blur="blur"
          @input="inputHandler"
          :class="{ 'input-readonly': readonly }"
          ref="input"
        />
      </div>

      <!-- Phần icon -->
      <div
        class="cbo-icon"
        @keydown.down="moveDown"
        @click="cboOnClick($event)"
        ref="cboIcon"
      >
        <div class="icon-down" @keydown.down="keyDownHandler"></div>
      </div>

      <div class="add-item" v-if="iconAdd">
        <div class="misa-icon icon-quick-add"></div>
      </div>
    </div>

    <div class="icon-wrap" v-if="!isValidate && iconValidate">
      <div class="icon-validate" :class="[isValidate ? '' : 'tooltip']">
        <div class="tooltip-text" v-show="!isValidate">{{ tooltipText }}</div>
      </div>
    </div>

    <!-- Phần body gồm các combobox item -->
    <div
      class="cbo-body"
      v-show="isOpen"
      :class="[turnUp ? 'turn-up' : 'turn-down']"
      :style="{
        width: width,
        top: turnUp ? 'none' : positionY,
        left: positionX,
      }"
    >
      <div
        class="cbo-item"
        v-for="(cboItem, i) in cboItems"
        :key="cboItem[fieldId]"
        @click="itemOnclick(cboItem, i)"
        :class="{ 'background-selected': cboItem.isSelect }"
      >
        <div
          v-if="iconCheck"
          class="misa-icon icon-check"
          :class="{ 'icon-check-selected': cboItem.isSelect }"
        ></div>
        <div class="cbo-item-content">{{ cboItem[fieldName] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import { VALIDATE_INPUT } from "../../../common/const";

export default {
  name: "BaseCombobox",
  data() {
    return {
      // Giá trị hiện tại của combobox
      cboValue: "",

      // Mảng lưu trữ các item
      cboItems: [],
      fieldId: "",
      fieldName: "",
      propFilter: "",

      // Đóng/mở combobox
      isOpen: false,

      positionX: "",

      positionY: "",

      // chiều rộng
      width: "",

      // Chỉ số hiện tại của item được chọn
      currentIndex: null,

      // Item hiện tại
      currentItem: {},

      oldValue: "",

      // Đã validate chưa
      isValidate: true,

      // Nội dung validate
      tooltipText: "",

      // Focus không
      isActive: false,
    };
  },
  props: {
    // Tên combobox
    cboName: {
      type: String,
      default: "",
    },

    // giá trị khởi tạo của combo box
    defaultValue: {
      type: String,
      default: "",
    },

    // Lấy giá trị khởi tạo là giá trị đầu tiên
    firstValue: {
      type: Boolean,
      default: false,
    },

    // Có icon check item hay không
    iconCheck: {
      type: Boolean,
      default: false,
    },

    // Có icon validate không
    iconValidate: {
      type: Boolean,
      default: false,
    },

    iconAdd: {
      type: Boolean,
      default: false,
    },

    // Dữ liệu combobox
    data: {
      type: Object,
      default: () => {},
    },

    placeholder: {
      type: String,
      default: "",
    },

    // Quay lên hay không
    turnUp: {
      type: Boolean,
      default: false,
    },

    // Hàm lọc dữ liệu
    propertyFilter: {
      type: Function,
      default: () => {},
    },

    // Dropdown
    readonly: {
      type: Boolean,
    },
  },

  created() {
    this.loadCombobox();
  },

  mounted() {
    document.addEventListener("click", this.hideCboItems);
  },

  methods: {
    // ...mapActions(["getCboApiData"]),
    /**
     * Hàm khởi tạo các giá trị combobox
     * Author: dxviet(08/08/2021)
     */
    loadCombobox() {
      // Gọi API lấy dữ liệu
      //await this.getCboApiData(this.cboName);

      // Gán các giá trị của combobox
      this.cboItems = this.data?.data;
      this.fieldId = this.data.itemId;
      this.fieldName = this.data.itemName;
      this.propFilter = this.data.prop;

      // Khởi tạo giá trị mặc định cho combobox (nếu có)
      this.setValueById(this.defaultValue);

      if (this.firstValue) this.currentIndex = 0;
    },

    /**
     * Set vị trí combobox body
     */
    setPositionBody() {
      let header = this.$refs.cboHeader;
      let width = header.getBoundingClientRect().width;
      let height = header.getBoundingClientRect().height;
      this.positionX = header.getBoundingClientRect().x + "px";
      this.positionY = header.getBoundingClientRect().y + height + "px";
      this.width = width + "px";
    },

    /**
     * Hiện list item khi click vào nút dropdown
     * Author: dxviet(03/08/2021)
     */
    cboOnClick() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) this.$refs.input.focus();
    },

    /**
     * Sự kiện nhấn vào 1 item
     * Author: dxviet(03/08/2021)
     */
    itemOnclick(item, index) {
      this.isOpen = false;
      this.resetValidate();
      this.currentItem = item;
      this.currentIndex = index;
      // Hàm filter dữ liệu
      this.filter(item);
      this.$emit("changeValue", item[this.fieldId]);
    },

    /**
     * Sự kiện nhấn phím mũi tên xuống
     */
    moveDown() {
      this.setPositionBody();
      this.isOpen = true;
      if (this.currentIndex < this.cboItems.length - 1) {
        this.currentIndex++;
      }
    },

    /**
     * Sự kiện nhấn phím mũi tên lên
     */
    moveUp() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },

    /**
     * Chọn item
     */
    selectItem() {
      this.validateData();
      this.filter(this.currentItem);
      this.$emit("changeValue", this.currentItem[this.fieldId]);
      this.isOpen = false;
    },

    /**
     * Hàm lọc dữ liệu
     */
    filter(item) {
      if (this.oldValue != item[this.fieldId]) {
        this.oldValue = item[this.fieldId];
        if (item[this.fieldId] == 0) this.propertyFilter(this.propFilter, 4, 0);
        else this.propertyFilter(this.propFilter, 0, item[this.fieldId]);
      }
    },

    /**
     * Gán giá trị theo id
     */
    setValueById(id) {
      this.currentIndex = this.cboItems
        .map((item) => item[this.fieldId])
        .indexOf(id);
    },

    /**
     * Gán giá trị đầu tiên
     */
    setFirstValue() {
      this.currentIndex = 0;
    },

    /**
     * Validate combobox
     */
    validateData() {
      if (
        this.cboValue != "" &&
        this.cboItems.every((item) => item[this.fieldName] != this.cboValue)
      ) {
        //this.tooltipText = VALIDATE_INPUT.NOT_IN_LIST;
        this.isValidate = false;
      } else {
        this.resetValidate();
      }
    },

    /**
     * Bỏ cảnh báo validate
     */
    resetValidate() {
      this.isValidate = true;
      this.tooltipText = "";
    },

    /**
     * Sự kiện blur
     */
    blur() {
      this.isActive = false;
      if (!this.isValidate) {
        this.cboValue = "";
        this.resetValidate();
      }
    },

    /**
     * Auto complete
     */
    inputHandler() {
      this.validateData();
      this.cboItems = [];
      this.data.data.forEach((item) => {
        if (
          item[this.fieldName]
            .toLowerCase()
            .includes(this.cboValue.toLowerCase())
        ) {
          this.cboItems.push(item);
        }
      });
      if (this.cboValue) this.isOpen = true;
      else this.isOpen = false;
    },

    /**
     * Hàm đóng combobox
     * Author: dxviet(28/08/2021)
     */
    hideCboItems(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },

  watch: {
    /**
     * Thay đổi nội dung combobox khi index thay đổi
     */
    currentIndex: function (index) {
      if (index == -1) this.cboValue = "";
      this.cboItems.forEach((item, i) => {
        if (i == index) {
          this.cboValue = item[this.fieldName];
          this.currentItem = item;
          item.isSelect = true;
          this.$emit("changeValue", item[this.fieldId]);
        } else item.isSelect = false;
      });
    },

    /**
     * Thay đổi value id
     */
    defaultValue: function (id) {
      this.cboItems = this.data.data;
      if (this.cboItems) this.setValueById(id);
      this.$emit("changeValue", id);
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>