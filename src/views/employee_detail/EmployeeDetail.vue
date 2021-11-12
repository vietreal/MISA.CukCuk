<template>
  <div class="employee-detail">
    <!-- Modal -->
    <div class="popup-modal"></div>

    <div class="body-wrap">
      <div class="popup-body">
        <div class="form-header flex flex-align-center">
          <div class="form-title">{{ formTitle }}</div>
          <div class="form-close">
            <div class="misa-icon icon-tool icon-close"></div>
          </div>
        </div>

        <div class="form-body">
          <base-toolbar :items="toolbarItems"></base-toolbar>

          <div class="form-content">
            <div class="body-wrap">
              <!-- Tabbar -->
              <div class="form-content-header">
                <div class="tab-bar flex flex-align-center">
                  <div
                    v-for="(item, i) in tabbarItems"
                    :key="i"
                    class="tab-bar-item"
                    @click="SET_TABBAR_SELECT(i)"
                    :class="{ selected: tabbarSelect == i }"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>

              <div class="form-content-body">
                <!-- Thông tin chung -->
                <div class="body-wrap" v-if="tabbarSelect == 0">
                  <div class="content-left">
                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label required>Mã nhân viên</base-label>
                      </div>
                      <div class="misa-row-right width-169">
                        <base-input
                          required
                          v-model="employee.EmployeeCode"
                          max-length="20"
                          ref="inputCode"
                        ></base-input>
                      </div>

                      <label class="suggestion"
                        >Dùng làm tên đăng nhập vào hệ thống, có thể sử dụng số
                        điện thoại hoặc email cho dễ nhớ.
                      </label>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Email</base-label>
                      </div>
                      <div class="misa-row-right width-315">
                        <base-input
                          v-model="employee.Email"
                          max-length="100"
                        ></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Số điện thoại</base-label>
                      </div>
                      <div class="misa-row-right width-315">
                        <base-input
                          v-model="employee.PhoneNumber"
                          max-length="50"
                        ></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label required>Họ và tên</base-label>
                      </div>
                      <div class="misa-row-right">
                        <base-input
                          required
                          v-model="employee.EmployeeName"
                          max-length="100"
                        ></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row m-r-20">
                        <div class="misa-row-left">
                          <base-label>Giới tính</base-label>
                        </div>
                        <div class="misa-row-right width-315">
                          <base-combobox
                            cboName="cboGender"
                            :data="cboGender"
                            defaultValue="1"
                          ></base-combobox>
                        </div>
                      </div>

                      <div class="misa-row">
                        <div class="misa-row-left" style="width: 85px">
                          <base-label>Ngày sinh</base-label>
                        </div>
                        <div class="misa-row-right" style="width: 165px">
                          <base-input
                            v-model="employee.DateOfBirth"
                            type="date"
                          ></base-input>
                        </div>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row m-r-20">
                        <div class="misa-row-left">
                          <base-label>Số CMND</base-label>
                        </div>
                        <div class="misa-row-right width-315">
                          <base-input
                            v-model="employee.IdentifyNumber"
                            max-length="25"
                          ></base-input>
                        </div>
                      </div>

                      <div class="misa-row">
                        <div class="misa-row-left" style="width: 85px">
                          <base-label>Ngày cấp</base-label>
                        </div>
                        <div class="misa-row-right" style="width: 165px">
                          <base-input
                            v-model="employee.IdentifyDate"
                            type="date"
                          ></base-input>
                        </div>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Nơi cấp CMND</base-label>
                      </div>
                      <div class="misa-row-right">
                        <base-input
                          v-model="employee.IdentifyPlace"
                          max-length="255"
                        ></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label required>Phân quyền</base-label>
                      </div>
                      <div class="misa-row-right flex">
                        <div>
                          <base-checkbox
                            @checked="
                              (value) => {
                                employee.IsSystemManagement = value;
                              }
                            "
                          >
                            Vai trò Quản trị hệ thống
                          </base-checkbox>
                        </div>
                        <div style="margin-left: 49px">
                          <base-checkbox
                            @checked="
                              (value) => {
                                employee.IsChainManagement = value;
                              }
                            "
                            >Vai trò Quản lý chuỗi</base-checkbox
                          >
                        </div>
                      </div>
                    </div>

                    <div
                      v-show="
                        !(
                          employee.IsSystemManagement ||
                          employee.IsChainManagement
                        )
                      "
                    >
                      <!-- Table nhà hàng -->
                      <div class="misa-row" style="height: 110px">
                        <div class="misa-row-left"></div>
                        <div class="misa-row-right" style="height: 110px">
                          <div class="table-restaurant">
                            <div class="table-header flex">
                              <div class="column-header col-first">
                                Tên nhà hàng
                              </div>
                              <div class="column-header" style="flex: 1">
                                Vai trò
                              </div>
                            </div>

                            <div class="table-body">
                              <div class="body-wrap">
                                <div class="row-body flex">
                                  <div class="column-body col-first">
                                    <input type="text" />
                                  </div>
                                  <div class="column-body flex" style="flex: 1">
                                    <input type="text" />
                                    <div class="btn-more">
                                      <div class="icon-more"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Thao tác với dòng -->
                      <div class="misa-row" style="height: 34px">
                        <div class="misa-row-left"></div>
                        <div class="misa-row-right line-manipulation flex">
                          <base-button icon="icon-add">Thêm dòng</base-button>
                          <base-button icon="icon-delete">Xóa dòng</base-button>
                          <base-button
                            icon="icon-clone"
                            style="position: absolute; right: 0"
                            >Sao chép</base-button
                          >
                        </div>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label required>Trạng thái làm việc</base-label>
                      </div>
                      <div class="misa-row-right flex">
                        <div class="width-169">
                          <base-combobox
                            cboName="cboWorkStatus"
                            :data="cboWorkStatus"
                            defaultValue="1"
                          >
                          </base-combobox>
                        </div>
                        <div style="margin-left: 8px">
                          <base-checkbox checked>
                            Cho phép làm việc với phần mềmCUKCUK
                          </base-checkbox>
                        </div>
                      </div>
                    </div>

                    <!-- #region Mật khẩu -->
                    <div class="misa-row" v-if="!showInputPassword">
                      <div class="misa-row-left">
                        <base-label></base-label>
                      </div>
                      <div class="misa-row-right">
                        <base-checkbox
                          @checked="showInputPassword = !showInputPassword"
                          >Đổi mật khẩu</base-checkbox
                        >
                      </div>
                    </div>

                    <div class="misa-row" v-if="showInputPassword">
                      <div class="misa-row m-r-8" style="width: max-content">
                        <div class="misa-row-left">
                          <base-label required>Mật khẩu truy cập</base-label>
                        </div>
                        <div class="misa-row-right width-169">
                          <base-input
                            type="password"
                            max-length="255"
                          ></base-input>
                        </div>
                      </div>

                      <div class="misa-row">
                        <div class="misa-row-left">
                          <base-label required>Xác nhận mật khẩu</base-label>
                        </div>
                        <div class="misa-row-right width-169">
                          <base-input
                            type="password"
                            max-length="255"
                          ></base-input>
                        </div>
                      </div>
                    </div>

                    <div class="warning-pass" v-if="showInputPassword">
                      <div>
                        Mật khẩu phải có ít nhất 8 ký tự bao gồm cả chữ hoa, chữ
                        thường và chữ số.
                      </div>
                    </div>
                    <!-- #endregion -->
                  </div>

                  <div class="content-right">
                    <upload-image> </upload-image>
                  </div>
                </div>

                <!-- #region Thông tin liên hệ -->
                <div class="body-wrap" v-if="tabbarSelect == 1">
                  <div class="misa-row pd-l-8">
                    <div class="misa-row-left width-125">
                      <base-label>ĐT nhà riêng</base-label>
                    </div>
                    <div class="misa-row-right" style="flex: 1">
                      <base-input max-length="50"></base-input>
                    </div>
                  </div>
                  <fieldset class="field-set">
                    <legend class="field-set-header">Liên hệ khẩn cấp</legend>
                    <div class="field-set-body flex">
                      <div style="width: 413px; height: 116px">
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Họ và tên</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Quan hệ</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>ĐT di động</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>

                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>ĐT nhà riêng</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                      </div>

                      <div style="margin-left: 40px">
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Email</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>

                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Địa chỉ</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <div class="misa-row" style="height: 210px; margin-top: 12px">
                    <fieldset class="field-set address-field">
                      <legend class="field-set-header">
                        Hộ khẩu thường trú
                      </legend>
                      <div class="field-set-body">
                        <div class="misa-row" style="height: 50px">
                          <div class="misa-row-left">
                            <base-label>Địa chỉ</base-label>
                          </div>
                          <div class="misa-row-right" style="height: 50px">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Quốc gia</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Tỉnh/TP</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Quận/Huyện</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Xã/Phường</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    <div class="btn-copy">
                      <div class="icon-import-right"></div>
                    </div>

                    <fieldset class="field-set address-field">
                      <legend class="field-set-header">Chỗ ở hiện tại</legend>
                      <div class="field-set-body">
                        <div class="misa-row" style="height: 50px">
                          <div class="misa-row-left">
                            <base-label>Địa chỉ</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Quốc gia</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Tỉnh/TP</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Quận/Huyện</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                        <div class="misa-row">
                          <div class="misa-row-left">
                            <base-label>Xã/Phường</base-label>
                          </div>
                          <div class="misa-row-right">
                            <base-input></base-input>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Thông tin khác -->
                <div class="body-wrap pd-l-8" v-if="tabbarSelect == 2">
                  <div class="misa-row">
                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Ngày thử việc</base-label>
                      </div>
                      <div class="misa-row-right width-283">
                        <base-input type="date"></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Ngày chính thức</base-label>
                      </div>
                      <div class="misa-row-right width-283">
                        <base-input type="date"></base-input>
                      </div>
                    </div>
                  </div>

                  <div class="misa-row">
                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Mức lương</base-label>
                      </div>
                      <div class="misa-row-right width-283">
                        <base-input></base-input>
                      </div>
                    </div>

                    <div class="misa-row">
                      <div class="misa-row-left">
                        <base-label>Tình trạng hôn nhân</base-label>
                      </div>
                      <div class="misa-row-right width-283">
                        <base-input></base-input>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Thời gian truy cập -->
                <div class="body-wrap pd-l-8" v-if="tabbarSelect == 3">
                  <base-checkbox>
                    Chỉ cho phép truy cập theo khung giờ
                  </base-checkbox>
                </div>
                <!-- #endregion -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { FORM_MODE } from "../../common/enums";
