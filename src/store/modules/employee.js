import axios from "axios";
import { TOAST_MESSAGE, RESPONSE_MESSAGE } from "../../common/const.js";
import { API_CONFIG } from "../../common/api-config.js";
import { COMBOBOX } from "./combobox.js";
import Utils from "../../common/utils";
// import Format from "../../common/format";

/**
 * STATE
 */
const state = {
  employees: [], // Danh sách nhân viên
  employeeId: "", // Id nhân viên được chọn
  employee: {}, // nhân viên được chọn
  showDetailInfo: false, // Đóng/mở form (true - mở, false - đóng)
  formMode: "", // trạng thái của form (add - thêm, edit - sửa)

  loading: false, // Trạng thái loading

  // Tabbar đang chọn trong form chi tiết
  tabbarSelect: 0,
  // Mảng chi tiết các nhân viên
  listDetails: [],

  // Mảng các nhân viên được chọn
  listRowChecked: [],

  // Danh sách cột của bảng nhân viên
  tableColumns: [
    {
      label: "Tên đăng nhập",
      prop: "EmployeeCode",
      width: "200px",
      operator: "string",
    },
    {
      label: "Tên nhân viên",
      prop: "EmployeeName",
      width: "240px",
      main: true,
      operator: "string",
    },
    {
      label: "Số điện thoại",
      prop: "PhoneNumber",
      width: "150px",
      operator: "string",
    },
    {
      label: "Ngày sinh",
      prop: "DateOfBirth",
      width: "150px",
      operator: "number",
      align: "center",
    },
    {
      label: "Giới tính",
      prop: "Gender",
      width: "105px",
      combobox: COMBOBOX.cboGender,
    },
    {
      label: "Trạng thái làm việc",
      prop: "WorkStatus",
      width: "175px",
      combobox: COMBOBOX.cboWorkStatus,
    },
  ],

  totalEmployees: 0, // tổng số nhân viên
  totalEmployeePages: 0, // tổng số trang

  // Có thay đổi dữ liệu không
  isChangedData: false,

  // Check mã trùng trên hệ thống
  isExistCode: false,

  urlImage: "",

  // Loại ảnh (0 - icon, 1 - image)
  imageType: 0,
};

/**
 * GETTERS
 */
const getters = {
  employees: (state) => state.employees,
  employeeId: (state) => state.employeeId,
  employee: (state) => state.employee,
  formMode: (state) => state.formMode,
  isShowForm: (state) => state.showDetailInfo,
  tableColumns: (state) => state.tableColumns,
  selectedEmployees: (state) => state.selectedEmployees,
  loading: (state) => state.loading,
  totalEmployeePages: (state) => state.totalEmployeePages,
  totalEmployees: (state) => state.totalEmployees,
  tabbarSelect: (state) => state.tabbarSelect,
  isChangedData: (state) => !state.isChangedData,
  isExistCode: (state) => state.isExistCode,
  listDetails: (state) => state.listDetails,
  urlImage: (state) => state.urlImage,
  imageType: (state) => state.imageType,
  listRowChecked: (state) => state.listRowChecked,
};

/**
 * ACTIONS
 */
