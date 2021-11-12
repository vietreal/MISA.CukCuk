//import axios from "axios";
// import { API_CONFIG } from "../../common/api-config.js";
import { LANGUAGE } from "../../common/enums";

export const COMBOBOX = {
  cboGender: {
    itemId: "Gender",
    itemName: "GenderName",
    prop: "Gender",
    selectedItemId: "",
    data: [
      {
        Gender: "1",
        GenderName: "Nam",
      },
      {
        Gender: "2",
        GenderName: "Nữ",
      },
    ],
  },

  cboWorkStatus: {
    itemId: "WorkStatus",
    itemName: "WorkStatusName",
    prop: "WorkStatus",
    selectedItemId: "",
    data: [
      {
        WorkStatus: "1",
        WorkStatusName: "Chính thức",
      },
      {
        WorkStatus: "2",
        WorkStatusName: "Thử việc",
      },
      {
        WorkStatus: "3",
        WorkStatusName: "Nghỉ việc",
      },
    ],
  },
};
/**
 * STATE
 */
const state = {
  cboQuickFilter: {
    itemId: "WorkStatus",
    itemName: "WorkStatusName",
    selectedItemId: "",
    data: [
      {
        WorkStatus: "0",
        WorkStatusName: "--Tất cả--",
      },
      {
        WorkStatus: "1",
        WorkStatusName: "Đang làm việc",
      },
      {
        WorkStatus: "2",
        WorkStatusName: "Chính thức",
      },
      {
        WorkStatus: "3",
        WorkStatusName: "Thử việc",
      },
      {
        WorkStatus: "4",
        WorkStatusName: "Nghỉ việc",
      },
    ],
  },

  cboLanguage: {
    itemId: "LanguageId",
    itemName: "LanguageName",
    selectedItemId: "",
    data: [
      {
        LanguageId: "1",
        LanguageName: LANGUAGE.VIETNAMESE,
      },
      {
        LanguageId: "2",
        LanguageName: LANGUAGE.ENGLISH,
      },
      {
        LanguageId: "3",
        LanguageName: LANGUAGE.CHINESE,
      },
      {
        LanguageId: "4",
        LanguageName: LANGUAGE.GERMAN,
      },
    ],
  },

  cboBranch: {
    itemId: "BranchId",
    itemName: "BranchName",
    selectedItemId: "",
    data: [
      {
        BranchId: "0",
        BranchName: "--Chuỗi nhà hàng--",
      },
      {
        BranchId: "1",
        BranchName: "CN8",
      },
      {
        BranchId: "2",
        BranchName: "Kho Tổng",
      },
      {
        BranchId: "3",
        BranchName: "Ánh Dương Restaurant",
      },
    ],
  },

  cboPageSize: {
    itemId: "PageSize",
    itemName: "PageSizeText",
    selectedItemId: "",
    data: [
      {
        PageSize: "25",
        PageSizeText: "25",
      },
      {
        PageSize: "50",
        PageSizeText: "50",
      },
      {
        PageSize: "100",
        PageSizeText: "100",
      },
    ],
  },
};

/**
 * GETTERS
 */
const getters = {
  cboQuickFilter: (state) => state.cboQuickFilter,
  cboLanguage: (state) => state.cboLanguage,
  cboBranch: (state) => state.cboBranch,
  cboPageSize: (state) => state.cboPageSize,
  cboGender: () => COMBOBOX.cboGender,
  cboWorkStatus: () => COMBOBOX.cboWorkStatus,
};

/**
 * ACTIONS
 */
const actions = {
  /**
   * Lấy dữ liệu combobox từ API theo tên combobox
   * Author: dxviet (07/08/2021)
   */
  // async getCboApiData({ commit }, name) {
  //   try {
  //     let res;
  //     let data = [];
  //     switch (name) {
  //       case "cboUnit":
  //         res = await axios.get(API_CONFIG.UNIT_API);
  //         if (res.data) data = res.data.Data;
  //         commit("SET_CBO_UNIT", data);
  //         break;
  //       case "cboInventoryItemGroup":
  //         res = await axios.get(API_CONFIG.INVENTORY_ITEM_GROUP_API);
  //         if (res.data) data = res.data.Data;
  //         commit("SET_CBO_INVENTORY_ITEM_GROUP", data);
  //         break;
  //       default:
  //         break;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
};

/**
 * MUTATIONS
 */
const mutations = {
  SET_CBO_UNIT: (state, data) => (state.cboUnit.data = data),

  SET_CBO_INVENTORY_ITEM_GROUP: (state, data) =>
    (state.cboInventoryItemGroup.data = data),

  SET_CBO_UNIT_ID: (state, id) => (state.cboUnit.selectedItemId = id),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
