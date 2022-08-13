<template>
  <div>
    <AppHeader framework="nuxt2" :path="$route.path" />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '../components/generated-components/components/app-header.vue'
export default { components: { AppHeader } }
</script>