const actions = {
  /**
   * Hàm gọi API lấy dữ liệu theo các tiêu chí
   * Author: dxviet (01/08/2021)
   */
  async getEmployeesFilterPaging({ commit }, specObject) {
    try {
      let data = [];
      let totalRecords = 0;
      let totalPages = 0;

      // Hiện loading
      commit("SHOW_LOADING");

      // Gọi Api lấy dữ liệu
      const res = await axios.post(
        API_CONFIG.EMPLOYEE_API + "filter",
        specObject
      );

      // Nếu có dữ liệu gán vào data
      if (res.data) {
        data = res.data.Data;
        totalRecords = res.data.TotalRecord;
        totalPages = res.data.TotalPage;
      }

      commit("SET_EMPLOYEES", data);
      commit("SET_TOTAL_EMPLOYEES", totalRecords);
      commit("SET_TOTAL_EMPLOYEE_PAGES", totalPages);
      commit("SET_DATA_NOT_CHANGE");
      commit("SET_LIST_ROW_SELECTED", []);

      // Ẩn loading
      commit("HIDE_LOADING");
    } catch (error) {
      console.error(error);
      this._vm.$toast.error(TOAST_MESSAGE.MESSAGE_ERROR, {
        timeout: 2000,
      });
    }
  },

  /**
   * Hàm gọi API thêm nhân viên
   * Author: dxviet (01/08/2021)
   */
  async addEmployee({ commit }, formData) {
    try {
      await axios.post(API_CONFIG.EMPLOYEE_API + "insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this._vm.$toast.success(TOAST_MESSAGE.ADD_SUCCESS, { timeout: 2000 });
      commit("SET_DATA_CHANGE");
    } catch (error) {
      if (error.response?.data) {
        if (
          error.response?.data?.Data?.some(
            (devMsg) => devMsg == RESPONSE_MESSAGE.EXIST_CODE
          )
        )
          commit("SET_EXIST_CODE");
        else {
          let message = error.response?.data?.Message ?? TOAST_MESSAGE.ADD_FAIL;
          this._vm.$toast.error(message, { timeout: 2000 });
        }
      }
    }
  },

  /**
   * Hàm gọi API sửa nhân viên
   * Author: dxviet (01/08/2021)
   */
  async editEmployee({ commit }, formData) {
    try {
      await axios.put(API_CONFIG.EMPLOYEE_API + "update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this._vm.$toast.success(TOAST_MESSAGE.EDIT_SUCCESS, { timeout: 2000 });
      commit("SET_DATA_CHANGE");
    } catch (error) {
      if (error.response?.data) {
        if (
          error.response?.data?.Data.some(
            (devMsg) => devMsg == RESPONSE_MESSAGE.EXIST_CODE
          )
        )
          commit("SET_EXIST_CODE");
        else {
          let message =
            error.response?.data?.Message ?? TOAST_MESSAGE.EDIT_FAIL;
          this._vm.$toast.error(message, { timeout: 2000 });
        }
      }
    }
  },

  /**
   * Hàm gọi API xóa 1 nhân viên
   * Author: dxviet (01/08/2021)
   */
  async deleteEmployee({ commit }, id) {
    try {
      await axios.delete(API_CONFIG.EMPLOYEE_API + id);
      this._vm.$toast.success(TOAST_MESSAGE.DELETE_SUCCESS, { timeout: 2000 });
      commit("SET_DATA_CHANGE");
    } catch (error) {
      console.error(error.response);
      this._vm.$toast.error(TOAST_MESSAGE.DELETE_FAIL, { timeout: 2000 });
    }
  },

  /**
   * Hàm gọi API xóa nhiều nhân viên
   * param listItems: mảng các nhân viên muốn xóa
   * Author: dxviet (01/08/2021)
   */
  async deleteMultiple({ commit }, listItems) {
    try {
      await axios.delete(API_CONFIG.EMPLOYEE_API + "deletes", {
        data: listItems.map((item) => item.EmployeeId),
      });
      // Bỏ chọn nhân viên
      commit("SET_DATA_CHANGE");

      // Hiển thị thông báo
      this._vm.$toast.success(TOAST_MESSAGE.DELETE_SUCCESS, {
        timeout: 2000,
      });
    } catch (error) {
      console.error(error);
      this._vm.$toast.error(TOAST_MESSAGE.DELETE_FAIL, { timeout: 2000 });
    }
  },

  /**
   * Hàm gọi API lấy nhân viên theo Id
   * Author: dxviet (01/08/2021)
   */
  async selectEmployee({ commit }, employeeId) {
    try {
      let data = {
        IsSystemManagement: 0,
        IsChainManagement: 0,
      };

      if (employeeId != "") {
        // Lấy nhân viên theo id
        const res = await axios.get(API_CONFIG.EMPLOYEE_API + employeeId);
        if (res.data) data = res.data.Data;
      } else {
        data.Gender = "1";
        data.WorkStatus = "1";
      }

      let url = API_CONFIG.DEFAULT_IMAGE_URL;
      // Nếu có ảnh thì gán url ảnh
      if (data.PictureId) {
        url = API_CONFIG.EMPLOYEE_IMAGE_URL + data.UrlImage;
      }
      commit("SET_URL_IMAGE", url);
      commit("SET_IMAGE_TYPE", data.PictureType);
      commit("SET_CURRENT_EMPLOYEE", data);
    } catch (error) {
      console.error(error);
      this._vm.$toast.error(TOAST_MESSAGE.MESSAGE_ERROR, {
        timeout: 2000,
      });
    }
  },

  /**
   * Lấy mã nhân viên mới
   * @returns mã nhân viên mới
   * Author: dxviet (08/08/2021)
   */
  async getNewSKUCode({ commit }, itemName) {
    try {
      let newCode = "";
      let acronym = Utils.getAcronymsByString(itemName);
      const res = await axios.get(
        API_CONFIG.EMPLOYEE_API + "NewSKUCode" + `?acronym=${acronym}`
      );
      if (res.data) newCode = res.data;
      commit("SET_SKU_CODE", newCode);
    } catch (error) {
      console.error(error);
      this._vm.$toast.error(TOAST_MESSAGE.MESSAGE_ERROR, {
        timeout: 2000,
      });
    }
  },
};

/**
 * MUTATIONS
 */
const mutations = {
  // Gán dữ liệu nhân viên
  SET_EMPLOYEES: (state, data) => (state.employees = data),

  // Gán tổng số nhân viên
  SET_TOTAL_EMPLOYEES: (state, quantity) => (state.totalEmployees = quantity),

  // Gán tổng số trang:
  SET_TOTAL_EMPLOYEE_PAGES: (state, totalPages) =>
    (state.totalEmployeePages = totalPages),

  // Gán nhân viên được chọn vào employee
  SET_CURRENT_EMPLOYEE: (state, employee) => (state.employee = employee),

  // Cần cập nhật lại dữ liệu
  SET_DATA_CHANGE: (state) => (state.isChangedData = true),

  // Không cần cập nhật dữ liệu
  SET_DATA_NOT_CHANGE: (state) => (state.isChangedData = false),

  // Hiển thị form Thêm nhân viên
  SHOW_FORM: (state) => (state.showDetailInfo = true),

  // Ẩn form Thêm nhân viên
  HIDE_FORM: (state) => (state.showDetailInfo = false),

  // Set giá trị form mode
  SET_FORM_MODE: (state, mode) => (state.formMode = mode),

  // Hiện loading
  SHOW_LOADING: (state) => (state.loading = true),

  // Ẩn loading
  HIDE_LOADING: (state) => (state.loading = false),

  // Đã trùng mã nhân viên
  SET_EXIST_CODE: (state) => (state.isExistCode = true),

  // Chưa trùng mã nhân viên
  SET_NOT_EXIST_CODE: (state) => (state.isExistCode = false),

  // Gán mã SKU mới
  SET_SKU_CODE: (state, code) => (state.employee.SKUCode = code),

  // Gán list nhân viên chi tiết
  SET_LIST_DETAILS: (state, data) => (state.listDetails = data),

  // Thêm vào list nhân viên chi tiết
  ADD_LIST_DETAILS: (state, item) => state.listDetails.push(item),

  // Xóa nhân viên chi tiết khỏi list theo index
  REMOVE_LIST_DETAILS: (state, index) => state.listDetails.splice(index, 1),

  // Gán url ảnh
  SET_URL_IMAGE: (state, url) => (state.urlImage = url),

  // Gán loại ảnh
  SET_IMAGE_TYPE: (state, type) => (state.imageType = type),

  // Gán danh sách hàng đang được chọn
  SET_LIST_ROW_SELECTED: (state, data) => (state.listRowChecked = data),

  SET_TABBAR_SELECT: (state, index) => (state.tabbarSelect = index),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
