<template>
  <div class="flex flex-align-center misa-toolbar">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="flex flex-align-center toolbar-item-wrap"
      :class="[disabled && item.disabled ? 'item-disabled' : '']"
      :title="[item.shortkey ? item.shortkey : '']"
    >
      <div class="flex flex-align-center toolbar-item">
        <base-button
          type="primary"
          :icon="item.icon"
          :click-handler="item.clickHandler"
        >
          {{ item.label }}
        </base-button>
      </div>

      <span class="separator" v-if="item.separator"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseToolbar",

  props: {
    items: {
      type: Array,
      default: () => {},
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
@import "./index.css";
</style>