<template>
  <div class="operator-combobox">
    <div class="o-c-header flex flex-align-center" ref="cboHeader">
      <div class="operator-type" @click="openMenu()">
        <input type="text" v-model="currentSymbol" readonly />
      </div>

      <div ref="inputText" class="operator-text">
        <input
          v-if="isNumberOperator"
          :value="formatNumber(currentValue)"
          v-on:input="changeInputNumber($event)"
          type="text"
          @blur="change"
          @keydown.enter="change"
          style="text-align: right"
        />
        <input
          v-else
          type="text"
          v-model="currentValue"
          @blur="change"
          @keydown.enter="change"
        />
      </div>
    </div>

    <div
      class="o-c-body"
      v-show="menuStatus.isShow"
      :style="{
        top: menuStatus.positionY,
        left: menuStatus.positionX,
      }"
    >
      <div
        class="item"
        v-for="(item, i) in operators"
        :key="i"
        @click="itemOnclick(item, i)"
      >
        <div class="item-icon">
          <div
            class="misa-icon icon-check"
            :class="[currentIndex == i ? '' : 'hidden']"
          ></div>
        </div>
        <div class="item-text">
          {{ item.Text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperatorCombobox",
  data() {
    return {
      // trạng thái của menu
      menuStatus: {
        isShow: false,
        positionX: "0px",
        positionY: "0px",
      },

      // Biểu tượng hiện tại
      currentSymbol: "",

      currentIndex: 99,

      // Loại so sánh hiện tại
      currentOperator: 99,

      // Giá trị lọc hiện tại
      currentValue: "",

      oldValue: "",
      oldOperator: 99,

      isNumberOperator: false,

      // List các loại so sánh
      operators: [],

      // So sánh string
      stringOptions: [
        {
          Symbol: "∗",
          Text: "∗ : Chứa",
          Operator: 1,
        },
        {
          Symbol: "=",
          Text: "= : Bằng",
          Operator: 0,
        },
        {
          Symbol: "+",
          Text: "+ : Bắt đầu bằng",
          Operator: 2,
        },
        {
          Symbol: "-",
          Text: "- : Kết thúc bằng",
          Operator: 3,
        },
        {
          Symbol: "!",
          Text: "! : Không chứa",
          Operator: 4,
        },
      ],

      // So sánh number
      numberOptions: [
        {
          Symbol: "=",
          Text: "= : Bằng",
          Operator: 0,
        },
        {
          Symbol: "<",
          Text: "< : Nhỏ hơn",
          Operator: 5,
        },
        {
          Symbol: "≤",
          Text: "≤ : Nhỏ hơn hoặc bằng",
          Operator: 6,
        },
        {
          Symbol: ">",
          Text: "> : Lớn hơn",
          Operator: 7,
        },
        {
          Symbol: "≥",
          Text: "≥ : Lớn hơn hoặc bằng",
          Operator: 8,
        },
      ],
    };
  },

  props: {
    type: {
      type: String,
      default: "",
    },

    columnFilter: {
      type: String,
      default: "",
    },
  },

  created() {
    this.constructor();
  },

  mounted() {
    document.addEventListener("click", this.hideMenu);
  },

  methods: {
    constructor() {
      let index = 0;
      if (this.type == "string") {
        this.operators = this.stringOptions;
      } else {
        index = 2;
        this.operators = this.numberOptions;
        this.isNumberOperator = true;
      }

      this.currentIndex = index;
      this.currentSymbol = this.operators[index].Symbol;
      this.currentOperator = this.operators[index].Operator;
      this.oldOperator = this.currentOperator;
    },

    /**
     * Sự kiện nhấn vào 1 item
     * Author: dxviet(03/08/2021)
     */
    itemOnclick(item, i) {
      this.menuStatus.isShow = false;
      this.currentSymbol = item.Symbol;
      this.currentOperator = item.Operator;
      this.currentIndex = i;

      // Kiểm tra nếu thay đổi thì lọc dữ liệu
      if (this.currentOperator != this.oldOperator) {
        this.oldOperator = this.currentOperator;
        this.$emit(
          "changeValue",
          this.columnFilter,
          this.currentOperator,
          this.currentValue
        );
      }
    },

    /**
     * Mở menu
     */
    openMenu() {
      if (!this.menuStatus.isShow) {
        let header = this.$refs.cboHeader;
        let height = header.getBoundingClientRect().height;
        this.menuStatus = {
          isShow: true,
          positionX: header.getBoundingClientRect().x + "px",
          positionY: header.getBoundingClientRect().y + height + 1 + "px",
        };
      } else this.closeMenu();
    },

    /**
     * Hàm đóng menu chức năng
     * Author: dxviet(28/08/2021)
     */
    closeMenu() {
      this.menuStatus = {
        isShow: false,
        positionX: 0 + "px",
        positionY: 0 + "px",
      };
    },

    /**
     * Hàm đóng menu chức năng
     * Author: dxviet(28/08/2021)
     */
    hideMenu(event) {
      if (
        !this.$el.contains(event.target) ||
        this.$refs.inputText.contains(event.target)
      ) {
        this.menuStatus.isShow = false;
      }
    },

    /**
     * Sự kiện thay đổi giá trị
     */
    change() {
      // Kiểm tra nếu thay đổi thì lọc dữ liệu
      if (this.currentValue != this.oldValue) {
        this.oldValue = this.currentValue;
        this.$emit(
          "changeValue",
          this.columnFilter,
          this.currentOperator,
          this.currentValue
        );
      }
    },

    /**
     * Format input số
     */
    formatNumber(value) {
      if (value) {
        let number = new Number(value);
        return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      } else return "";
    },

    changeInputNumber(event) {
      this.currentValue = event.target.value.split(".").join("");
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>