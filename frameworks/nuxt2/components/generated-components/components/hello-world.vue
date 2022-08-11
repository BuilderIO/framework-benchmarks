<template>
  <h1 class="text-center p-10">Hello {{ name || "world" }}</h1>
</template>
<script>
export default {
  name: "hello-world",

  props: ["name"],
};
</script>
