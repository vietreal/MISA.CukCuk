<template>
  <div class="employee">
    <div class="body-wrap">
      <!-- #region Phần header -->
      <div class="content-header">
        <div class="content-header-left flex">
          <div class="header-title flex">
            <div class="main-title flex">
              <div>Danh mục</div>
              <div class="icon-arrow-right"></div>
            </div>
            <div class="sub-title">Nhân viên</div>
          </div>
          <div class="header-filter">
            <div class="filter-text">Lọc nhanh</div>
            <div class="cbo-quick-filter">
              <base-combobox
                cboName="cboQuickFilter"
                :data="cboQuickFilter"
                defaultValue="1"
              ></base-combobox>
            </div>
          </div>
        </div>
        <div class="content-header-right flex">
          <div class="feature display-setting">
            <div class="feature-text">Quay lại thiết lập ban đầu</div>
          </div>
          <div class="feature feedback flex">
            <div class="icon-feedback"></div>
            <div class="feature-text">Phản hồi</div>
          </div>
        </div>
      </div>

      <!-- #endregion -->

      <base-toolbar :items="toolbarItems"></base-toolbar>

      <div class="grid-table">
        <!-- :rowDbClick="rowDbClick"
        :filter-handler="filterData"
         -->
        <base-table
          :data="emps"
          :columns="tableColumns"
          rowId="EmployeeId"
          :checkedList="listRowChecked"
          @checkRow="(list) => SET_LIST_ROW_SELECTED(list)"
          @openMenu="openContextMenu"
        ></base-table>

        <base-loading
          v-show="false"
          top="191px"
          right="8px"
          bottom="293px"
          left="238px"
        ></base-loading>

        <div
          class="flex flex-align-center j-c-space-between paging-bar"
          v-show="true"
        >
          <div class="flex paging-bar-left">
            <base-paginate
              :page-count="10"
              :page-range="1"
              :margin-pages="0"
              prev-text=""
              next-text=""
              :container-class="'paging-navigation'"
              :page-link-class="'btn-paging-bar'"
              :break-view-link-class="'btn-break-view-paginate'"
              :prev-link-class="'misa-icon icon-prev btn-paging-icon'"
              :next-link-class="'misa-icon icon-next btn-paging-icon'"
              first-last-button
              first-button-text=""
              last-button-text=""
              :first-link-class="'misa-icon icon-first btn-paging-icon'"
              :last-link-class="'misa-icon icon-last btn-paging-icon'"
              :disabled-class="'btn-hide'"
              :click-handler="paginateOnClick"
              ref="paginate"
            >
            </base-paginate>

            <span class="separator"></span>

            <div class="btn-paginate btn-reload">
              <div
                class="misa-icon icon-reload btn-paging-icon"
                @click="reload"
              ></div>
            </div>

            <span class="separator"></span>

            <div class="cbo-page-size">
              <base-combobox
                cboName="cboPageSize"
                :data="cboPageSize"
                defaultValue="50"
                @changeValue="pageSizeFilter"
                readonly
              ></base-combobox>
            </div>
          </div>

          <div class="paging-bar-right">
            Hiển thị
            <span>{{ startIndex }}</span>
            <span>&nbsp; - &nbsp;</span>
            <span>{{ endIndex }}</span>
            trên
            <span>{{ totalEmployees > 0 ? totalEmployees : 0 }}</span>
            kết quả
          </div>
        </div>
      </div>

      <div class="info-detail">
        <div class="tab-bar flex flex-align-center">
          <div
            class="tab-bar-item"
            :class="{ selected: tabBarSelect == 1 }"
            @click="tabBarSelect = 1"
          >
            Vai trò
          </div>
          <div
            class="tab-bar-item"
            :class="{ selected: tabBarSelect == 2 }"
            @click="tabBarSelect = 2"
          >
            Thông tin liên hệ
          </div>
        </div>

        <div class="info-body">
          <!-- Vai trò -->
          <div class="body-wrap" v-if="tabBarSelect == 1">
            <div class="info-body-header flex">
              <div class="header-item col-first">Tên vai trò</div>
              <div class="header-item" style="flex: 1">Diễn giải</div>
            </div>

            <div class="info-body-content"></div>
          </div>

          <!-- Thông tin liên hệ -->
          <div class="body-wrap flex" v-if="tabBarSelect == 2">
            <!-- Liên hệ -->
            <fieldset class="field-set m-l-10 m-r-20" style="width: 350px">
              <legend class="field-set-header">Liên hệ</legend>
              <div class="field-set-body">
                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>ĐT di động</base-label>
                  </div>
                  <div class="misa-row-left width-185">
                    <base-label>0123456789</base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>ĐT nhà riêng</base-label>
                  </div>
                  <div class="misa-row-left width-185">
                    <base-label></base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Email</base-label>
                  </div>
                  <div class="misa-row-left width-185">
                    <base-label></base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Địa chỉ</base-label>
                  </div>
                  <div class="misa-row-left width-185">
                    <base-label></base-label>
                  </div>
                </div>
              </div>
            </fieldset>

            <!-- Liên hệ khẩn cấp -->
            <fieldset class="field-set">
              <legend class="field-set-header">Liên hệ khẩn cấp</legend>
              <div class="field-set-body">
                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Họ và tên</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>
                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Quan hệ</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>
                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>ĐT di động</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>ĐT nhà riêng</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Email</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>

                <div class="flex misa-row">
                  <div class="misa-row-left">
                    <base-label>Địa chỉ</base-label>
                  </div>
                  <div class="misa-row-left width-235">
                    <base-label></base-label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>

    <EmployeeDetail v-show="isShowForm" ref="formDetail" />

    <!-- Messagebox xóa nhân viên -->
    <base-message-box
      v-if="showDeleteMessageBox"
      title="CUKCUK - Quản lý nhà hàng"
      icon="icon-question"
      btn-right-first="Xóa"
      btn-right-second="Hủy bỏ"
      :btn-right-second-click="hideDeleteMessageBox"
      :btn-right-first-click="deleteEmployee"
    >
      <div v-if="listRowChecked.length > 1">
        {{ deleteEmployeeMessage }}
      </div>
      <div v-else>
        {{ deleteEmployeeMessage }}
      </div>
    </base-message-box>

    <context-menu
      v-if="menuStatus.isShow"
      :top="menuStatus.positionY"
      :left="menuStatus.positionX"
      :addOnClick="btnAddOnClick"
      :cloneOnClick="btnCloneOnClick"
      :editOnClick="btnEditOnClick"
      :deleteOnClick="btnDeleteOnClick"
      :refreshOnClick="reload"
    ></context-menu>
  </div>
