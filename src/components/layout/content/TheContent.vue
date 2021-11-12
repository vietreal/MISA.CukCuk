<template>
  <div class="content">
    <Employee />
  </div>
</template>

<script>
import Employee from "../../../views/employee/Employee.vue";
export default {
  name: "TheContent",
  components: { Employee },
};
</script>

<style>
@import "./index.css";
</style>