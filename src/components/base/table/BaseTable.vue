<template>
  <div class="misa-table">
    <table class="base-table scrolling scroll-x scroll-y" ref="baseTable">
      <thead ref="thead" :class="{ scrollsync: scrollVertical }">
        <tr>
          <th
            v-for="(column, i) in columns"
            :key="i"
            :prop="column.prop"
            :style="getColumnStyle(column)"
          >
            <div class="header-label">{{ column.label }}</div>
            <div
              class="header-combobox"
              v-if="column.operator || column.combobox"
            >
              <!-- Operator combobox -->
              <operator-combobox
                v-if="column.operator"
                :column-filter="column.prop"
                :type="column.operator"
                @changeValue="filterData"
              ></operator-combobox>

              <!-- Combobox -->
              <base-combobox
                :data="column.combobox"
                :property-filter="filterData"
                v-if="column.combobox"
              ></base-combobox>
            </div>
          </th>
          <th v-if="deleteColumn" style="min-width: 50px; max-width: 50px"></th>
        </tr>
      </thead>
      <tbody
        class="table-body"
        ref="tbody"
        @scroll.passive="updateSyncedScroll"
      >
        <table class="row-table" v-for="item in data" :key="item[rowId]">
          <tbody>
            <tr
              @contextmenu.prevent="openMenu($event, item)"
              :class="{
                'grid-item-select': checkActiveRow(item),
              }"
            >
              <!-- Columns -->
              <td
                v-for="(column, i) in columns"
                :key="i"
                :style="getColumnStyle(column)"
                @dblclick="rowOnDbClick(item)"
                @click.exact="rowOnClick(item)"
                @click.ctrl="addSelectRow(item)"
                :title="
                  column.convert
                    ? column.convert(item[column.prop])
                    : item[column.prop]
                "
              >
                <div class="grid-item-td" v-if="!canEditContent">
                  {{
                    column.convert
                      ? column.convert(item[column.prop])
                      : item[column.prop]
                  }}
                </div>

                <input
                  v-model="item[column.prop]"
                  class="grid-item-td"
                  type="text"
                  v-if="canEditContent && column.type != 'number'"
                />
                <money
                  class="grid-item-td"
                  v-model="item[column.prop]"
                  type="text"
                  v-bind="money"
                  v-if="canEditContent && column.type == 'number'"
                />
              </td>

              <td class="delete-column" v-if="deleteColumn">
                <div class="grid-item-delete" @click="deleteRow(item)">
                  <div class="misa-icon icon-delete-red"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  data() {
    return {
      // Mảng các hàng được check bằng checkbox
      checkedRows: [],

      // Mảng các hàng được chọn bằng click vào hàng
      selectedRows: [],

      money: {
        decimal: ",",
        thousands: ".",
        precision: 0,
        masked: false,
      },

      // Load lại dữ liệu
      reload: false,
    };
  },

  props: {
    // Dữ liệu
    data: {
      type: Array,
      default: () => {},
    },
    // Danh sách cột
    columns: {
      type: Array,
      default: () => {},
    },

    // Có cột xóa hàng không
    deleteColumn: {
      type: Boolean,
      default: false,
    },
    rowId: {
      type: String,
    },
    // Hàm xử lý click hàng
    rowClick: {
      type: Function,
      default: () => {},
    },
    // Hàm xử lý double click hàng
    rowDbClick: {
      type: Function,
      default: () => {},
    },
    // Hàm lọc
    filterHandler: {
      type: Function,
      default: () => {},
    },

    // Scroll chiều dọc
    scrollVertical: {
      type: Boolean,
      default: true,
    },

    // Mảng các hàng được chọn
    checkedList: {
      type: Array,
      default: () => {},
    },

    canEditContent: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    // Chọn hàng đầu tiên
    this.selectedRows.push(this.data[0]);
  },

  methods: {
    /**
     * Lọc dữ liệu theo cột
     */
    filterData(property, operator, value) {
      this.filterHandler(property, operator, value);
    },

    /**
     * Cập nhật header khi scroll
     */
    updateSyncedScroll() {
      const b = this.$refs.tbody;
      const l = b.scrollLeft;
      const h = this.$refs.thead;
      if (h.scrollLeft !== l) {
        h.scrollLeft = l;
      }
      this.$emit("scroll", b.scrollTop, l, b.scrollHeight, b.scrollWidth);
    },

    /**
     * Lấy style cột theo dữ liệu
     * Author: dxviet(29/07/2021)
     */
    getColumnStyle(col) {
      const style = {};
      if (!col.main) {
        style["min-width"] = `${col.width}`;
        style["max-width"] = `${col.width}`;
      } else {
        style["width"] = "100%";
        style["min-width"] = `${col.width}`;
      }

      if (col.align) {
        style["text-align"] = `${col.align}`;
      }
      return style;
    },

    /**
     * Sự kiện nhấn đúp chuột vào hàng
     * Author: dxviet(29/07/2021)
     */
    rowOnDbClick(item) {
      this.rowDbClick(item);
    },

    /**
     * Sự kiện nhấn click chuột vào hàng
     * Author: dxviet(29/07/2021)
     */
    rowOnClick(item) {
      this.selectedRows = [];
      this.addSelectRow(item);
    },

    /**
     * Sự kiện nhấn xóa hàng
     * Author: dxviet(29/07/2021)
     */
    deleteRow(item) {
      this.$emit("deleteRow", item);
    },

    /**
     * Sự kiện chọn hàng
     * Author: dxviet(29/07/2021)
     */
    checkRow(isChecked, item) {
      if (isChecked) {
        this.checkedRows.push(item);
      } else {
        let pos = this.checkedRows
          .map((object) => object[this.rowId])
          .indexOf(item[this.rowId]);
        this.checkedRows.splice(pos, 1);
      }

      // Nếu không có hàng được check thì gửi list click
      if (this.checkedRows.length == 0) {
        this.$emit("checkRow", this.selectedRows);
      } else this.$emit("checkRow", this.checkedRows);
    },

    /**
     * Mở menu
     */
    openMenu(event, item) {
      this.selectedRows = [];
      this.addSelectRow(item);
      this.$emit("openMenu", event.pageX, event.pageY, item);
    },

    /**
     * Thêm hàng vào mảng được click chọn
     */
    addSelectRow(item) {
      this.selectedRows.push(item);
    },

    /**
     * Kiểm tra hàng có được chọn không
     */
    checkActiveRow(item) {
      return (
        this.checkedRows.some((row) => row[this.rowId] == item[this.rowId]) ||
        this.selectedRows.some((row) => row[this.rowId] == item[this.rowId])
      );
    },
  },

  watch: {
    /**
     * Reset mảng chọn khi load lại dữ liệu table
     */
    checkedList: function (list) {
      if (list.length == 0) {
        // Reset list hàng được chọn bằng click và checkbox
        this.checkedRows = [];

        this.selectedRows = [];
        this.addSelectRow(this.data[0]);
        this.reload = true;
      } else this.reload = false;
    },

    selectedRows: function (list) {
      if (this.checkedRows.length == 0) {
        this.$emit("checkRow", list);
      }
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>