import UploadImage from "../../components/base/upload-image/Index.vue";
export default {
  name: "EmployeeDetail",

  components: { UploadImage },

  data() {
    return {
      // List button thanh toolbar
      toolbarItems: [
        {
          label: "Thêm",
          icon: "icon-add",
          clickHandler: this.btnAddOnClick,
          shortkey: "Ctrl+1",
        },
        {
          label: "Sửa",
          icon: "icon-edit",
          clickHandler: this.btnCloneOnClick,
          disabled: this.editBtnDisabled,
        },
        {
          label: "Cất",
          icon: "icon-save",
          clickHandler: this.btnCloneOnClick,
          shortkey: "Ctrl+S",
          disabled: this.saveBtnDisabled,
        },
        {
          label: "Xóa",
          icon: "icon-delete",
          clickHandler: this.btnDeleteOnClick,
          disabled: this.deleteBtnDisabled,
        },
        {
          label: "Hoãn",
          icon: "icon-refresh",
          clickHandler: this.reload,
          disabled: this.undoBtnDisabled,
          separator: true,
        },
        {
          label: "Giúp",
          icon: "icon-help",
          clickHandler: this.reload,
          shortkey: "F1",
        },
        {
          label: "Đóng",
          icon: "icon-close-red",
          clickHandler: this.HIDE_FORM,
          shortkey: "Ctrl+Q",
        },
      ],

      tabbarItems: [
        "Thông tin chung",
        "Thông tin liên hệ",
        "Thời gian truy cập",
        "Thông tin khác",
      ],

      formTitle: null,

      showInputPassword: true,
    };
  },

  computed: {
    ...mapGetters([
      "employee",
      "cboGender",
      "cboWorkStatus",
      "formMode",
      "isShowForm",
      "tabbarSelect",
    ]),

    editBtnDisabled() {
      return this.formMode != FORM_MODE.WATCH;
    },

    saveBtnDisabled() {
      return this.formMode == FORM_MODE.WATCH;
    },

    deleteBtnDisabled() {
      return this.formMode != FORM_MODE.WATCH;
    },

    undoBtnDisabled() {
      return this.formMode != FORM_MODE.EDIT;
    },
  },

  methods: {
    ...mapMutations(["HIDE_FORM", "SET_TABBAR_SELECT"]),

    /**
     * Gán trạng thái mặc định cho form
     */
    setDefaultForm(title, showInputPassword) {
      this.formTitle = title;
      this.showInputPassword = showInputPassword;
    },

    autoFocus() {
      this.$refs.inputCode.focusInput();
    },
  },

  watch: {
    isShowForm: function () {
      if (this.formMode == FORM_MODE.ADD)
        this.setDefaultForm("Thêm nhân viên", true);
      else if (this.formMode == FORM_MODE.EDIT)
        this.setDefaultForm("Sửa nhân viên", false);
      else if (this.formMode == FORM_MODE.WATCH)
        this.setDefaultForm("Nhân viên", false);
    },
  },
};
</script>

<style scoped>
@import "./employee-detail.css";
</style>