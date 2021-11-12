<template>
  <div class="flex flex-align-center base-label">
    <div class="label"><slot /></div>
    <span v-if="required" style="color: red">&nbsp;(*)</span>
  </div>
</template>

<script>
export default {
  name: "BaseLabel",
  props: {
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.label {
  white-space: nowrap;
  font-weight: normal;
}
</style>