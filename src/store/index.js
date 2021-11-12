import Vue from "vue";
import Vuex from "vuex";
import combobox from "./modules/combobox";
import employee from "./modules/employee";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    combobox,
    employee,
  },
});
