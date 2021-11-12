<template>
  <div class="header flex flex-align-center">
    <div class="flex flex-align-center header-left">
      <div class="cbo-branch">
        <base-combobox
          cboName="cboBranch"
          :data="cboBranch"
          defaultValue="1"
        ></base-combobox>
      </div>
      <div class="filter-branch">
        <div class="icon-filter-branch"></div>
      </div>
    </div>
    <div class="flex flex-align-center header-right">
      <div class="cbo-language">
        <base-combobox
          cboName="cboLanguage"
          :data="cboLanguage"
          defaultValue="1"
        ></base-combobox>
      </div>
      <div class="notification-feature">
        <div class="icon-notification"></div>
      </div>
      <div class="help-feature">
        <div class="help-feature-text">Câu hỏi thường gặp</div>
      </div>
      <div class="support-feature"></div>

      <div class="flex flex-align-center user-setting">
        <div class="default-avatar"></div>
        <div class="account-name">Đặng Xuân Việt</div>
        <div class="icon-down-small"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",

  computed: {
    ...mapGetters(["cboLanguage", "cboBranch"]),
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
