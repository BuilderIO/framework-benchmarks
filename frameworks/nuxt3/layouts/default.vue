<template>
  <div>
    <AppHeader framework="nuxt3" :path="$route.path" />
    <slot />
  </div>
</template>
<script>
import { AppHeader } from '../components/generated-components';
export default {
  components: { AppHeader },
};
</script>