</template>

<script>
import { FORM_MODE } from "../../common/enums.js";
import { MESSAGE_BOX } from "../../common/const.js";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ContextMenu from "../../components/base/context/ContextMenu.vue";

import EmployeeDetail from "../employee_detail/EmployeeDetail.vue";
export default {
  name: "Employee",
  components: { EmployeeDetail, ContextMenu },
  data() {
    return {
      // Mảng tiêu chí lọc
      specFilter: {
        pageIndex: 1,
        pageSize: 50,
        filters: [],
      },

      // trạng thái của menu các chức năng
      menuStatus: {
        isShow: false,
        positionX: "0px",
        positionY: "0px",
      },

      // List button thanh toolbar
      toolbarItems: [
        {
          label: "Thêm",
          icon: "icon-add",
          clickHandler: this.btnAddOnClick,
          shortkey: "Ctrl+1",
        },
        {
          label: "Nhân bản",
          icon: "icon-clone",
          clickHandler: this.btnCloneOnClick,
        },
        {
          label: "Xem",
          icon: "icon-search",
          clickHandler: this.btnWatchOnClick,
        },
        {
          label: "Sửa",
          icon: "icon-edit",
          clickHandler: this.btnEditOnClick,
          shortkey: "Ctrl+E",
        },
        {
          label: "Xóa",
          icon: "icon-delete",
          clickHandler: this.btnDeleteOnClick,
          shortkey: "Ctrl+D",
          separator: true,
        },
        {
          label: "Nạp",
          icon: "icon-refresh",
          clickHandler: this.reload,
          shortkey: "Ctrl+Y",
        },
        {
          label: "Giúp",
          icon: "icon-help",
          clickHandler: () => {},
          shortkey: "F1",
        },
      ],

      // Message box cảnh báo xóa nhân viên
      deleteEmployeeMessage: "",
      showDeleteMessageBox: false,

      tabBarSelect: 1,

      emps: [
        {
          EmployeeId: "1",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "2",
          EmployeeCode: "NV2",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "3",
          EmployeeCode: "NV3",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "4",
          EmployeeCode: "NV4",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "5",
          EmployeeCode: "NV5",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "6",
          EmployeeCode: "NV6",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "7",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "8",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "9",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "10",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
        {
          EmployeeId: "11",
          EmployeeCode: "NV1",
          EmployeeName: "Test",
          PhoneNumber: "012134561",
          DateOfBirth: "21/10/2000",
          Gender: "Nam",
          WorkStatus: "Chính thức",
        },
      ],
    };
  },

  // created() {
  //   this.getEmployeesFilterPaging(this.specFilter);
  // },

  mounted() {
    document.addEventListener("click", this.hideContextMenu);
  },

  computed: {
    ...mapGetters([
      "employees",
      "isShowForm",
      "tableColumns",
      "cboPageSize",
      "totalEmployees",
      "totalEmployeePages",
      "cboQuickFilter",
      "loading",
      "listRowChecked",
    ]),

    // Số thứ tự của người đầu tiên của trang
    startIndex() {
      return this.totalEmployees > 0
        ? (this.specFilter.pageIndex - 1) * this.specFilter.pageSize + 1
        : 0;
    },

    // Số thứ tự của người cuối của trang
    endIndex() {
      if (this.totalEmployeePages <= 0) return 0;
      else {
        if (this.specFilter.pageIndex < this.totalEmployeePages)
          return this.specFilter.pageIndex * this.specFilter.pageSize;
        else return this.totalEmployees;
      }
    },
  },

  methods: {
    ...mapMutations(["SET_FORM_MODE", "SHOW_FORM", "SET_LIST_ROW_SELECTED"]),

    ...mapActions([
      "selectEmployee",
      "getEmployeesFilterPaging",
      "deleteMultiple",
    ]),

    /**
     * Hiển thị form thêm nhân viên khi nhấn vào nút Thêm
     * Author: dxviet(29/07/2021)
     */
    async btnAddOnClick() {
      await this.selectEmployee("");
      this.SET_FORM_MODE(FORM_MODE.ADD);
      this.SHOW_FORM();
    },

    /**
     * Hiển thị form thêm nhân viên khi nhấn vào nút Nhân bản
     * Author: dxviet(29/07/2021)
     */
    async btnCloneOnClick() {
      try {
        let item = this.listRowChecked[0];
        await this.selectEmployee(item.EmployeeId);

        this.SHOW_FORM();
        this.SET_FORM_MODE(FORM_MODE.ADD);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị form nhân viên khi nhấn vào nút Xem
     * Author: dxviet(29/07/2021)
     */
    async btnWatchOnClick() {
      try {
        let item = this.listRowChecked[0];
        await this.selectEmployee(item.EmployeeId);

        this.SHOW_FORM();
        this.SET_FORM_MODE(FORM_MODE.WATCH);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị form sửa nhân viên khi nhấn vào nút Sửa
     * Author: dxviet(29/07/2021)
     */
    async btnEditOnClick() {
      try {
        await this.selectEmployee(this.listRowChecked[0].EmployeeId);
        this.SET_FORM_MODE(FORM_MODE.EDIT);
        this.SHOW_FORM();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị thông báo nhân viên khi nhấn vào nút Xóa
     * Author: dxviet(29/07/2021)
     */
    btnDeleteOnClick() {
      if (this.listRowChecked.length == 1) {
        let item = this.listRowChecked[0];
        this.deleteEmployeeMessage = MESSAGE_BOX.DELETE_EMPLOYEE.format(
          item.EmployeeCode
        );
        this.showDeleteMessageBox = true;
      } else {
        this.deleteEmployeeMessage = MESSAGE_BOX.DELETE_MULTIPLE;
        this.showDeleteMessageBox = true;
      }
    },

    /**
     * Xóa nhân viên
     * Author: dxviet(29/07/2021)
     */
    async deleteEmployee() {
      try {
        await this.deleteMultiple(this.listRowChecked);
        this.SET_LIST_ROW_SELECTED([]);
        this.showDeleteMessageBox = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Filter dữ liệu theo số hàng hóa 1 trang
     * Author: dxviet(30/08/2021)
     */
    pageSizeFilter: function (pageSize) {
      try {
        this.specFilter.pageSize = pageSize;
        this.selectFirstPage();
        this.getEmployeesFilterPaging(this.specFilter);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Phân trang dữ liệu
     * Author: dxviet(18/08/2021)
     */
    paginateOnClick: function (page) {
      try {
        this.specFilter.pageIndex = page;
        this.getEmployeesFilterPaging(this.specFilter);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chọn trang đầu tiên
     * Author: dxviet(18/08/2021)
     */
    selectFirstPage() {
      this.specFilter.pageIndex = 1;
      this.$refs.paginate.selectFirstPage();
    },

    /**
     * Cập nhật lại dữ liệu khi nhấn nút Refresh
     * Author: dxviet(29/07/2021)
     */
    reload() {
      try {
        this.selectFirstPage();
        this.getInventoryItemsFilterPaging(this.specFilter);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn message box cảnh báo xóa nhân viên
     * Author: dxviet(29/08/2021)
     */
    hideDeleteMessageBox() {
      this.showDeleteMessageBox = false;
    },

    /**
     * Hàm đóng context menu
     * Author: dxviet(28/08/2021)
     */
    openContextMenu(posX, posY, item) {
      this.menuStatus = {
        isShow: true,
        positionX: posX + "px",
        positionY: posY + "px",
      };
      this.selectedRow = item;
    },

    /**
     * Hàm đóng context menu
     * Author: dxviet(28/08/2021)
     */
    hideContextMenu() {
      this.menuStatus.isShow = false;
    },
  },

  watch: {
    /**
     * Khởi tạo các giá trị khi mở form
     * Author: dxviet(10/10/2021)
     */
    isShowForm: function (value) {
      if (value) {
        let formDetail = this.$refs.formDetail;

        // Focus mã nhân viên
        formDetail.autoFocus();
      }
    },
  },
};
</script>

<style scoped>
@import "./employee.css";
</style>