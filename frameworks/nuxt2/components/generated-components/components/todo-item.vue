<template>
  <li class="border-gray-200 border-b li">
    {{ item }}
  </li>
</template>
<script>
export default {
  name: "todo-item",

  props: ["item"],
};
</script>
<style scoped>
.li {
  padding: 10px;
}
</style>
