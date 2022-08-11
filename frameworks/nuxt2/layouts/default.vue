<template>
  <div>
    <AppHeader framework="nuxt2" :path="$route.path" />
    <Nuxt />
  </div>
</template>

<script>
import { AppHeader } from '../components/generated-components'
export default { components: { AppHeader } }
</script>
