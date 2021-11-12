<template>
  <div class="base-checkbox">
    <input
      type="checkbox"
      @click="checkboxOnClick()"
      @keydown.enter="isChecked = !isChecked"
    />
    <span
      class="checkbox-custom rectangular"
      :class="[isChecked ? 'checkbox-checked' : '']"
    ></span>
    <label class="checkbox-label"> <slot /> </label>
  </div>
</template>

<script>
export default {
  name: "BaseCheckBox",
  data() {
    return {
      isChecked: false,
    };
  },

  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.isChecked = this.checked;
  },

  methods: {
    /**
     * Sự kiện click
     */
    checkboxOnClick() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) this.$emit("checked", 1);
      else this.$emit("checked", 0);
    },

    check() {
      this.isChecked = true;
    },

    uncheck() {
      this.isChecked = false;
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>