<template>
  <div>
    <AppHeader framework="nuxt3" :path="$route.path" />
    <slot />
  </div>
</template>
<script>
import { AppHeader } from '@builder.io/components/vue3';
export default {
  components: { AppHeader },
};
</script>
