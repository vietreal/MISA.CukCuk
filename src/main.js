import Vue from "vue";
import App from "./App.vue";

// import axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import moment from "moment";

// import Vue-2 datepicker
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
Vue.component("datepicker", DatePicker);

// Import Vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  position: "bottom-right",
};
Vue.use(Toast, options);

import store from "./store";

Vue.config.productionTip = false;

require("./common/format-string");

import BaseLabel from "./components/base/label/BaseLabel.vue";
import BaseInput from "./components/base/input/BaseInput.vue";
import BaseTable from "./components/base/table/BaseTable.vue";
import BaseButton from "./components/base/button/BaseButton.vue";
import BaseToolbar from "./components/base/toolbar/BaseToolbar.vue";
import BaseCombobox from "./components/base/combobox/BaseCombobox.vue";
import BaseLoading from "./components/base/loading/BaseLoading.vue";
import BasePaginate from "./components/base/paginate/BasePaginate.vue";
import BaseCheckbox from "./components/base/checkbox/BaseCheckbox.vue";
import BaseMessageBox from "./components/base/message-box/Index.vue";
import OperatorCombobox from "./components/base/combobox/operator/OperatorCombobox.vue";

Vue.component("base-label", BaseLabel);
Vue.component("base-input", BaseInput);
Vue.component("base-table", BaseTable);
Vue.component("base-button", BaseButton);
Vue.component("base-toolbar", BaseToolbar);
Vue.component("base-combobox", BaseCombobox);
Vue.component("base-loading", BaseLoading);
Vue.component("base-paginate", BasePaginate);
Vue.component("base-checkbox", BaseCheckbox);
Vue.component("base-message-box", BaseMessageBox);
Vue.component("operator-combobox", OperatorCombobox);

new Vue({
  moment,
  store,
  render: (h) => h(App),
}).$mount("#app");
